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
const TRADE = 1;
const RENT = 2;

const getCard = (handleSelect, contractType, contractState) => {
  const card = (
    <div className="card">
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

const getLists = (handleSelect, contractInfoList) => {
  const cards = [];
  contractInfoList.forEach( contractInfo => {
    cards.push(getCard(handleSelect, contractInfo[TYPE], contractInfo[STATE] ));
  });
  return cards;
};

const JunggaeTradeList = ({ handleSelect, contractInfoList }) => {
  console.log("Entry : JunggaeTradeList");
  return (
    <div className="JunggaeTradeList">
      <div className="list-wrapper">{getLists(handleSelect, contractInfoList)}</div>
      <div className="sidebar">
        <button>
          <Link to="/contract/edit">계약 올리기</Link>
        </button>
      </div>
    </div>
  );
};

export default JunggaeTradeList;
