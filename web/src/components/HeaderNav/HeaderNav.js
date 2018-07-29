import React from "react";
import classNames from "classnames";
import ContractIcon from "react-icons/lib/md/settings";
import MessageIcon from "react-icons/lib/md/message";
import "./HeaderNav.scss";

const HeaderNavItem = ({ children, selected, tab, iconType, onSelect }) => {
  const icon = iconType ? React.createElement(iconType) : null;

  return (
    <div
      className={classNames("HeaderNavItem", {
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
        iconType={ContractIcon}
        tab="contract"
        selected={tab}
        onSelect={onSelect}
      >
        계약관리
      </HeaderNavItem>
      <HeaderNavItem
        iconType={MessageIcon}
        tab="message"
        selected={tab}
        onSelect={onSelect}
      >
        메시지
      </HeaderNavItem>
    </div>
  );
};

export default HeaderNav;
