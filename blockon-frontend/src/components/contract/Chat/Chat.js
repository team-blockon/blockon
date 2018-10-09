import React, { Component } from 'react';
import { Tabs } from 'antd';
import { MessageList, Input, Button } from 'react-chat-elements';
import SockJS from 'sockjs-client';

import 'react-chat-elements/dist/main.css';
import './Chat.scss';

const TabPane = Tabs.TabPane;
const sock = new SockJS('http://localhost:8000/chat');

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      maedoMessageList: [],
      maesuMessageList: []
    };
  }

  handleTabChange = activeTab => {
    this.setState({
      activeTab
    });
  };

  getReceiver = () => {
    const { activeTab } = this.state;
    const { party } = this.props;

    if (activeTab === '1') {
      return party.sellerAddress;
    } else if (activeTab === '2') {
      return party.buyerAddress;
    } else {
      throw new Error('invalid receiver');
    }
  };

  addMessage = () => {
    const { activeTab, maedoMessageList, maesuMessageList } = this.state;
    const {
      party: { agentAddress }
    } = this.props;
    const { input } = this.refs;

    if (!input.state.value) return;

    const message = {
      sender: agentAddress,
      receiver: this.getReceiver(),
      position: 'right',
      type: 'text',
      text: input.state.value,
      date: new Date()
    };

    if (activeTab === '1') {
      this.setState({
        maedoMessageList: [...maedoMessageList, message]
      });
    } else if (activeTab === '2') {
      this.setState({
        maesuMessageList: [...maesuMessageList, message]
      });
    }

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

  componentDidMount = () => {
    sock.onopen = () => {
      sock.send(this.props.party.agentAddress);
    };

    // 메시지 도착 이벤트가 발생하면 메시지 추가
    sock.onmessage = e => {
      const message = JSON.parse(e.data);
      message.date = new Date(message.date);

      this.setState({
        messageList: [...this.state.messageList, message]
      });
    };
  };

  render() {
    const { activeTab, maedoMessageList, maesuMessageList } = this.state;

    return (
      <div className="Chat">
        <Tabs activeKey={activeTab} onChange={this.handleTabChange}>
          <TabPane tab="매도인" key="1" />
          <TabPane tab="매수인" key="2" />
        </Tabs>

        <MessageList
          className="message-list"
          dataSource={activeTab === '1' ? maedoMessageList : maesuMessageList}
        />
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
