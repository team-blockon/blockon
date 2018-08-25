import React from 'react';
import { Link } from 'react-router-dom';
import maemulImage from 'static/images/maemul.png';
import './JunggaeTradeList.scss';

/**
 * contractInfoList 인덱스
 */
const TYPE = 0;
const STATE = 1;

/**
 * contractType 인덱스
 */
//const TRADE = 1;
//const RENT = 2;

/**
 * contract state
 *  1 - 계약금 입금
 *  2 - 중도금 입금
 *  3 - 잔금 입금
 *  4 - 등기 등록 신청
 *  5 - 확정일자 
 */
const REGISTRATION = 4;
const FIXED_DATE = 5;


/**
 * activeTab 인덱스
 * 0 - 진행중거래 탭
 * 1 - 완료된거래 탭
 */
const ONGOING_TAB = 0;
const COMPLETED_TAB = 1;

const getCard = (handleSelect, contractType, contractState) => {
  const card = (
    <div className="card">
      <p className="no">No. mxabcff</p>
      <div className="content">
        <div className="detail">
          <div className="image">
            <img src={maemulImage} alt="maemul" />
          </div>
          <div>
            <p>준영타워팰리스</p>
            <p>단독주택</p>
            <p>수원시 영통구 이의동 센트럴타운로 76</p>
            <p>{contractType} / 10억</p>
          </div>
        </div>
      </div>
      <div className="progressbar-wrapper">
        <ul className="progressbar">
          <li className="active" onClick={handleSelect}>
            계약금
          </li>
          <li className="active" onClick={handleSelect}>
            중도금
          </li>
          <li className="first-not-active" onClick={handleSelect}>
            잔금처리
          </li>
          <li onClick={handleSelect}>등기신청</li>
          <li onClick={handleSelect}>완료</li>
        </ul>
      </div>
    </div>
  );

  return card;
}

const getLists = (handleSelect, contractInfoList, activeTab) => {
  const cards = [];
  contractInfoList.forEach( contractInfo => {
    const contractType = contractInfo[TYPE];
    const contractState = contractInfo[STATE];
    if(activeTab === ONGOING_TAB) {
      if(contractState !== REGISTRATION && contractState !== FIXED_DATE) {
        cards.push(getCard(handleSelect, contractType, contractState));
      }
    } else if(activeTab === COMPLETED_TAB) {
      if(contractState === REGISTRATION || contractState === FIXED_DATE) {
        cards.push(getCard(handleSelect, contractType, contractState));
      }
    }
  });
  return cards;
};

const JunggaeTradeList = ({ handleSelect, contractInfoList, activeTab }) => {
  console.log('Entry : JunggaeTradeList');
  return (
    <div className="JunggaeTradeList">
      <div className="list-wrapper">{getLists(handleSelect, contractInfoList, activeTab)}</div>
      <div className="sidebar">
        <button>
          <Link to="/contract/edit">계약 올리기</Link>
        </button>
      </div>
    </div>
  );
};

export default JunggaeTradeList;
