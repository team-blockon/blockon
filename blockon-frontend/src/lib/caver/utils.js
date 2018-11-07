import caver from 'lib/caver';

/**
 * default address 반환
 */
export const getDefaultAccount = () => {
  return caver.klay.defaultAccount;
};

/**
 * 가장 최신 블록넘버를 Promise로 반환
 */
export const getLatestBlockNumber = () => {
  return caver.klay.getBlockNumber();
};

/**
 * 트랜잭션 사인 및 전송
 */
export const sendTransaction = (contractInstance, functionName) => {
  const to = contractInstance._address;
  const abi = contractInstance.methods[`${functionName}`]().encodeABI();
  const privateKey = JSON.parse(sessionStorage.getItem('privateKey'));

  const txObject = {
    from: getDefaultAccount(),
    to,
    data: abi,
    gas: 2000000,
    gasPrice: '25000000000',
    chainId: 1000
  };

  caver.klay.accounts
    .signTransaction(txObject, privateKey)
    .then(({ rawTransaction }) => {
      caver.klay
        .sendSignedTransaction(rawTransaction)
        .on('receipt', console.log);
    });
};
