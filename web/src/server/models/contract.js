const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contract = new Schema({
  people: {
    agentEthAddress: String,
    sellerEmail: String,
    buyerEmail: String
  },
  building: {
    type: String,
    address: String,
    photo: String
  },
  contract: {
    date: Date,
    type: String,
    progress: String
  }
});

Contract.statics.create = function(body) {
  const contract = new this(body);
  return contract.save();
};

module.exports = mongoose.model('Contract', Contract);
