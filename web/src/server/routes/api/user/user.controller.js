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
*/

exports.getEmailList = (req, res) => {
  Account.find()
    .select('email')
    .then(emailList => {
      res.json(emailList);
    });
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
