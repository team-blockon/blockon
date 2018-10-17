const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKey =
  "7068726800E99E7C6B13E479F8B406A783BA0EE67CD4375328329F6A3CD98E0A";
const accessToken = "dd5129dcf6a4413abc66e7b2f56be907";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      gas: 4612388,
      network_id: "*"
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          [privateKey],
          "https://ropsten.infura.io/v3/" + accessToken
        ),
      network_id: 3,
      gas: 4612388,
      gasPrice: 100000000000
    }
  }
};
