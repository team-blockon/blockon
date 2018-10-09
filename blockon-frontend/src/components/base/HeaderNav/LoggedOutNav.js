import React from 'react';
import { HeaderNavItem } from './HeaderNav';

const LoggedOutNav = () => {
  return (
    <HeaderNavItem item="login" to="/auth/login">
      로그인
    </HeaderNavItem>
  );
};

export default LoggedOutNav;
