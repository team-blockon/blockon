import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEvent } from 'store/modules/caver/contract';
import ContractUploadTemplate from 'components/contract/ContractUploadTemplate';

class ContractUploadContainer extends Component {
  render() {
    const { updateEvent } = this.props;
    return <ContractUploadTemplate updateEvent={updateEvent} />;
  }
}

export default connect(
  null,
  { updateEvent }
)(ContractUploadContainer);
