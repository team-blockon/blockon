import React from 'react';
import coverLogo from 'static/images/logo-cover.png';
import { Input, AutoComplete } from 'antd';
import './CoverSection.scss';

const CoverSection = ({
  dataSource,
  agent,
  handleSearch,
  handlePressEnter
}) => {
  return (
    <section className="CoverSection">
      <div className="logo">
        <img src={coverLogo} alt="logo" />
      </div>
      <div className="subtitle">부동산 사기 위험에서 벗어나세요</div>
      <div className="search">
        <AutoComplete dataSource={dataSource} onSearch={handleSearch}>
          <Input
            placeholder="원하시는 지역을 검색해보세요."
            className="agent"
            value={agent}
            onPressEnter={handlePressEnter}
          />
        </AutoComplete>
      </div>
    </section>
  );
};

export default CoverSection;
