const Account = require('../../../models/account');
const Contract = require('../../../models/contract');

/**
 * 거래 등록시 유효한 이메일인지 확인한다.
 * @param req
 * @param res
 */
exports.isRightEmail = (req, res) => {
  const { email } = req.body;

  const isRightEmail = email => {
    return new Promise((resolve, reject) => {
      Account.findByEmail(email).then(account => {
        if (!account) {
          reject(new Error('error'));
        }
        resolve(account.address);
      });
    });
  };

  const respond = address => {
    res.json({
      result: true,
      message: address
    });
  };

  // 에러가 있을 때 실행되는 함수 (이미 존재하는 email)
  const onError = error => {
    res.status(409).json({
      result: false,
      message: error.message
    });
  };

  isRightEmail(email)
    .then(respond)
    .catch(onError);
};

/*
    POST /api/contract
    {
        people: {
            agentEthAddress,
            sellerEmail,
            buyerEmail
        },
        building: {
            type,
            address,
            photo
        },
        contract: {
            date,
            type,
            status
        }
    }
*/

/**
 * Blockon 컨트랙트에서 계약 생성 후 오프체인 정보 저장을 위한 함수
 * @param {*} req
 * @param {*} res
 */
exports.addContract = (req, res) => {
  Contract.create(req.body).then(contract => {
    res.json(contract);
  });
};
