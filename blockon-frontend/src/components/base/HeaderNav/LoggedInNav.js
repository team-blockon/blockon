import React, { Fragment } from 'react';
import { HeaderNavItem } from './HeaderNav';

const LoggedInNav = ({ handleLogout }) => {
  return (
    <Fragment>
      <HeaderNavItem item="contract" to="/contract">
        계약관리
      </HeaderNavItem>
      <HeaderNavItem item="mypage" to="/mypage">
        마이페이지
      </HeaderNavItem>
      <li onClick={handleLogout}>로그아웃</li>
    </Fragment>
  );
};

export default LoggedInNav;
