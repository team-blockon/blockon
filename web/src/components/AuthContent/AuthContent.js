import React from 'react';
import './AuthContent.scss';

const AuthContent = ({ title, children }) => {
  return (
    <div className="AuthContent">
      <div className="title">{title}</div>
      {children}
    </div>
  );
};

export default AuthContent;
