import React from 'react';
import maemulImage from 'static/images/maemul.png';
import './JunggaeTradeCard.scss';

const getCards = () => {
  const cards = [];
  const card = (
    <div className="card">
      <p className="no">No. mxabcff</p>
      <div className="content">
        <img src={maemulImage} alt="maemul" />
        <div>
          <p>18.07.05</p>
          <p>준영타워팰리스</p>
          <p>영통구 이의동 센트럴타운로</p>
          <p>잔금처리진행중</p>
        </div>
      </div>
    </div>
  );

  for (let i = 0; i < 9; i++) {
    cards.push(card);
  }

  return cards;
};

const JunggaeTradeCard = () => {
  return <div className="card-wrapper">{getCards()}</div>;
};

export default JunggaeTradeCard;
