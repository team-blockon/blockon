import * as UserAPI from 'lib/api/user';
import * as Web3Utils from 'lib/web3/utils';
import accountABI from 'abi/account_abi';

export const getAccountInfo = () => {
  const { web3 } = window;

  return new Promise(async (resolve, reject) => {
    const ethAddress = await Web3Utils.getDefaultAccount();
    const res = await UserAPI.getAccountByEthAddress(ethAddress);

    const accountAddress = res.data.accountAddress;
    const accountInstance = web3.eth.contract(accountABI).at(accountAddress);

    resolve({ account: res.data, accountAddress, accountInstance });
  });
};
