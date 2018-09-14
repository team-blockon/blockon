const Hycon = require('../../../models/hycon');

exports.makeWallet = async (req, res) => {
  const { ethAddress, hyconAddress, hyconPrivateKey } = req.body;

  const hycon = await Hycon.create(ethAddress, hyconAddress, hyconPrivateKey);
  res.json({
    hycon
  });
};

exports.getWallet = async (req, res) => {
  const { ethAddress } = req.params;
  console.log(ethAddress);
  const hycon = await Hycon.findOne({ ethAddress });
  res.json(hycon);
};
