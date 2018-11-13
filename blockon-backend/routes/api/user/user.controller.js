const Account = require('../../../models/account');

/*
    POST /api/user/find/klaytn
    {
      klaytnAddress
    }
*/

/**
 * Klaytn address로 Account 찾기
 * @param {*} req
 * @param {*} res
 */
exports.getAccountByKlaytnAddress = (req, res) => {
  const { klaytnAddress } = req.body;
  Account.findOne(
    { 'keyStore.address': klaytnAddress.slice(2).toLowerCase() },
    (err, account) => {
      res.json(account);
    }
  );
};

/*
    POST /api/user/find/klaytn
    {
      email
    }
*/

/**
 * Klaytn address로 Account 찾기
 * @param {*} req
 * @param {*} res
 */
exports.getAccountByEmail = (req, res) => {
  const { email } = req.body;
  Account.findOne({ email }, (err, account) => {
    res.json(account);
  });
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
  );

  const emailList = accounts.map(account => ({
    username: account.profile.username,
    email: account.email
  }));

  res.json(emailList);
};

/*
    GET /api/user/:ethAddress
    {
      profile,
      email
    }
*/

exports.updateAccountByEthAddress = (req, res) => {
  const { profile, email } = req.body;

  Account.update(
    { ethAddress: req.params.ethAddress },
    {
      $set: {
        'profile.thumbnail': profile,
        email
      }
    },
    (err, output) => {
      res.json({ message: 'account updated' });
    }
  );
};
