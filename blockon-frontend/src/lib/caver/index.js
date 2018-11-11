import Caver from 'caver-js';

export const config = {
  rpcURL: 'ws://52.79.41.43:8552'
};

export const cav = new Caver(config.rpcURL);

export default cav;
