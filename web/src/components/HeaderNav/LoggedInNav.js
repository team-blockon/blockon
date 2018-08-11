import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoggedInNav = ({ handleLogout }) => {
  return (
    <Fragment>
      <li>
        <Link to="/mypage">마이페이지</Link>
      </li>
      <li onClick={handleLogout}>로그아웃</li>
    </Fragment>
  );
};

export default LoggedInNav;
