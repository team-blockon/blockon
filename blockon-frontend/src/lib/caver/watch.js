import * as CaverUtils from 'lib/caver/utils';

/**
 * CreateAccount 이벤트 구독
 * @param {*} klaytnAddress
 */
export const createAccount = klaytnAddress => {
  const { blockon } = window;

  return new Promise((resolve, reject) => {
    // CreateAccount 이벤트 필터
    // publicAddress가 klaytnAddress인 이벤트 로그만
    // 범위는 첫 번째 블록부터 마지막 블록까지
    const createAccountEvent = blockon.CreateAccount(
      { publicAddress: klaytnAddress },
      {
        fromBlock: 0,
        toBlock: 'latest'
      }
    );

    // CreateAccount 이벤트 구독
    createAccountEvent.watch((error, result) => {
      if (!error) {
        const { accountAddress, publicAddress } = result.args;
        resolve({ accountAddress, publicAddress });
      } else {
        reject({ msg: error });
      }
    });
  });
};

/**
 * UpdateEvent 이벤트 구독
 * @param {*} accountInstance
 */
export const updateContract = accountInstance => {
  return new Promise(async (resolve, reject) => {
    // 마지막 블록 넘버 가져오기
    let latestBlock = await CaverUtils.getLatestBlockNumber();

    // UpdateEvent 이벤트 구독
    accountInstance.events
      .UpdateContract({
        fromBlock: latestBlock
      })
      .on('data', event => {
        // 마지막 블록의 이벤트를 한 번만 받음
        if (event.blockNumber !== latestBlock) {
          const updateType = Number(event.returnValues.updateType);
          const contractIndex = Number(event.returnValues.contractIndex);
          latestBlock += 1; // 이벤트가 가끔 2번 들어와서 임의로 1 증가
          resolve({ updateType, contractIndex });
        }
      });
  });
};

/**
 * AthorizeAsAgent 이벤트 구독
 * @param {*} accountInstance
 */
export const athorizeAsAgent = accountInstance => {
  return new Promise(async (resolve, reject) => {
    // 마지막 블록 넘버 가져오기
    let latestBlock = await CaverUtils.getLatestBlockNumber();

    // issue: Ganache에서 AthorizeAsAgent 이벤트 안 받아짐
    // AthorizeAsAgent 이벤트 필터
    const athorizeAsAgentEvent = accountInstance.AthorizeAsAgent(null, {
      fromBlock: latestBlock
    });

    // AthorizeAsAgent 이벤트 구독
    athorizeAsAgentEvent.watch((error, event) => {
      if (error) {
        reject({ msg: error });
        return;
      }

      // 마지막 블록의 이벤트를 한 번만 받음
      if (event.blockNumber !== latestBlock) {
        const updateType = event.args.updateType.toNumber(); // BigNumber to Number
        const contractIndex = event.args.contractIndex.toNumber();
        latestBlock += 1; // 이벤트가 가끔 2번 들어와서 임의로 1 증가
        resolve({ updateType, contractIndex });
      }
    });
  });
};
