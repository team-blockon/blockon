import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeState, updateEvent } from 'store/modules/caver/contract';
import ContractTemplate from 'components/contract/ContractTemplate';

class ContractContainer extends Component {
  state = {
    activeTab: 'ongoing',
    activeType: 0
  };

  // 탭 클릭 이벤트 핸들러
  handleTabSelect = activeTab => {
    this.setState({
      activeTab
    });
  };

  // 카드형, 목록형 클릭 이벤트 핸들러
  handleTypeSelect = activeType => {
    this.setState({
      activeType
    });
  };

  // Pricing 페이지에서 결제 후 리뷰 탭이 보이도록 설정
  componentDidMount() {
    const locationState = this.props.location.state;
    locationState && this.setState({ activeTab: locationState.activeTab });
  }

  render() {
    const { isJunggae, changeState, updateEvent } = this.props;
    const { activeTab, activeType } = this.state;

    return (
      <ContractTemplate
        activeTab={activeTab}
        activeType={activeType}
        handleTabSelect={this.handleTabSelect}
        handleTypeSelect={this.handleTypeSelect}
        isJunggae={isJunggae}
        changeState={changeState}
        updateEvent={updateEvent}
      />
    );
  }
}

export default connect(
  ({ user }) => ({ isJunggae: user.isJunggae }),
  { changeState, updateEvent }
)(withRouter(ContractContainer));
