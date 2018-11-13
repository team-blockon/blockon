import React, { Component } from 'react';
import { Tabs } from 'antd';
import { MessageList, Input, Button } from 'react-chat-elements';
import * as ChatAPI from 'lib/api/chat';
import * as CaverUser from 'lib/caver/user';
import * as CaverAuth from 'lib/caver/auth';
import SockJS from 'sockjs-client';

import 'react-chat-elements/dist/main.css';
import './Chat.scss';

const TabPane = Tabs.TabPane;
const sockjs_server =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'http://52.79.41.43';

class Chat extends Component {
  state = {
    isAgent: null,
    activeTab: '1',
    sender: null,
    receiver: null,
    conversationId: null,
    messageList: []
  };

  constructor() {
    super();
    // SockJS 인스턴스는 반드시 생성자에서 생성할 것
    // 컴포넌트 바깥에 둘 경우 onopen 이벤트가 제대로 발생하지 않음
    this.sock = new SockJS(`${sockjs_server}/chat`);
  }

  /* 수신자가 바뀌면 다시 연결해야 함 */
  changeReceiver = activeTab => {
    const { sellerAddress, buyerAddress } = this.props.party;
    const receiver = activeTab === '1' ? sellerAddress : buyerAddress;

    this.setState(
      {
        ...this.state,
        receiver,
        messageList: [] // 메시지 목록 초기화
      },
      () => {
        this.initializeMessages(receiver);
      }
    );

    this.createConversation(receiver);
  };

  // 중개인만 탭을 바꿀 수 있음
  // 탭이 바뀔 때마다 수신자 설정
  handleTabChange = activeTab => {
    this.setState(
      {
        ...this.state,
        activeTab
      },
      () => {
        this.changeReceiver(activeTab); // 수신자 변경
      }
    );
  };

  addMessage = (position, content, date) => {
    const message = {
      position: position,
      type: 'text',
      text: content,
      date: !!date ? date : new Date()
    };

    this.setState({
      ...this.state,
      messageList: [...this.state.messageList, message]
    });
  };

  createConversation = async receiver => {
    const { contractId } = this.props;
    const { accountAddress } = await CaverUser.getAccountInfo();

    this.sock.send(
      JSON.stringify({
        type: 'CREATE_CONVERSATION',
        contractId,
        participants: [accountAddress, receiver]
      })
    );
  };

  /* 4. 메시지 전송 */
  // 메시지가 전송되면 본인이 작성한 메시지는 나옴
  sendMessage = () => {
    const { conversationId, sender } = this.state;
    const { input } = this.refs;

    const value = input.state.value;
    if (!value) return;

    this.addMessage('left', value);
    this.sock.send(
      JSON.stringify({
        conversationId,
        sender,
        type: 'SEND_MESSAGE',
        content: value,
        date: new Date().toString()
      })
    );

    input.clear();
    input.input.focus();
  };

  /* 0. DB에서 채팅 기록 가져오기 */
  initializeMessages = receiver => {
    const { sender } = this.state;
    const { contractId } = this.props;

    ChatAPI.getMessages({
      contractId,
      sender,
      receiver
    }).then(res => {
      const { senderMessages, receiverMessages } = res.data;

      let i = 0;
      let j = 0;

      // 메시지 송수신자 구분없이 날짜 순으로 정렬하여 삽입
      while (i < senderMessages.length && j < receiverMessages.length) {
        const senderDate = new Date(senderMessages[i].createdAt);
        const receiverDate = new Date(receiverMessages[j].createdAt);

        if (senderDate.getTime() < receiverDate.getTime()) {
          this.addMessage('left', senderMessages[i].content, senderDate);
          i++;
        } else {
          this.addMessage('right', receiverMessages[j].content, receiverDate);
          j++;
        }
      }

      for (; i < senderMessages.length; i++) {
        this.addMessage(
          'left',
          senderMessages[j].content,
          new Date(senderMessages[j].createdAt)
        );
      }
      for (; j < receiverMessages.length; j++) {
        this.addMessage(
          'right',
          receiverMessages[j].content,
          new Date(receiverMessages[j].createdAt)
        );
      }
    });
  };

  componentDidMount = async () => {
    const {
      accountAddress: sender,
      accountInstance
    } = await CaverUser.getAccountInfo();
    const isAgent = await CaverAuth.isAgent(accountInstance);
    const { party } = this.props;
    const { agentAddress, sellerAddress } = party;

    /* 1. 수신자, 송신자 설정 */
    // 중개인인 경우 수신자는 탭에 따라 달라짐
    // 중개인이 아닌 경우 수신자는 중개인
    const receiver = isAgent ? sellerAddress /*탭 기본값*/ : agentAddress;
    this.setState({
      ...this.state,
      isAgent,
      sender,
      receiver
    });

    this.initializeMessages(receiver);

    /* 2. 대화 생성 */
    // 채팅 참가자는 본인과 수신자
    this.sock.onopen = () => {
      this.createConversation(receiver);
    };

    // 웹소켓 서버로부터 메시지를 받으면 타입에 따라 처리
    this.sock.onmessage = e => {
      const msg = JSON.parse(e.data);
      switch (msg.type) {
      case 'CONVERSATION_ID':
        /* 3. 생성된 대화 ID를 응답받아 설정 */
        console.log('conversationId: ', msg.conversationId);
        this.setState({
          ...this.state,
          conversationId: msg.conversationId
        });
        break;
      case 'RECEIVE_MESSAGE':
        /* 5. 메시지 수신 */
        this.addMessage('right', msg.content, new Date(msg.date));
        break;
      default:
        throw new Error('invalid message type');
      }
    };
  };

  render() {
    const { isAgent, activeTab, messageList } = this.state;

    return (
      <div className="Chat">
        {isAgent && (
          <Tabs activeKey={activeTab} onChange={this.handleTabChange}>
            <TabPane tab="매도인" key="1" />
            <TabPane tab="매수인" key="2" />
          </Tabs>
        )}

        <MessageList className="message-list" dataSource={messageList} />
        <Input
          placeholder="메시지를 입력하세요..."
          ref="input"
          onKeyPress={e => {
            if (e.charCode === 13) {
              this.sendMessage();
              return false;
            }
          }}
          rightButtons={<Button text="보내기" onClick={this.sendMessage} />}
          autofocus={true}
        />
      </div>
    );
  }
}

export default Chat;
