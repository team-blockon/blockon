import * as UserAPI from 'lib/api/user';
import * as CaverUtils from 'lib/caver/utils';
import caver from 'lib/caver';
import accountABI from 'abi/account_abi';

export const getAccountInfo = () => {
  return new Promise(async (resolve, reject) => {
    const defaultAccount = CaverUtils.getDefaultAccount();
    if (!defaultAccount) return;
    const res = await UserAPI.getAccountByKlaytnAddress(defaultAccount);

    const accountAddress = res.data.accountAddress;
    const accountInstance = new caver.klay.Contract(accountABI, accountAddress);

    resolve({ account: res.data, accountAddress, accountInstance });
  });
};
