import * as UserAPI from 'lib/api/user';
import * as Web3Utils from 'lib/web3/utils';
import accountABI from 'abi/account_abi';

export const getAccountInstance = () => {
  const { web3 } = window;

  return new Promise(async (resolve, reject) => {
    const ethAddress = await Web3Utils.getDefaultAccount();
    const res = await UserAPI.getAccountAddressByEthAddress(ethAddress);

    const accountAddress = res.data.accountAddress;
    const accountInstance = web3.eth.contract(accountABI).at(accountAddress);

    resolve({ accountAddress, accountInstance });
  });
};
