import React, { Component } from 'react';
import classNames from 'classnames';
import {
  TiThMenu as ListIcon,
  TiThLarge as CardIcon
} from 'react-icons/lib/ti';
import './JunggaeMyPage.scss';
import JunggaeReview from '../JunggaeReview';
import JunggaeTradeCard from '../JunggaeTradeCard/JunggaeTradeCard';
import JunggaeTradeList from '../JunggaeTradeList/JunggaeTradeList';
import JunggaeTradeModal from '../JunggaeTradeModal';

const MyPageTab = ({ activeItem, item, handleSelect, children }) => {
  return (
    <li
      className={classNames({ active: activeItem === item })}
      onClick={() => handleSelect(item)}
    >
      {children}
    </li>
  );
};

class JunggaeMyPage extends Component {
  state = {
    tradeModal: false
  };

  handleToggleModal = () => {
    this.setState({
      tradeModal: !this.state.tradeModal
    });
  };

  getTabContent = (activeTab, activeType) => {
    switch (activeTab) {
    case 0:
      if (activeType === 0) {
        return <JunggaeTradeCard />;
      } else {
        return <JunggaeTradeList handleSelect={this.handleToggleModal} />;
      }
    case 1:
      return '완료된거래';
    case 2:
      return <JunggaeReview />;
    default:
      return '유효하지 않은 탭입니다.';
    }
  };

  render() {
    const {
      activeTab,
      activeType,
      handleTabSelect,
      handleTypeSelect
    } = this.props;
    const { tradeModal } = this.state;

    return (
      <div className="JunggaeMyPage">
        <div className="container content">
          <div className="control">
            <ul className="tab">
              <MyPageTab
                item={0}
                activeItem={activeTab}
                handleSelect={handleTabSelect}
              >
                진행중거래 (9건)
              </MyPageTab>
              <MyPageTab
                item={1}
                activeItem={activeTab}
                handleSelect={handleTabSelect}
              >
                완료된거래 (20건)
              </MyPageTab>
              <MyPageTab
                item={2}
                activeItem={activeTab}
                handleSelect={handleTabSelect}
              >
                평점및리뷰 (30건)
              </MyPageTab>
            </ul>

            {activeTab !== 2 && (
              <ul className="type">
                <MyPageTab
                  item={0}
                  activeItem={activeType}
                  handleSelect={handleTypeSelect}
                >
                  <CardIcon />
                </MyPageTab>
                <MyPageTab
                  item={1}
                  activeItem={activeType}
                  handleSelect={handleTypeSelect}
                >
                  <ListIcon />
                </MyPageTab>
              </ul>
            )}
          </div>

          {this.getTabContent(activeTab, activeType)}
          {tradeModal && <JunggaeTradeModal onClose={this.handleToggleModal} />}
        </div>
      </div>
    );
  }
}

export default JunggaeMyPage;
