import React, { Fragment } from 'react';
import logo from 'static/images/logo.png';
import coverLogo from 'static/images/logo-cover.png';
import chattingIcon from 'static/images/icon/chatting.png';
import contractIcon from 'static/images/icon/contract.png';
import realestateIcon from 'static/images/icon/realestate.png';
import mapIcon from 'static/images/icon/map.png';
import mailIcon from 'static/images/icon/message.png';
import phoneIcon from 'static/images/icon/phone.png';
import phone from 'static/images/phone.png';
import './HomeWrapper.scss';

const HomeWrapper = () => {
  return (
    <Fragment>
      <div className="cover">
        <div className="logo">
          <img src={coverLogo} alt="logo" />
        </div>
        <div className="subtitle">
          매수인, 매도인, 중개인 모두의 거래과정을 맑게 투명하게 자신있게
        </div>
        <div className="search">
          <input type="text" placeholder="부동산을 검색하세요" />
        </div>
        <div className="action">
          <button type="button" className="outline">
            로그인
          </button>
          <button type="button" className="black">
            회원가입
          </button>
        </div>
      </div>

      <section>
        <img src={logo} className="logo" alt="logo" />
        <p>
          BLOCKON은 부동산 계약을 더욱 투명하게 하기 위한 블록체인 기반&nbsp;
          <strong>부동산 계약</strong> 시스템입니다.
        </p>
        <p>
          부동산 검색은 더욱 쉽게, 거래과정을 명확하게, 소통은 원할하게 이용하실
          수 있습니다.
        </p>
        <p>이제 BLOCKON으로 안심하고 거래하세요.</p>
      </section>

      <section className="feature">
        <div>
          <div>
            <img src={chattingIcon} alt="chatting" />
          </div>
          부동산의 평점을
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
            <img src={realestateIcon} alt="realestate" />
          </div>
          매수인, 개인, 매도인 간의
          <br />
          실시간 채팅서비스로
          <br />
          쉽고 빠르게 연락 가능합니다.
        </div>
      </section>

      <section className="app">
        <div className="image">
          <img src={phone} alt="phone" />
        </div>
        <div className="content">
          <p>
            이제 손쉽게&nbsp;
            <strong>BLOCKON</strong>을
          </p>
          <p>모바일 앱으로 만나보세요.</p>
          <div>
            <a className="button" href="https://www.apple.com/ios/app-store">
              APP STORE
            </a>
          </div>
          <div>
            <a className="button" href="https://play.google.com/store">
              PLAY STORE
            </a>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="form">
          <label htmlFor="email">성함</label>
          <input type="text" id="name" />
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" />
          <label htmlFor="phone">핸드폰</label>
          <input type="tel" id="phone" />
          <label htmlFor="feedback">문의사항</label>
          <textarea id="feedback" rows="6" cols="80" />
        </div>
        <div className="info">
          <h2>Contact US</h2>
          <div>
            <img src={mapIcon} alt="map" />
            경기 성남시 분당구 판교로289길 4층 BLOCKON
          </div>
          <div>
            <img src={mailIcon} alt="mail" />
            BLOCKON@gmail.com
          </div>
          <div>
            <img src={phoneIcon} alt="phone" />
            031-214-8698
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomeWrapper;
