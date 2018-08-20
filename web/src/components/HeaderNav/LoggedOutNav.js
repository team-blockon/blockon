import React, { Component, Fragment } from 'react';
import { HeaderNavItem } from './HeaderNav';

class LoggedOutNav extends Component {
  render() {
    const { activeItem, onSelect } = this.props;

    return (
      <Fragment>
        <HeaderNavItem
          item="login"
          activeItem={activeItem}
          onSelect={onSelect}
          to="/auth/login"
        >
          로그인
        </HeaderNavItem>
      </Fragment>
    );
  }
}
export default LoggedOutNav;
