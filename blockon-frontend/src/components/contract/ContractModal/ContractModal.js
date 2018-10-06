import React, { Component } from 'react';
import * as Web3User from 'lib/web3/user';

import { MdClose as CloseIcon } from 'react-icons/lib/md';
import { Button } from 'antd';
import './ContractModal.scss';

class ContractModal extends Component {
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
      <div className="ContractModal">
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

export default ContractModal;
