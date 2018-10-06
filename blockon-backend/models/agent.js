const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const Agent = new Schema({
  name: [String],
  address: String
});

Agent.statics.create = function(splitName, address) {
  const rating = new this({
    name: splitName, // 자동완성을 위해 자모음을 분리하여 저장한다.
    address: address
  });

  return rating.save();
};

autoIncrement.initialize(mongoose.connection);
Agent.plugin(autoIncrement.plugin,'Agent');


module.exports = mongoose.model('Agent', Agent);
