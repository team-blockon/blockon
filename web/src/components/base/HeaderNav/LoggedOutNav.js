import React from 'react';
import { HeaderNavItem } from './HeaderNav';

const LoggedOutNav = ({ nav_click }) => {
  return (
    <HeaderNavItem item="login" nav_click={nav_click} to="/auth/login">
      로그인
    </HeaderNavItem>
  );
};

export default LoggedOutNav;
