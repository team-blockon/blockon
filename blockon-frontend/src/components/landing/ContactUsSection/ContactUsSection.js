import React, { Component } from 'react';
import * as LandingAPI from 'lib/api/landing';
import mapIcon from 'static/images/icon/map.png';
import mailIcon from 'static/images/icon/message.png';
import phoneIcon from 'static/images/icon/phone.png';
import sendIcon from 'static/images/icon/send.png';
import facebookIcon from 'static/images/icon/facebook.png';
import googleIcon from 'static/images/icon/google.png';
import instagramIcon from 'static/images/icon/instagram.png';
import { notification } from 'antd';
import './ContactUsSection.scss';

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
      notification['success']({
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
      <section className="ContactUsSection">
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
          <div>
            <img src={mapIcon} alt="map" style={{ width: '22px' }} />
            경기 성남시 분당구 판교로289길 4층 BLOCKON
          </div>
          <div>
            <img src={mailIcon} alt="mail" />
            talentx.blockon@gmail.com
          </div>
          <div>
            <img src={phoneIcon} alt="phone" />
            031-698-3081
          </div>
          <div>
            <a href="https://www.facebook.com/BLOCKON-635311476850026/">
              <img src={facebookIcon} alt="facebook" />
            </a>
            <img src={googleIcon} alt="google" />
            <img src={instagramIcon} alt="instagram" />
          </div>
        </div>
      </section>
    );
  }
}

export default ContactUsSection;
