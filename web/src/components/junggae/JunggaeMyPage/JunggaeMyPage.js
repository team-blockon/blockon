import React, { Component } from 'react';
import produce from 'immer';
import classNames from 'classnames';
import {
  TiThMenu as ListIcon,
  TiThLarge as CardIcon
} from 'react-icons/lib/ti';
import './JunggaeMyPage.scss';
import JunggaeReview from '../JunggaeReview';
import JunggaeTradeCard from '../JunggaeTradeCard/JunggaeTradeCard';
import JunggaeTradeList from '../JunggaeTradeList/JunggaeTradeList';
import JunggaeTradeModal from '../JunggaeTradeModal';
import * as UserAPI from 'lib/api/user';
import * as ContractAPI from 'lib/api/contract';
import * as MetamaskUtil from 'lib/MetamaskUtil';

import AccountAbi from 'abi/account_abi';

const MyPageTab = ({ activeItem, item, handleSelect, children }) => {
  return (
    <li
      className={classNames({ active: activeItem === item })}
      onClick={() => handleSelect(item)}
    >
      {children}
    </li>
  );
};

/**
 * contractInfoList 인덱스
 */
//const TYPE = 0;
const STATE = 1;

/**
 * contract state
 * 100 - 완료
 */
const COMPLETED_CONTRACT = 100;

/**
 * activeTab 인덱스
 * 0 - 진행중거래 탭
 * 1 - 완료된거래 탭
 */
const ONGOING_TAB = 0;
const COMPLETED_TAB = 1;

