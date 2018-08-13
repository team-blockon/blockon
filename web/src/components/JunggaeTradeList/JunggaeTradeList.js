import React from 'react';
import maemulImage from 'static/images/maemul.png';
import './JunggaeTradeList.scss';

const getLists = () => {
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
            <p>매매</p>
            <p>매매가 10억</p>
          </div>
        </div>
      </div>
      <div className="action">
        <div>매도인에게</div>
        <div>매수인에게</div>
      </div>
    </div>
  );

  for (let i = 0; i < 5; i++) {
    cards.push(card);
  }

  return cards;
};

const JunggaeTradeList = () => {
  return <div className="list-wrapper">{getLists()}</div>;
};

export default JunggaeTradeList;
