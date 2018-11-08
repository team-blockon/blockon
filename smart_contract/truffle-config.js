const HOST = "localhost";
const PORT = "8551";
const NETWORK_ID = "1000";
const FROM = "0xf83967363e197cfebf6daeec8e09751fc8fa2d06";
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