class JunggaeMyPage extends Component {
  state = {
    tradeModal: false,
    activeContractsNum: 0,
    completedContractsNum: 0,
    // {index, type, state}의 리스트
    contractInfoList: []
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

  getTabContent = (activeTab, activeType) => {
    // console.log('Entry :getTabContent');
    switch (activeTab) {
    case ONGOING_TAB: //진행중 거래
      if (activeType === 0) {
        return (
          <JunggaeTradeList
            handleSelect={this.handleToggleModal}
            contractInfoList={this.state.contractInfoList}
            accountInstance={this.state.accountInstance}
            activeTab={activeTab}
          />
        );
      } else {
        return <JunggaeTradeCard />;
      }
    case COMPLETED_TAB: //완료된 거래
      if (activeType === 0) {
        return (
          <JunggaeTradeList
            handleSelect={this.handleToggleModal}
            contractInfoList={this.state.contractInfoList}
            activeTab={activeTab}
          />
        );
      } else {
        return <JunggaeTradeCard />;
      }
    case 2:
      return <JunggaeReview />;
    default:
      return '유효하지 않은 탭입니다.';
    }
  };

  /**
   * 해당하는 어카운트가 포함된 계약의 길이 반환
   */
  getContractsLength = function(accountInstance) {
    return new Promise((resolve, reject) => {
      accountInstance.getContractsLength((err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  };

  /**
   * 해당하는 어카운트, 인덱스의 계약정보(계약종류, 계약상태) 반환
   */
  getContractInfoAt = function(accountInstance, index) {
    return new Promise((resolve, reject) => {
      accountInstance.getContractInfoAt(index, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  };

  /**
   * 블록체인으로 부터 인덱스에 해당하는 컨트랙트 정보를 가져와서
   * state.contractInfoList에 추가한다
   */
  addContractInfoAt = async function(accountInstance, index) {
    // 온체인 데이터 가져오기
    const contractInfo = await this.getContractInfoAt(accountInstance, index);
    const contractType = contractInfo[0].toNumber();
    const contractState = contractInfo[1].toNumber();

    // 오프체인 데이터 가져오기
    const res = await ContractAPI.get(accountInstance.address, index);
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
  changeContractStateAt = async function(accountInstance, index) {
    const contractInfo = await this.getContractInfoAt(accountInstance, index);
    const contractState = contractInfo[STATE].toNumber();

    console.log('****changeContractStateAt****');
    console.log('----state : ', contractState);

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

  async componentDidMount() {
    /**
     * 데이터베이스와 블록체인 네트워크로 부터 정보를 받아온다
     * state에 정보를 채운다
     */

    // 현재 브라우저에 접속한 유저의 어카운트 계정 인스턴스 생성
    const ethAddress = MetamaskUtil.getDefaultAccount();
    const userData = await UserAPI.getAccountAddressByEthAddress(ethAddress);
    const accountAddress = userData.data.accountAddress;
    const accountInstance = window.web3.eth
      .contract(AccountAbi)
      .at(accountAddress);
    this.setState({ accountInstance });

    console.log('ethAddress : ' + ethAddress);
    console.log(userData.data);
    console.log('accountAddress : ' + accountAddress);
    console.log('accountInstance : ' + accountInstance);

    // 현재 브라우저에 접속한 유저가 포함된 계약의 개수
    const contractsLength = await this.getContractsLength(accountInstance);

    // 유저가 포함된 컨트랙트들을 state에 추가
    for (let i = 0; i < contractsLength; i++) {
      await this.addContractInfoAt(accountInstance, i);
    }

    // state 제대로 들어갔나 확인
    this.state.contractInfoList.forEach(contractInfo => {
      console.group(`${contractInfo.index}번 컨트랙트`);
      console.log('contract type : ' + contractInfo.type);
      console.log('contract state : ' + contractInfo.state);
      console.log('contract address : ' + contractInfo.building.address);
      console.groupEnd();
    });

    // 최신 블록 넘버 가져오기
    const latestBlock = await MetamaskUtil.getLatestBlockNumber();
    console.log('latestBlock : ' + latestBlock);

    // UpdateEvent 이벤트에 대한 filter
    const updateEvent = accountInstance.UpdateContract(null, {
      fromBlock: latestBlock,
      toBlock: 'latest'
    });

    // UpdateEvent 이벤트에 대한 watch
    updateEvent.watch((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const updateType = result.args.updateType.toNumber();
        const contractIndex = result.args.contractIndex.toNumber();
        console.log('----------conntractIndex : ' + contractIndex);
        if (updateType === 1) {
          // add contract 이므로 state에 새로 생성된 컨트랙트 추가
          console.log('add contract');
          this.addContractInfoAt(accountInstance, contractIndex);
        }
        if (updateType === 2) {
          // 컨트랙트상태가 변경된것이므로 해당하는 인덱스의 상태변경
          console.log('state change');
          this.changeContractStateAt(accountInstance, contractIndex);
        }
      }
    });
  }

  render() {
    const {
      activeTab,
      activeType,
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
          <div className="control">
            <ul className="tab">
              <MyPageTab
                item={0}
                activeItem={activeTab}
                handleSelect={handleTabSelect}
              >
                진행중거래 ({this.state.activeContractsNum}
                건)
              </MyPageTab>
              <MyPageTab
                item={1}
                activeItem={activeTab}
                handleSelect={handleTabSelect}
              >
                완료된거래 ({this.state.completedContractsNum}
                건)
              </MyPageTab>
              <MyPageTab
                item={2}
                activeItem={activeTab}
                handleSelect={handleTabSelect}
              >
                평점및리뷰 (30건)
              </MyPageTab>
            </ul>

            {activeTab !== 2 && (
              <ul className="type">
                <MyPageTab
                  item={0}
                  activeItem={activeType}
                  handleSelect={handleTypeSelect}
                >
                  <ListIcon />
                </MyPageTab>
                <MyPageTab
                  item={1}
                  activeItem={activeType}
                  handleSelect={handleTypeSelect}
                >
                  <CardIcon />
                </MyPageTab>
              </ul>
            )}
          </div>

          {this.getTabContent(activeTab, activeType)}
          {tradeModal && (
            <JunggaeTradeModal
              onClose={this.handleToggleModal}
              accountAddress={accountAddress}
              contractIndex={contractIndex}
              newContractState={newContractState}
              itemType={itemType}
            />
          )}
        </div>
      </div>
    );
  }
}

export default JunggaeMyPage;
