import React from 'react';
import './AuthLink.scss';

const AuthLink = ({ handleClick, children }) => {
  return (
    <div className="AuthLink" onClick={handleClick}>
      {children}
    </div>
  );
};

export default AuthLink;
