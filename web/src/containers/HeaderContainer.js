import React, { Component } from 'react';
import Header from 'components/base/Header';

class HeaderContainer extends Component {
  render() {
    const { navItem } = this.props;
    return <Header navItem={navItem} />;
  }
}

export default HeaderContainer;
