import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  render() {
    const { left, right } = this.props;
    return (
      <div className="Header">
        <div className="logo">
          <Link to="/contract">부마블</Link>
        </div>
        <div className="side left">{left}</div>
        <div className="side right">{right}</div>
      </div>
    );
  }
}

export default Header;
