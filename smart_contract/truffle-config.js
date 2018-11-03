const HOST = "localhost";
const PORT = "8551";
const NETWORK_ID = "1000";
const FROM = "0xa07ed659cf06fc973d8ad86fc5ad84c953b2595d";
const GASLIMIT = 20000000;

module.exports = {
  networks: {
    klaytn: {
      host: HOST,
      port: PORT,
      network_id: NETWORK_ID,
      from: FROM,
      gas: GASLIMIT,
      gasPrice: null
    }
  }
};
