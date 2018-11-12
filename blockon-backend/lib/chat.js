const Conversation = require('../models/conversation');
const Message = require('../models/message');

const clients = {}; // 접속된 모든 유저

// 메시지 보낸 유저를 제외한 모든 유저에게 브로드캐스팅
const broadcast = (senderConnId, conversationId, message) => {
  for (const connId in clients[conversationId]) {
    if (connId !== senderConnId) {
      console.log('connId:', connId);
      clients[conversationId][connId].write(JSON.stringify(message));
    }
  }
};

const sendMessage = (connId, senderMsg) => {
  Message.create({
    conversationId: senderMsg.conversationId,
    sender: senderMsg.sender,
    content: senderMsg.content
  });
  const message = {
    type: 'RECEIVE_MESSAGE',
    content: senderMsg.content,
    date: senderMsg.date
  };
  broadcast(connId, senderMsg.conversationId, message);
};

const createConversation = async (conn, msg) => {
  /* 채팅 참가자들이 이미 속한 대화가 있는지 확인 */
  let conversationId = null;
  const existConversation = await Conversation.findOne({
    contractId: msg.contractId,
    participants: { $all: msg.participants }
  });
  console.log('existConversation:', existConversation);

  /* 대화가 존재하지 않는 경우에만 생성 */
  if (!!existConversation) {
    conversationId = existConversation._id;
  } else {
    const conversation = await Conversation.create({
      contractId: msg.contractId,
      participants: msg.participants
    });
    conversationId = conversation._id;
  }

  /* 채팅방이 만들어져 있지 않다면(채팅 참가자가 아무도 없는 경우) 생성 */
  if (!clients[conversationId]) {
    console.log('채팅방을 새로 생성합니다.');
    clients[conversationId] = [];
  }
  clients[conversationId][conn.id] = conn;

  conn.write(
    JSON.stringify({
      type: 'CONVERSATION_ID',
      conversationId
    })
  );
};

module.exports = {
  sendMessage,
  createConversation
};
