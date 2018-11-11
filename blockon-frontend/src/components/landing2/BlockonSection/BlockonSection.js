import React from 'react';
import chattingIcon from 'static/images/icon/chatting2.svg';
import contractIcon from 'static/images/icon/contract2.svg';
import gradeIcon from 'static/images/icon/grade2.svg';
import './BlockonSection.scss';

const BlockonSection = () => {
  return (
    <section className="BlockonSection">
      <div className="slogan">
        <p>부동산 계약, 이제 안심하세요.</p>
        <p>블록체인 기반 부동산 계약 시스템 BLOCKON 은</p>
      </div>
      <div className="featureContainer">
        <div className="feature">
          <div>
            <img src={gradeIcon} alt="grade" />
          </div>
          <div className="explanation">
            <p className="title">공인중개소 평점시스템</p>
            <p>
              공인중개사의 평점을
              <br />
              위치 기반으로 편리하게
              <br />
              검색할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="feature">
          <div>
            <img src={contractIcon} alt="contract" />
          </div>
          <div className="explanation">
            <p className="title">블록체인 기반 부동산 거래</p>
            <p>
              블록체인으로 거래내역이
              <br />
              투명하게 공개되어
              <br />
              위변조 및 대리계약의
              <br />
              가능성이 없습니다.
            </p>
          </div>
        </div>
        <div className="feature">
          <div>
            <img src={chattingIcon} alt="chatting" />
          </div>
          <div className="explanation">
            <p className="title">실시간 채팅</p>
            <p>
              매수인, 중개인, 매도인 간의
              <br />
              실시간 채팅 서비스로
              <br />
              쉽고 빠르게 연락 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockonSection;
