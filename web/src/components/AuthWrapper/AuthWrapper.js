import React from "react";
import "./AuthWrapper.scss";

const AuthWrapper = ({ children }) => {
  return (
    <div className="AuthWrapper">
      <div className="shadowedBox">
        <div className="contents">{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
