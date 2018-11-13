const Conversation = require('../../../models/conversation');
const Message = require('../../../models/message');

exports.getMessages = async (req, res) => {
  const { contractId, sender, receiver } = req.body;

  const conversation = await Conversation.findOne({
    contractId,
    participants: { $all: [sender, receiver] }
  });
  const conversationId = conversation._id;

  const senderMessages = await Message.find({ conversationId, sender });
  const receiverMessages = await Message.find({
    conversationId,
    sender: receiver
  });

  res.json({ senderMessages, receiverMessages });
};
