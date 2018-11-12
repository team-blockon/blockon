const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const Conversation = new Schema({
  contractId: Schema.ObjectId,
  participants: [String] // 채팅 참가자
});

Conversation.statics.create = function({ contractId, participants }) {
  const conversation = new this({
    contractId,
    participants
  });
  return conversation.save();
};

autoIncrement.initialize(mongoose.connection);
Conversation.plugin(autoIncrement.plugin, 'Conversation');

module.exports = mongoose.model('Conversation', Conversation);
