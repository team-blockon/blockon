import React, { Component } from 'react';
import classNames from 'classnames';
import MaemulImage from 'static/images/maemul.png';
import './JunggaeMyPage.scss';
import JunggaeReview from '../JunggaeReview';

const MyPageTab = ({ activeTab, item, handleSelect, children }) => {
  return (
    <li
      className={classNames({ active: activeTab === item })}
      onClick={() => handleSelect(item)}
    >
      {children}
    </li>
  );
};

class JunggaeMyPage extends Component {
  getCards = () => {
    const cards = [];
    const card = (
      <div className="card">
        <div className="content">
          <img src={MaemulImage} alt="maemul" />
          <p>준영타워팰리스</p>
          <p>영통구 이의동 센트럴타운로</p>
          <p>잔금처리진행중</p>
        </div>
        <div className="action">
          <div>매도인에게</div>
          <div>매수인에게</div>
        </div>
      </div>
    );

    for (let i = 0; i < 9; i++) {
      cards.push(card);
    }

    return cards;
  };

  getTabContent = activeTab => {
    switch (activeTab) {
    case 0:
      return <div className="card-wrapper">{this.getCards()}</div>;
    case 1:
      return '완료된거래';
    case 2:
      return <JunggaeReview />;
    default:
      return '유효하지 않은 탭입니다.';
    }
  };

  render() {
    const { activeTab, handleSelect } = this.props;

    return (
      <div className="JunggaeMyPage">
        <div className="container content">
          <ul className="tab">
            <MyPageTab
              item={0}
              activeTab={activeTab}
              handleSelect={handleSelect}
            >
              진행중거래 (9건)
            </MyPageTab>
            <MyPageTab
              item={1}
              activeTab={activeTab}
              handleSelect={handleSelect}
            >
              완료된거래 (20건)
            </MyPageTab>
            <MyPageTab
              item={2}
              activeTab={activeTab}
              handleSelect={handleSelect}
            >
              평점및리뷰 (30건)
            </MyPageTab>
          </ul>

          {this.getTabContent(activeTab)}
        </div>
      </div>
    );
  }
}

export default JunggaeMyPage;
