import React from 'react';
import logo from 'static/images/logo.png';
import './BlockonSection.scss';

const BlockonSection = () => {
  return (
    <section className="BlockonSection">
      <img src={logo} className="logo" alt="logo" />
      <p>
        BLOCKON은 부동산 계약을 더욱 투명하게 하기 위한 블록체인 기반&nbsp;
        '부동산 거래 관리' 시스템입니다.
      </p>
      <p>
        공인중개사 검색은 더욱 쉽게, 거래과정을 명확하게, 소통은 원활하게
        이용하실 수 있습니다.
      </p>
      <p>이제 BLOCKON으로 안심하고 거래하세요.</p>
    </section>
  );
};

export default BlockonSection;
