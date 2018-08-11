import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './HeaderNav.scss';

export const HeaderNavItem = ({ children, selected, item, onSelect, to }) => {
  return (
    <li
      className={classNames({
        active: selected === item
      })}
      onClick={() => onSelect(item)}
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};

/**
 * 헤더 아이템 컴포넌트
 * @param activeItem 현재 선택된 아이템
 * @param onSelect 아이템 선택 함수
 */
const HeaderNav = ({ activeItem, onSelect, userButtons }) => {
  return (
    <nav className="HeaderNav">
      <ul>
        <HeaderNavItem
          item="about"
          selected={activeItem}
          onSelect={onSelect}
          to="/"
        >
          소개
        </HeaderNavItem>
        <HeaderNavItem
          item="message"
          selected={activeItem}
          onSelect={onSelect}
          to="/search"
        >
          부동산 검색
        </HeaderNavItem>
        <HeaderNavItem
          item="help"
          selected={activeItem}
          onSelect={onSelect}
          to="/help"
        >
          고객센터
        </HeaderNavItem>
        {userButtons}
      </ul>
    </nav>
  );
};

export default HeaderNav;
