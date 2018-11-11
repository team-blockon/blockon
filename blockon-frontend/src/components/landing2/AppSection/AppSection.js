import React from 'react';
import blockonIcon from 'static/images/icon/blockon-icon.svg';
import checkIcon from 'static/images/icon/check.png';
import './AppSection.scss';

const AppSection = () => {
  return (
    <section className="AppSection">
      <div>
        <img src={blockonIcon} alt="blockon" />
      </div>
      <p>BLOCKON 앱 다운받기</p>
      <p>스마트폰에서 더욱 편리하게 사용하세요.</p>
      <div className="phoneInput">
        <input placeholder="010-xxxx-xxxx" />
        <div>
          <img src={checkIcon} alt="confirm" />
        </div>
      </div>
    </section>
  );
};

export default AppSection;
