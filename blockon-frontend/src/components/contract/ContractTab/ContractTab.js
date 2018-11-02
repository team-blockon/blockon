import React from 'react';
import classNames from 'classnames';
import './ContractTab.scss';

const ContractTabItem = ({ item, activeItem, handleSelect, children }) => {
  return (
    <li
      className={classNames({ active: item === activeItem })}
      onClick={() => handleSelect(item)}
    >
      {children}
    </li>
  );
};

const ContractTab = ({ activeTab, handleTabSelect }) => {
  return (
    <div className="ContractTab">
      <ul className="tab">
        <ContractTabItem
          item="ongoing"
          activeItem={activeTab}
          handleSelect={handleTabSelect}
        >
          진행중 거래
        </ContractTabItem>
        <ContractTabItem
          item="completed"
          activeItem={activeTab}
          handleSelect={handleTabSelect}
        >
          완료된 거래
        </ContractTabItem>
      </ul>
    </div>
  );
};

export default ContractTab;
