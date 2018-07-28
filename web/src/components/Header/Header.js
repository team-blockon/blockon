import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  render() {
    const { left, right } = this.props;
    return (
      <div className="Header">
        <div className="side left">{left}</div>
        <div className="middle">부마블</div>
        <div className="side right">{right}</div>
      </div>
    );
  }
}

export default Header;
