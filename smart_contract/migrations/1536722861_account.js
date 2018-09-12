const Account = artifacts.require('Account');

module.exports = function(deployer, network, accounts) {
    const accountAddress = accounts[0];
    deployer.deploy(Account, accountAddress);
};
