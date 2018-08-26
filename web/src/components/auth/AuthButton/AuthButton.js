import React from 'react';
import './AuthButton.scss';

const AuthButton = ({ children, onClick }) => {
  return (
    <div className="AuthButton" onClick={onClick}>
      {children}
    </div>
  );
};

export default AuthButton;
