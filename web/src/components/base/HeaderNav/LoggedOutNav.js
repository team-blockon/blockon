import React, { Fragment } from 'react';
import { HeaderNavItem } from './HeaderNav';

const LoggedOutNav = ({ nav_click }) => {
  return (
    <Fragment>
      <HeaderNavItem item="login" nav_click={nav_click} to="/auth/login">
        로그인
      </HeaderNavItem>
    </Fragment>
  );
};

export default LoggedOutNav;
