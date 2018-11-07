import Caver from 'caver-js';

export const config = {
  rpcURL: 'http://52.79.254.194:8551'
};

export const cav = new Caver(config.rpcURL);

export default cav;
