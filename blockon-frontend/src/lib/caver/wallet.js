import caver from 'lib/caver';

const accounts = caver.klay.accounts;

// keystore JSON 복호화
export const decrypt = (keystoreJson, password) => {
  return accounts.decrypt(keystoreJson, password);
};
