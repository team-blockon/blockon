import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoggedInNav = ({ handleLogout }) => {
  return (
    <Fragment>
      <li>
        <Link to="/contract">계약관리</Link>
      </li>
      <li>마이페이지</li>
      <li onClick={handleLogout}>로그아웃</li>
    </Fragment>
  );
};

export default LoggedInNav;
