const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKey = "19F4C8079525713010EDD0F5CECE5E6B5D1D951BB93D652A83C658782FB68E9D";
const accessToken = "9455fcc16830461e91abfa87f9ea123c";

module.exports = {
  networks: {
      development: {
          host: "127.0.0.1",
          port: 7545,
          gas: 3000000,
          network_id: "*"
      },
      ropsten: {
          provider: () => new HDWalletProvider([privateKey], 'https://ropsten.infura.io/' + accessToken),
          network_id: 3,
          gas: 3000000,
          gasPrice: 20000000000
      }
  }
};
