import React from 'react';
import { Input, AutoComplete } from 'antd';
import './CoverSection.scss';


const CoverSection = ({
   dataSource,
   agent,
   handleSearch,
   handlePressEnter
}) => {
    return(
        <section className="CoverContainer">
            <div className="subtitleDiv">
                부동산 거래는 안전하게, 공인중개소 검색은 쉽게
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
    )
};

export default CoverSection;