import React from 'react';
import classNames from 'classnames';
import SearchIcon from 'react-icons/lib/md/home';
import MyPageIcon from 'react-icons/lib/md/info';
import './HeaderNav.scss';

const HeaderNavItem = ({ children, selected, tab, iconType, onSelect }) => {
  const icon = iconType ? React.createElement(iconType) : null;

  return (
    <div
      className={classNames('HeaderNavItem', {
        active: selected === tab
      })}
      onClick={() => onSelect(tab)}
    >
      <div className="icon">{icon}</div>
      <div className="text">{children}</div>
    </div>
  );
};

/**
 * 헤더 탭 컴포넌트
 * @param tab 현재 선택된 탭
 * @param onSelect 탭 선택 함수
 */
const HeaderNav = ({ tab, onSelect }) => {
  return (
    <div className="HeaderNav">
      <HeaderNavItem
        iconType={SearchIcon}
        tab="contract"
        selected={tab}
        onSelect={onSelect}
      >
        중개사 찾기
      </HeaderNavItem>
      <HeaderNavItem
        iconType={MyPageIcon}
        tab="message"
        selected={tab}
        onSelect={onSelect}
      >
        마이페이지
      </HeaderNavItem>
    </div>
  );
};

export default HeaderNav;
