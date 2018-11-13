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
export const sendTransaction = (contractInstance, functionName, ...rest) => {
  const to = contractInstance._address;
  const abi = contractInstance.methods[`${functionName}`](...rest).encodeABI();
  const privateKey = JSON.parse(localStorage.getItem('privateKey'));

  const txObject = {
    from: getDefaultAccount(),
    to,
    data: abi,
    gas: 30000000
  };

  caver.klay.accounts
    .signTransaction(txObject, privateKey)
    .then(({ rawTransaction }) => {
      caver.klay
        .sendSignedTransaction(rawTransaction)
        .on('receipt', console.log);
    });
};
