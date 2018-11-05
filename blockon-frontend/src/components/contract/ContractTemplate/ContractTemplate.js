import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loadingActions from 'store/modules/loading';
import { Link } from 'react-router-dom';
import produce from 'immer';

import ContractTab from '../ContractTab';
import ContractCard from '../ContractCard';
import ContractModal from '../ContractModal';
import Pagination from 'components/common/Pagination';
import Loading from 'components/common/Loading';

import * as ContractAPI from 'lib/api/contract';
import * as Web3User from 'lib/web3/user';
import * as Web3Contract from 'lib/web3/contract';

import NoListImage from 'static/images/no-list.svg';
import './ContractTemplate.scss';

import * as ContractUtils from 'lib/utils/contract';
const { cs } = ContractUtils;

class ContractTemplate extends Component {
  state = {
    contractModal: false, // 모달을 보일건지 여부
    activeContractsNum: 0, // 진행중계약 개수
    completedContractsNum: 0, // 완료된계약 개수
    contractInfoList: [] // {index, type, state, building} 리스트
  };

  handleToggleModal = (
    accountAddress,
    contractIndex,
    newContractStep,
    itemType
  ) => {
    this.setState({
      contractModal: !this.state.contractModal,
      accountAddress,
      contractIndex,
      newContractStep,
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
    const contractStep = contractInfo[1].toNumber();

    // 오프체인 데이터 가져오기
    const res = await ContractAPI.get(accountInstance.address, index);
    // building을 가져오기 전 null 체크
    // 어떤 문제로 인해 몽고DB에 정보가 올라가지 않은 경우
    if (!res || !res.data || !res.data.building) {
      return;
    }
    const { people, building } = res.data;

    // 최신 데이터를 가장 위로 추가
    this.setState(
      produce(draft => {
        draft.contractInfoList.unshift({
          index,
          type: contractType,
          state: contractStep,
          people,
          building
        });
      })
    );

    // 진행중 거래와 완료된 거래의 개수를 업데이트
    if (contractStep === cs.COMPLETED_CONTRACT) {
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
  contractStateChanged = async (accountInstance, index) => {
    // 업데이트된 상태 정보 가져오기
    const contractInfo = await Web3Contract.getContractInfoAt(
      accountInstance,
      index
    );
    const contractStep = contractInfo[1].toNumber();

    console.log('계약단계: ', contractStep);
    console.groupEnd();

    this.setState(
      produce(draft => {
        draft.contractInfoList.forEach(info => {
          if (info.index === index) {
            info.state = contractStep;
          }
        });
      })
    );

    // 진행중 거래와 완료된 거래의 개수를 업데이트
    if (contractStep === cs.COMPLETED_CONTRACT) {
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
          this.contractStateChanged(accountInstance, contractIndex);
        }
      }
    );
  };

  isNoList = () => {
    const { activeTab, isLoading } = this.props;
    // 로딩 중이면 일단 보류
    if (isLoading) return false;
    // 현재 탭이 진행중 거래 탭이면서 진행중 거래가 0건일 때
    if (activeTab === 'ongoing' && this.state.activeContractsNum === 0)
      return true;
    // 현재 탭이 완료된 거래 탭이면서 완료된 거래가 0건일 때
    if (activeTab === 'completed' && this.state.completedContractsNum === 0)
      return true;
    return false;
  };

  /**
   * 로딩 중이지 않을 때에만 카드 반환
   */
  getContractCard = () => {
    const { contractInfoList } = this.state;
    const { activeTab, isLoading } = this.props;
    if (isLoading) return null;

    return (
      <ContractCard contractInfoList={contractInfoList} activeTab={activeTab} />
    );
  };

  async componentDidMount() {
    const { LoadingActions } = this.props;
    LoadingActions.startLoading(); // 로딩 시작

    /**
     * 데이터베이스와 블록체인 네트워크로부터 정보를 받아온다
     * state에 정보를 채운다
     */

    // 현재 브라우저에 접속한 유저의 어카운트 계정 인스턴스 생성
    const { accountInstance } = await Web3User.getAccountInfo();
    this.setState({ accountInstance });

    // 현재 브라우저에 접속한 유저가 포함된 계약의 개수
    const contractsLength = await Web3Contract.getContractsLength(
      accountInstance
    );

    // 유저가 포함된 컨트랙트들을 state에 추가
    for (let i = 0; i < contractsLength; i++) {
      await this.addContractInfoAt(accountInstance, i);
    }
    LoadingActions.stopLoading(); // 로딩 끝

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
    const { activeTab, handleTabSelect, changeState, isLoading } = this.props;
    const {
      contractModal,
      accountAddress,
      contractIndex,
      newContractStep,
      itemType
    } = this.state;

    return (
      <div className="ContractTemplate">
        <div className="container content">
          <ContractTab
            activeTab={activeTab}
            handleTabSelect={handleTabSelect}
          />

          <div className="control">
            {activeTab === 'ongoing' ? (
              <span>진행중 거래 {this.state.activeContractsNum}건</span>
            ) : (
              <span>완료된 거래 {this.state.completedContractsNum}건</span>
            )}
            <button className="upload">
              <Link to="/contract/edit">거래 올리기</Link>
            </button>
          </div>

          {/* 거래가 존재하지 않으면 */}
          {this.isNoList() && (
            <div className="no-list">
              <img src={NoListImage} alt="no list" />
              등록된 거래가 없습니다.
            </div>
          )}

          {/* 거래가 존재하면서 로딩 중이면 로딩 인디케이터 띄움 */}
          {!this.isNoList() && (
            <div className="content-wrapper">
              {isLoading && <Loading />}
              {this.getContractCard()}
            </div>
          )}
          <Pagination />

          {contractModal && (
            <ContractModal
              onClose={this.handleToggleModal}
              accountAddress={accountAddress}
              contractIndex={contractIndex}
              newContractStep={newContractStep}
              itemType={itemType}
              changeState={changeState}
              watchUpdateEvent={this.watchUpdateEvent}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ loading }) => ({ isLoading: loading.isLoading }),
  dispatch => ({
    LoadingActions: bindActionCreators(loadingActions, dispatch)
  })
)(ContractTemplate);
