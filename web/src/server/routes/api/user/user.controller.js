const Account = require('../../../models/account');

/*
    GET /api/user/list
*/

exports.list = (req, res) => {
  // admin이 아니면 거부
  if (!req.decoded.admin) {
    return res.status(403).json({
      message: 'you are not an admin'
    });
  }

  Account.find({}, '-password').then(accounts => {
    res.json({ accounts });
  });
};

/*
    PUT /api/user/:ethAddress
    {
      accountAddress
    }
*/

exports.updateAccountAddressByEthAddress = (req, res) => {
  Account.update(
    { ethAddress: req.params.ethAddress },
    { $set: req.body },
    (err, output) => {
      console.log(output);
      res.json({ message: 'account updated' });
    }
  );
};

/*
    POST /api/user/email
    {
      value
    }
*/

/**
 * 자동완성을 위해 value로 시작하는 이메일 검색
 * @param {*} req
 * @param {*} res
 */
exports.getEmailList = async (req, res) => {
  const accounts = await Account.find(
    { email: new RegExp(`^${req.body.value}`) },
    '-_id'
  ).select('email');
  const emailList = accounts.map(account => account.email);
  res.json(emailList);
};

/*
    POST /api/user
    {
      email
    }
*/

exports.getAccountAddressByEmail = (req, res) => {
  Account.findOne(req.body, (err, account) => {
    res.json(account);
  });
};
