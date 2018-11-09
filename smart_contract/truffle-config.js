const HOST = "localhost";
const PORT = "8551";
const NETWORK_ID = "1000";
const FROM = "0xfe9e54d6c5f13156b82c29a4157a22e91cc20fbb";
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
