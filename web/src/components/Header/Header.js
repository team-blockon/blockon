import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from 'static/images/logo-header.png';
import './Header.scss';

class Header extends Component {
  render() {
    const { navItem } = this.props;

    return (
      <header>
        <div className="menu container">
          <Link to="/">
            <img src={Logo} className="logo" alt="logo" />
          </Link>
          {navItem}
        </div>
      </header>
    );
  }
}

export default Header;
