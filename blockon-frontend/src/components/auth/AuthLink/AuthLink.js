import React from 'react';
import './AuthLink.scss';

const AuthLink = ({ children, handleClick }) => {
  return (
    <div className="AuthLink" onClick={handleClick}>
      {children}
    </div>
  );
};

export default AuthLink;
