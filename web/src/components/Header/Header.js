import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from 'static/images/logo-header.png';
import LogoBlack from 'static/images/logo-header-black.png';
import './Header.scss';

class Header extends Component {
  render() {
    const { navItem, location } = this.props;

    return (
      <header className={location.pathname === '/' && 'landing'}>
        <div className="menu container">
          <Link to="/">
            <img
              src={location.pathname === '/' ? Logo : LogoBlack}
              className="logo"
              alt="logo"
            />
          </Link>
          {navItem}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
