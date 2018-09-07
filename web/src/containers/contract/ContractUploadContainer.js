import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEvent } from 'store/modules/web3/contract';
import ContractUploadTemplate from 'components/contract/ContractUploadTemplate';

class ContractUploadContainer extends Component {
  render() {
    const { updateEvent, loading } = this.props;
    return (
      <ContractUploadTemplate updateEvent={updateEvent} loading={loading} />
    );
  }
}

export default connect(
  ({ pender }) => ({ loading: pender.pending['web3/contract/UPDATE_EVENT'] }),
  { updateEvent }
)(ContractUploadContainer);
