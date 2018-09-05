import React from 'react';
import chattingIcon from 'static/images/icon/chatting.png';
import contractIcon from 'static/images/icon/contract.png';
import gradeIcon from 'static/images/icon/grade.png';
import './FeatureSection.scss';

const FeatureSection = () => {
  return (
    <section className="FeatureSection">
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

export default FeatureSection;
