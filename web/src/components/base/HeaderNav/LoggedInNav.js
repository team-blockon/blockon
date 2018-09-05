import React, { Fragment } from 'react';
import { HeaderNavItem } from './HeaderNav';

const LoggedInNav = ({ nav_click, handleLogout }) => {
  return (
    <Fragment>
      <HeaderNavItem item="contract" nav_click={nav_click} to="/contract">
        계약관리
      </HeaderNavItem>
      <HeaderNavItem item="mypage" nav_click={nav_click} to="/mypage">
        마이페이지
      </HeaderNavItem>
      <li onClick={handleLogout}>로그아웃</li>
    </Fragment>
  );
};

export default LoggedInNav;
