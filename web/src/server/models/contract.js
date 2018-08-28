const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const People = new Schema({
  agentAddress: String,
  sellerAddress: String,
  buyerAddress: String
});

const Building = new Schema({
  type: String,
  address: String,
  photo: String
});

const ContractDetail = new Schema({
  index: Number,
  date: Date,
  type: Number
});

const Contract = new Schema({
  people: People,
  building: Building,
  contract: ContractDetail
});

Contract.statics.create = function(body) {
  const contract = new this(body);
  return contract.save();
};

module.exports = mongoose.model('Contract', Contract);
