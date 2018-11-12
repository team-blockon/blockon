import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LogoBlack from 'static/images/logo-header-black.png';
import './Header.scss';

class Header extends Component {
  render() {
    const { navItem } = this.props;

    return (
      <header>
        <div className="menu">
          <Link to="/">
            <img src={LogoBlack} className="logo" alt="logo" />
          </Link>
          {navItem}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
