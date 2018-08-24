import React, { Component } from 'react';
import JunggaeMyPage from 'components/JunggaeMyPage';

class MyPage extends Component {
  state = {
    activeTab: 0,
    activeType: 0
  };

  handleTabSelect = activeTab => {
    this.setState({
      activeTab
    });
  };

  handleTypeSelect = activeType => {
    this.setState({
      activeType
    });
  };

  componentDidMount() {
    const locationState = this.props.location.state;
    locationState && this.setState({ activeTab: locationState.activeTab });
  }

  render() {
    const { isJunggae } = this.props;
    const { activeTab, activeType } = this.state;

    return isJunggae ? (
      <JunggaeMyPage
        activeTab={activeTab}
        activeType={activeType}
        handleTabSelect={this.handleTabSelect}
        handleTypeSelect={this.handleTypeSelect}
      />
    ) : null;
  }
}

export default MyPage;
