const Account = require("../../../models/account");

/*
    GET /api/auth/list
*/

exports.list = (req, res) => {
  // admin이 아니면 거부
  if (!req.decoded.admin) {
    return res.status(403).json({
      message: "you are not an admin"
    });
  }

  Account.find({}, "-password").then(accounts => {
    res.json({ accounts });
  });
};
