const Blockon = artifacts.require("Blockon"),
  Account = artifacts.require("Account"),
  BaseContract = artifacts.require("BaseContract");

contract("Blockon", async accounts => {
  /**
   * contractType 인덱스
   */
  const TRADE = 1;
  const RENT_YEAR = 2;
  const RENT_MONTH = 3;

  /**
   * contract state
   * 0 - 초기상태
   * 1 - 계약금 입금
   * 2 - 중도금 입금
   * 3 - 잔금 입금
   * 4 - 등기 등록 신청
   * 5 - 확정일자
   * 100 - 완료
   */
  const START = 0;
  const DOWN_PAYMENT = 1;
  const MIDDLE_PAYMENT = 2;
  const FINAL_PAYMENT = 3;
  const REGISTRATION = 4;
  const FIXED_DATE = 5;
  const COMPLETED_CONTRACT = 100;

  let blockon;
  let agentAddress, sellerAddress, buyerAddress;
  let agentAccount, sellerAccount, buyerAccount;

  it("createAccount function, Account initialization check", async () => {
    blockon = await Blockon.new();

    // agent account 생성
    agentAddress = accounts[1];
    let result = await blockon.createAccount(agentAddress);
    agentAccount = Account.at(result.logs[0].args.accountAddress);

    // seller account 생성
    sellerAddress = accounts[2];
    result = await blockon.createAccount(sellerAddress);
    sellerAccount = Account.at(result.logs[0].args.accountAddress);

    // buyer account 생성
    buyerAddress = accounts[3];
    result = await blockon.createAccount(buyerAddress);
    buyerAccount = Account.at(result.logs[0].args.accountAddress);

    // account 계정 초기화 체크
    assert.equal(
      await agentAccount.publicAddress(),
      agentAddress,
      "publicAddress initialization fail"
    );
    assert.equal(
      await agentAccount.isAgent(),
      false,
      "isAgent initialization fail"
    );
    assert.equal(
      await agentAccount.getContractsLength(),
      0,
      "contracts array initialization fail"
    );
  });

  it("athorizeAsAgent function", async () => {
    // 생성된 당시에는 agent가 아니다
    assert.equal(await agentAccount.isAgent(), false);

    // 중개인 인증 후 agent가 되었는지 확인
    await blockon.athorizeAsAgent(agentAccount.address);
    assert.equal(await agentAccount.isAgent(), true);
  });

  let tradeContract, yearContract, monthContract;

  it("createContract function, BaseContract initialization check", async () => {
    // trade 타입 컨트랙트 생성
    let result = await blockon.createContract(
      agentAccount.address,
      sellerAccount.address,
      buyerAccount.address,
      TRADE
    );
    tradeContract = BaseContract.at(result.logs[0].args.baseContract);

    // trade타입 컨트랙트의 account, seller, buyer address와 contract type, state 확인 (초기화 됬는지)
    assert.equal(
      await tradeContract.agentAccount(),
      agentAccount.address,
      "agent account initailization fail"
    );
    assert.equal(
      await tradeContract.sellerAccount(),
      sellerAccount.address,
      "seller account initailization fail"
    );
    assert.equal(
      await tradeContract.buyerAccount(),
      buyerAccount.address,
      "buyer account initailization fail"
    );
    assert.equal(
      await tradeContract.contractType(),
      TRADE,
      "contract type initailization fail"
    );
    assert.equal(
      await tradeContract.contractState(),
      START,
      "contract state initailization fail"
    );
  });

  it("created contract should be added to each account", async () => {
    // agent, seller, buyer 어카운트에 제대로 추가되었는지 확인
    assert.equal(
      await agentAccount.getContractsLength(),
      1,
      "trade contract is not added to agent account"
    );
    assert.equal(
      await sellerAccount.getContractsLength(),
      1,
      "trade contract is not added to seller account"
    );
    assert.equal(
      await buyerAccount.getContractsLength(),
      1,
      "trade contract is not added to buyer account"
    );

    // rent year 타입 컨트랙트 생성
    result = await blockon.createContract(
      agentAccount.address,
      sellerAccount.address,
      buyerAccount.address,
      RENT_YEAR
    );
    yearContract = BaseContract.at(result.logs[0].args.baseContract);

    // rent month 타입 컨트랙트 생성
    result = await blockon.createContract(
      agentAccount.address,
      sellerAccount.address,
      buyerAccount.address,
      RENT_MONTH
    );
    monthContract = BaseContract.at(result.logs[0].args.baseContract);

    // agent, seller, buyer 어카운트에 제대로 추가되었는지 확인
    assert.equal(
      await agentAccount.getContractsLength(),
      3,
      "trade contract is not added to agent account"
    );
    assert.equal(
      await sellerAccount.getContractsLength(),
      3,
      "trade contract is not added to seller account"
    );
    assert.equal(
      await buyerAccount.getContractsLength(),
      3,
      "trade contract is not added to buyer account"
    );
  });

  it("confirm to change contract state", async () => {
    // confirm 안되어 있는 상태
    let [
      isAgentConfirmed,
      isSellerConfirmed,
      isBuyerConfirmed
    ] = await agentAccount.hasConfirmed(0, DOWN_PAYMENT);
    assert.equal(isAgentConfirmed, false);
    assert.equal(isSellerConfirmed, false);
    assert.equal(isBuyerConfirmed, false);

    // agent는 confirm 완료 seller와 buyer는 confirm 안되어있음
    await agentAccount.confirmToChangeContractStateAt(0, DOWN_PAYMENT);
    [
      isAgentConfirmed,
      isSellerConfirmed,
      isBuyerConfirmed
    ] = await agentAccount.hasConfirmed(0, DOWN_PAYMENT);
    assert.equal(isAgentConfirmed, true);
    assert.equal(isSellerConfirmed, false);
    assert.equal(isBuyerConfirmed, false);
  });

  it("revoke comfirmation", async () => {
    await agentAccount.revokeConfirmationAt(0, DOWN_PAYMENT);
    let [
      isAgentConfirmed,
      isSellerConfirmed,
      isBuyerConfirmed
    ] = await agentAccount.hasConfirmed(0, DOWN_PAYMENT);
    assert.equal(isAgentConfirmed, false);
    assert.equal(isSellerConfirmed, false);
    assert.equal(isBuyerConfirmed, false);
  });

  it("3 confirmation needed to change contract state", async () => {
    // agent confirmation
    await agentAccount.confirmToChangeContractStateAt(0, DOWN_PAYMENT);
    assert.equal(await tradeContract.contractState(), START);

    // seller confirmation
    await sellerAccount.confirmToChangeContractStateAt(0, DOWN_PAYMENT);
    assert.equal(await tradeContract.contractState(), START);

    // buyer confirmation
    await buyerAccount.confirmToChangeContractStateAt(0, DOWN_PAYMENT);
    assert.equal(await tradeContract.contractState(), DOWN_PAYMENT);
  });

  it("cannot revoke executed confirmation", async () => {
    // DOWN_PAYMENT로 이미 상태변경이 완료된것을 확인
    assert.equal(await agentAccount.hasExecuted(0, DOWN_PAYMENT), true);

    // DOWN_PAYMENT confirm 취소 시도
    try {
      await agentAccount.revokeConfirmationAt(0, DOWN_PAYMENT);
    } catch (e) {
      console.log(e.message);
    }
  });
});
