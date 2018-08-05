import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

class Header extends Component {
  render() {
    const { left, right, children } = this.props;
    return (
      <div className="Header">
        <div className="logo">
          <Link to="/">blockon</Link>
        </div>
        <div className="side left">{left}</div>
        <div className="side right">{right}</div>
        {children}
      </div>
    );
  }
}

export default Header;
