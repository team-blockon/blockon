import React from 'react';
import { Link } from 'react-router-dom';
import maemulImage from 'static/images/maemul.png';
import './JunggaeTradeList.scss';

const getLists = handleSelect => {
  const cards = [];
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
            <p>매매 / 10억</p>
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

  for (let i = 0; i < 5; i++) {
    cards.push(card);
  }

  return cards;
};

const JunggaeTradeList = ({ handleSelect }) => {
  return (
    <div className="JunggaeTradeList">
      <div className="list-wrapper">{getLists(handleSelect)}</div>
      <div className="sidebar">
        <button>
          <Link to="/contract/edit">계약 올리기</Link>
        </button>
      </div>
    </div>
  );
};

export default JunggaeTradeList;
