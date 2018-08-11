import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoggedOutNav = () => {
  return (
    <Fragment>
      <li>
        <Link to="/auth/login">로그인</Link>
      </li>
    </Fragment>
  );
};

export default LoggedOutNav;
