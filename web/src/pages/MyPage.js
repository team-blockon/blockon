import React, { Component } from 'react';
import JunggaeMyPage from 'components/JunggaeMyPage';

class MyPage extends Component {
  state = {
    activeTab: 0
  };

  handleSelect = activeTab => {
    this.setState({
      activeTab
    });
  };

  render() {
    const { isJunggae } = this.props;
    const { activeTab } = this.state;

    return isJunggae ? (
      <JunggaeMyPage activeTab={activeTab} handleSelect={this.handleSelect} />
    ) : null;
  }
}

export default MyPage;
