import React, { Component } from 'react';
import { MessageList, Input, Button } from 'react-chat-elements';
import SockJS from 'sockjs-client';

import 'react-chat-elements/dist/main.css';
import './Chat.scss';

const sock = new SockJS('http://localhost:8000/chat');

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: []
    };
  }

  componentDidMount = () => {
    // 메시지 도착 이벤트가 발생하면 메시지 추가
    sock.onmessage = e => {
      const message = JSON.parse(e.data);
      message.date = new Date(message.date);

      this.setState({
        messageList: [...this.state.messageList, message]
      });
    };
  };

  addMessage = () => {
    const { messageList } = this.state;
    const { input } = this.refs;

    if (!input.state.value) return;

    const message = {
      position: 'right',
      type: 'text',
      text: input.state.value,
      date: new Date()
    };

    this.setState({
      messageList: [...messageList, message]
    });

    // 웹소켓 서버로 메시지 전송
    sock.send(
      JSON.stringify({
        ...message,
        position: 'left',
        message: message.date.toDateString()
      })
    );

    input.clear();
    input.input.focus();
  };

  render() {
    const { messageList } = this.state;

    return (
      <div className="Chat">
        <MessageList className="message-list" dataSource={messageList} />
        <Input
          placeholder="메시지를 입력하세요..."
          ref="input"
          onKeyPress={e => {
            if (e.charCode === 13) {
              this.addMessage();
              return false;
            }
          }}
          rightButtons={<Button text="보내기" onClick={this.addMessage} />}
          autofocus={true}
        />
      </div>
    );
  }
}

export default Chat;
