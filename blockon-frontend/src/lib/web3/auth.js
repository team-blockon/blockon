/**
 * Account 생성
 * @param {Object} { ethAddress, email }
 */
export const createAccount = ({ ethAddress, email }) => {
  return new Promise((resolve, reject) => {
    const { blockon } = window;

    // Blockon 계약 내의 createAccount 함수 호출
    blockon.createAccount.sendTransaction(
      ethAddress,
      email,
      (error, txHash) => {
        if (!error) {
          resolve({ txHash });
        } else {
          reject({ msg: error });
        }
      }
    );
  });
};
