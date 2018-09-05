import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEvent } from 'store/modules/web3/contract';
import produce from 'immer';

import ContractTab from 'components/contract/ContractTab';
import ContractTabContent from 'components/contract/ContractTab/ContractTabContent';
import JunggaeTradeModal from 'components/junggae/JunggaeTradeModal';

import * as ContractAPI from 'lib/api/contract';
import * as Web3User from 'lib/web3/user';
import * as Web3Contract from 'lib/web3/contract';

// 계약상태 상수
const COMPLETED_CONTRACT = 100; // 계약 완료

class JunggaeMyPage extends Component {
  state = {
    tradeModal: false, // 모달을 보일건지 여부
    activeContractsNum: 0, // 진행중계약 개수
    completedContractsNum: 0, // 완료된계약 개수
    contractInfoList: [] // {index, type, state, building} 리스트
  };

  handleToggleModal = (
    accountAddress,
    contractIndex,
    newContractState,
    itemType
  ) => {
    this.setState({
      tradeModal: !this.state.tradeModal,
      accountAddress,
      contractIndex,
      newContractState,
      itemType
    });
  };

  /**
   * 블록체인으로 부터 인덱스에 해당하는 컨트랙트 정보를 가져와서
   * state.contractInfoList에 추가한다
   */
  addContractInfoAt = async (accountInstance, index) => {
    // 온체인 데이터 가져오기
    const contractInfo = await Web3Contract.getContractInfoAt(
      accountInstance,
      index
    );
    const contractType = contractInfo[0].toNumber();
    const contractState = contractInfo[1].toNumber();

    // 오프체인 데이터 가져오기
    const res = await ContractAPI.get(accountInstance.address, index);
    // building을 가져오기 전 null 체크
    // 어떤 문제로 인해 몽고DB에 정보가 올라가지 않은 경우
    if (!res || !res.data || !res.data.building) {
      return;
    }
    const { building } = res.data;

    // 최신 데이터를 가장 위로 추가
    this.setState(
      produce(draft => {
        draft.contractInfoList.unshift({
          index,
          type: contractType,
          state: contractState,
          building
        });
      })
    );

    // 진행중 거래와 완료된 거래의 개수를 업데이트
    if (contractState === COMPLETED_CONTRACT) {
      this.setState({
        completedContractsNum: this.state.completedContractsNum + 1
      });
    } else {
      this.setState({
        activeContractsNum: this.state.activeContractsNum + 1
      });
    }
  };

  /**
   * 블록체인으로 부터 인덱스에 해당하는 컨트랙트의 새로운 상태를 받아와서
   * state.contractInfoList를 업데이트 한다
   */
  changeContractStateAt = async (accountInstance, index) => {
    // 업데이트된 상태 정보 가져오기
    const contractInfo = await Web3Contract.getContractInfoAt(
      accountInstance,
      index
    );
    const contractState = contractInfo[1].toNumber();

    console.log('계약상태: ', contractState);
    console.groupEnd();

    this.setState(
      produce(draft => {
        draft.contractInfoList.forEach(info => {
          if (info.index === index) {
            info.state = contractState;
          }
        });
      })
    );

    // 진행중 거래와 완료된 거래의 개수를 업데이트
    if (contractState === COMPLETED_CONTRACT) {
      this.setState({
        activeContractsNum: this.state.activeContractsNum - 1,
        completedContractsNum: this.state.completedContractsNum + 1
      });
    }
  };

  watchUpdateEvent = () => {
    const { updateEvent } = this.props;
    const { accountInstance } = this.state;

    // 체이닝을 위한 Promise 리턴
    return updateEvent(accountInstance).then(
      ({ updateType, contractIndex }) => {
        console.group(`${contractIndex}번 계약 업데이트됨`);

        // 계약이 추가된 것이므로 state에 새로 생성된 계약 추가
        if (updateType === 1) {
          console.log('계약 추가됨');
          console.groupEnd();
          this.addContractInfoAt(accountInstance, contractIndex);
        } // 계약 추가했을 때 이벤트로는 안들어오고 다시 componentDidMount가 호출되는듯

        // 계약 상태가 변경된 것이므로 해당하는 인덱스의 상태 변경
        if (updateType === 2) {
          console.log('계약상태 변경됨');
          this.changeContractStateAt(accountInstance, contractIndex);
        }
      }
    );
  };

  async componentDidMount() {
    /**
     * 데이터베이스와 블록체인 네트워크로부터 정보를 받아온다
     * state에 정보를 채운다
     */

    // 현재 브라우저에 접속한 유저의 어카운트 계정 인스턴스 생성
    const { accountInstance } = await Web3User.getAccountInstance();
    this.setState({ accountInstance });

    // 현재 브라우저에 접속한 유저가 포함된 계약의 개수
    const contractsLength = await Web3Contract.getContractsLength(
      accountInstance
    );

    // 유저가 포함된 컨트랙트들을 state에 추가
    for (let i = 0; i < contractsLength; i++) {
      this.addContractInfoAt(accountInstance, i);
    }

    // state 제대로 들어갔나 확인
    this.state.contractInfoList.forEach(contractInfo => {
      console.group(`${contractInfo.index}번 계약`);
      console.log('계약종류: ' + contractInfo.type);
      console.log('계약상태: ' + contractInfo.state);
      console.log('건물주소: ' + contractInfo.building.address);
      console.groupEnd();
    });
  }

  render() {
    const {
      activeTab,
      activeType, // 목록형인지, 카드형인지
      handleTabSelect,
      handleTypeSelect
    } = this.props;
    const {
      tradeModal,
      accountAddress,
      contractIndex,
      newContractState,
      itemType
    } = this.state;

    return (
      <div
        className="JunggaeMyPage"
        style={
          activeTab === 2
            ? { backgroundColor: '#fff' }
            : { backgroundColor: '#fafafa' }
        }
      >
        <div className="container content">
          <ContractTab
            activeTab={activeTab}
            activeType={activeType}
            handleTabSelect={handleTabSelect}
            handleTypeSelect={handleTypeSelect}
            activeContractsNum={this.state.activeContractsNum}
            completedContractsNum={this.state.completedContractsNum}
          />

          <ContractTabContent
            activeTab={activeTab}
            activeType={activeType}
            contractInfoList={this.state.contractInfoList}
            accountInstance={this.state.accountInstance}
            handleSelect={this.handleToggleModal}
          />

          {tradeModal && (
            <JunggaeTradeModal
              onClose={this.handleToggleModal}
              accountAddress={accountAddress}
              contractIndex={contractIndex}
              newContractState={newContractState}
              itemType={itemType}
              watchUpdateEvent={this.watchUpdateEvent}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { updateEvent }
)(JunggaeMyPage);
