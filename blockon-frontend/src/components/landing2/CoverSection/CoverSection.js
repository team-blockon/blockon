import React from 'react';
import { Input, AutoComplete } from 'antd';
import './CoverSection.scss';

const CoverSection = ({
  dataSource,
  agent,
  handleSearch,
  handlePressEnter
}) => {
  return (
    <section className="CoverContainer">
      <div className="subtitleDiv">
        안전한 거래를 함께할 중개소를 찾아보세요.
      </div>
      <div className="searchDiv">
        <AutoComplete dataSource={dataSource} onSearch={handleSearch}>
          <Input
            placeholder="관심지역 또는 공인중개소를 검색해보세요."
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
