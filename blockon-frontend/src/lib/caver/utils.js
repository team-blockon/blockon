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
