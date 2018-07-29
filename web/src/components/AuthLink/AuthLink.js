import React from "react";
import { Link } from "react-router-dom";
import "./AuthLink.scss";

const AuthLink = ({ to, children }) => {
  return (
    <div className="AuthLink">
      <Link to={to}>{children}</Link>
    </div>
  );
};

export default AuthLink;
