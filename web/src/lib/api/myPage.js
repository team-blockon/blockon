import defaultClient from 'lib/defaultClient';

export const makeWallet = email => {
    return defaultClient.post('/api/mypage/wallet', {
        ethAddress,
        hyconAddress,
        hyconPrivateKey
    });
};


