import React from 'react';
import classNames from 'classnames';
import {
  TiThMenu as ListIcon,
  TiThLarge as CardIcon
} from 'react-icons/lib/ti';
import './ContractTab.scss';

const ContractTabItem = ({ activeItem, item, handleSelect, children }) => {
  return (
    <li
      className={classNames({ active: activeItem === item })}
      onClick={() => handleSelect(item)}
    >
      {children}
    </li>
  );
};

const ContractTab = ({
  activeTab,
  activeType,
  handleTabSelect,
  handleTypeSelect,
  activeContractsNum,
  completedContractsNum,
  isJunggae
}) => {
  return (
    <div className="ContractTab">
      <ul className="tab">
        <ContractTabItem
          item="ongoing"
          activeItem={activeTab}
          handleSelect={handleTabSelect}
        >
          진행중거래 ({activeContractsNum}
          건)
        </ContractTabItem>
        <ContractTabItem
          item="completed"
          activeItem={activeTab}
          handleSelect={handleTabSelect}
        >
          완료된거래 ({completedContractsNum}
          건)
        </ContractTabItem>
        {isJunggae && ( // 중개인만 리뷰 탭 보이기
          <ContractTabItem
            item="review"
            activeItem={activeTab}
            handleSelect={handleTabSelect}
          >
            평점및리뷰 (30건)
          </ContractTabItem>
        )}
      </ul>

      {activeTab !== 2 && (
        <ul className="type">
          <ContractTabItem
            item={0}
            activeItem={activeType}
            handleSelect={handleTypeSelect}
          >
            <ListIcon />
          </ContractTabItem>
          <ContractTabItem
            item={1}
            activeItem={activeType}
            handleSelect={handleTypeSelect}
          >
            <CardIcon />
          </ContractTabItem>
        </ul>
      )}
    </div>
  );
};

export default ContractTab;
