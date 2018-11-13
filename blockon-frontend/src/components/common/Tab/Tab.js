import React from 'react';
import classNames from 'classnames';
import './Tab.scss';

const TabItem = ({ item, activeItem, handleSelect, children }) => {
  return (
    <li
      className={classNames({ active: item === activeItem })}
      onClick={() => handleSelect(item)}
    >
      {children}
    </li>
  );
};

const Tab = ({ children }) => {
  return (
    <div className="Tab">
      <ul className="tab">{children}</ul>
    </div>
  );
};

export { Tab, TabItem };
