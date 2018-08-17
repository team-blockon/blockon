import React, { Component, Fragment } from 'react';
import logo from 'static/images/logo.png';
import coverLogo from 'static/images/logo-cover.png';
import chattingIcon from 'static/images/icon/chatting.png';
import contractIcon from 'static/images/icon/contract.png';
import gradeIcon from 'static/images/icon/grade.png';
import mapIcon from 'static/images/icon/map.png';
import mailIcon from 'static/images/icon/message.png';
import phoneIcon from 'static/images/icon/phone.png';
import phone from 'static/images/phone.png';
import sendIcon from 'static/images/icon/send.png';
import facebookIcon from 'static/images/icon/facebook.png';
import googleIcon from 'static/images/icon/google.png';
import instagramIcon from 'static/images/icon/instagram.png';
import * as LandingAPI from 'lib/api/landing';
import 'antd/dist/antd.css';
import './HomeWrapper.scss';
import { Button, notification } from 'antd';

const BlockonSection = () => {
  return (
    <section className="blockon">
      <img src={logo} className="logo" alt="logo" />
      <p>
        BLOCKON은 부동산 계약을 더욱 투명하게 하기 위한 블록체인 기반&nbsp;
        '공인중개사 평판' 시스템입니다.
      </p>
      <p>
        공인중개사 검색은 더욱 쉽게, 거래과정을 명확하게, 소통은 원활하게
        이용하실 수 있습니다.
      </p>
      <p>이제 BLOCKON으로 안심하고 거래하세요.</p>
    </section>
  );
};

const FeatureSection = () => {
  return (
    <section className="feature">
      <div>
        <div>
          <img src={gradeIcon} alt="chatting" />
        </div>
        공인중개사의 평점을
        <br />
        위치 기반으로 편리하게
        <br />
        검색할 수 있습니다.
      </div>
      <div>
        <div>
          <img src={contractIcon} alt="contract" />
        </div>
        블록체인으로 거래내역이
        <br /> 투명하게 공개되어
        <br />
        위변조 및 대리계약의
        <br />
        가능성이 없습니다.
      </div>
      <div>
        <div>
          <img src={chattingIcon} alt="realestate" />
        </div>
        매수인, 중개인, 매도인 간의
        <br />
        실시간 채팅서비스로
        <br />
        쉽고 빠르게 연락 가능합니다.
      </div>
    </section>
  );
};

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

    notification.open({
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
      <section className="app">
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

class ContactUsSection extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    feedback: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    const { name, email, phone, feedback } = this.state;

    LandingAPI.contactus({ name, email, phone, feedback }).then(res => {
      notification.open({
        message: '문의사항이 접수되었습니다.',
        duration: 2.5
      });
    });

    this.setState({
      name: '',
      email: '',
      phone: '',
      feedback: ''
    });
  };

  render() {
    const { name, email, phone, feedback } = this.state;

    return (
      <section className="contact">
        <div className="form">
          <label htmlFor="name">성함</label>
          <input
            type="text"
            value={name}
            id="name"
            name="name"
            onChange={this.handleChange}
          />
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            value={email}
            id="email"
            name="email"
            onChange={this.handleChange}
          />
          <label htmlFor="phone">핸드폰</label>
          <input
            type="tel"
            value={phone}
            id="phone"
            name="phone"
            placeholder="예) 010-0000-0000"
            onChange={this.handleChange}
          />
          <label htmlFor="feedback">문의사항</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            rows="3"
            cols="80"
            onChange={this.handleChange}
          />
          <button type="button" onClick={this.handleSubmit}>
            <img src={sendIcon} alt="send" placeholder="문의사항" />
          </button>
        </div>
        <div className="info">
          <h2>Contact US</h2>
          {/* <div>
            <img src={mapIcon} alt="map" style={{ width: '22px' }} />
            경기 성남시 분당구 판교로289길 4층 BLOCKON
          </div> */}
          <div>
            <img src={mailIcon} alt="mail" />
            talentx.blockon@gmail.com
          </div>
          {/* <div>
            <img src={phoneIcon} alt="phone" />
            031-214-8698
          </div> */}
          <div>
            <a href="https://www.facebook.com/BLOCKON-635311476850026/">
              <img src={facebookIcon} alt="facebook" />
            </a>
            {/*Just for test. 일단 없애놨음. */}
            {/*<img src={googleIcon} alt="google" />
            <img src={instagramIcon} alt="instagram" />*/}
          </div>
        </div>
      </section>
    );
  }
}

class HomeWrapper extends Component {
  render() {
    return (
      <Fragment>
        <div className="cover">
          <div className="logo">
            <img src={coverLogo} alt="logo" />
          </div>
          <div className="subtitle">믿을 수 있는 중개인을 만나보세요</div>
          {/* <div className="search">
            <input
              type="text"
              placeholder="관심지역 또는 공인중개소를 검색해보세요."
            />
          </div> */}
        </div>

        <BlockonSection />
        <FeatureSection />
        <AppSection />
        <ContactUsSection />
      </Fragment>
    );
  }
}

export default HomeWrapper;
