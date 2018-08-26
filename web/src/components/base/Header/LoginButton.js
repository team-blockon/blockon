import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const LoginButton = ({ to, children }) => {
  return (
    <Link to={to}>
      <Button>{children}</Button>
    </Link>
  );
};

export default LoginButton;
