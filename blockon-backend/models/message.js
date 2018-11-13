const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
  conversationId: Number, // conversation 컬렉션의 _id값 참조
  sender: String, // 메시지 송신자
  content: String, // 메시지 내용
  createdAt: { type: Date, default: Date.now }
});

Message.static.create = function({ conversationId, sender, content }) {
  const message = new this({
    conversationId,
    sender,
    content
  });
  return message.save();
};

module.exports = mongoose.model('Message', Message);
