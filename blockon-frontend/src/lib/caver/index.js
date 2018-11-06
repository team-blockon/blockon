import Caver from 'caver-js';

export const config = {
  rpcURL: 'http://localhost:8551'
};

export const cav = new Caver(config.rpcURL);

export default cav;
