import React, { Component } from 'react';
import JunggaeMyPage from 'components/JunggaeMyPage';

class MyPage extends Component {
  render() {
    const { isJunggae } = this.props;
    return isJunggae ? <JunggaeMyPage /> : null;
  }
}

export default MyPage;
