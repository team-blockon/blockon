import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEvent } from 'store/modules/caver/contract';
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
  ({ pender }) => ({ loading: pender.pending['caver/contract/UPDATE_EVENT'] }),
  { updateEvent }
)(ContractUploadContainer);
