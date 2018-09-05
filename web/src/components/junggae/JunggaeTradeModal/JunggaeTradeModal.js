import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeState } from 'store/modules/web3/contract';
import * as Web3User from 'lib/web3/user';

import { MdClose as CloseIcon } from 'react-icons/lib/md';
import { Button } from 'antd';
import './JunggaeTradeModal.scss';

class JunggaeTradeModal extends Component {
  handleSubmit = async () => {
    const {
      contractIndex, // 상태를 변경할 계약 인덱스
      newContractState, // 새로운 상태
      changeState,
      watchUpdateEvent,
      onClose
    } = this.props;

    const { accountInstance } = await Web3User.getAccountInstance();
    await changeState({
      accountInstance,
      contractIndex,
      newContractState
    });
    await watchUpdateEvent();
    onClose();
  };

  render = () => {
    const {
      itemType, // 이동할 단계 이름
      onClose
    } = this.props;

    return (
      <div className="JunggaeTradeModal">
        <div className="dark" onClick={onClose} />
        <div className="modal">
          <div className="head">
            <h3>
              {itemType}
              으로 이동하시겠습니까?
            </h3>
            <div className="exit" onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
          <Button type="primary" onClick={this.handleSubmit}>
            확인
          </Button>
        </div>
      </div>
    );
  };
}

export default connect(
  null,
  { changeState }
)(JunggaeTradeModal);
