import React, { Component } from 'react';
import * as LandingAPI from 'lib/api/landing';
import phone from 'static/images/phone.png';
import { notification } from 'antd';
import './AppSection.scss';

class AppSection extends Component {
  state = {
    email: ''
  };

  handleChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleSubmit = () => {
    LandingAPI.subscribe(this.state.email);

    notification['success']({
      message: '출시 사전알림이 예약되었습니다.',
      duration: 3
    });

    this.setState({
      email: ''
    });
  };

  render() {
    const { email } = this.state;

    return (
      <section className="AppSection">
        <div className="image">
          <img src={phone} alt="phone" />
        </div>
        <div className="content">
          <div className="input-text">
            <p>
              <strong>BLOCKON</strong> 모바일앱이
            </p>
            <p>10월 31일에 출시될 예정입니다.</p>
            <p className="email">이메일을 적어주시면 출시 전에 알려드려요.</p>
          </div>

          <div className="input-wrapper">
            <input
              type="email"
              value={email}
              placeholder="이메일을 입력해주세요."
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleSubmit}>
              보내기
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default AppSection;
