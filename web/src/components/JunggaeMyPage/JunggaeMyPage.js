import React, { Component } from 'react';
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
 * contractInfo state 인덱스
 */
const TYPE = 0;
const STATE = 1;

class JunggaeMyPage extends Component {
  state = {
    tradeModal: false,
    // [contractType, contractState]의 리스트
    contractInfoList: []
  };

  handleToggleModal = () => {
    this.setState({
      tradeModal: !this.state.tradeModal
    });
  };

  getTabContent = (activeTab, activeType) => {
    switch (activeTab) {
    case 0:
      if (activeType === 0) {
        return <JunggaeTradeList handleSelect={this.handleToggleModal} />;
      } else {
        return <JunggaeTradeCard />;
      }
    case 1:
      return '완료된거래';
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
        if(!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * 해당하는 어카운트, 인덱스의 계약정보(계약종류, 계약상태)) 반환
   */
  getContractInfoAt = function(accountInstance, index) {
    return new Promise((resolve, reject) => {
      accountInstance.getContractInfoAt(index, (err, res) => {
        if(!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * 가장 최신 블록넘버를 반환
   */
  getLatestBlockNumber = function() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getBlockNumber((err, res) => {
        if(!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * 블록체인으로 부터 인덱스에 해당하는 컨트랙트 정보를 가져와서
   * state.contractInfoList에 추가한다
   */
  addContractInfoAt = async function(accountInstance, index) {
    const contractInfo = await this.getContractInfoAt(accountInstance, index);
    const contractType = contractInfo[0].c[0];
    const contractState = contractInfo[1].c[0];
    this.setState({
      contractInfoList: [
        ...this.state.contractInfoList,
        [contractType, contractState]
      ]
    })
  }

  /**
   * 블록체인으로 부터 인덱스에 해당하는 컨트랙트의 새로운 상태를 받아와서
   * state.contractInfoList를 업데이트 한다
   */
  changeContractStateAt = async function(accountInstance, index) {
    const contractInfo = await this.getContractInfoAt(accountInstance, index);
    const contractState = contractInfo[1].c[0];

    const currentStateList = this.state.contractInfoList.slice();
    currentStateList[index][STATE] = contractState;
    this.setState({
      contractInfoList: currentStateList
    })
  }

  async componentWillMount() {

    /**
     * 데이터베이스와 블록체인 네트워크로 부터 정보를 받아온다
     * state에 정보를 채운다
     */

    // 현재 브라우저에 접속한 유저의 어카운트 계정 인스턴스 생성
    const ethAddress = MetamaskUtil.getDefaultAccount();
    console.log("ethAddress : " + ethAddress);
    const userData = await UserAPI.getAccountAddressByEthAddress(ethAddress);
    console.log(userData.data);
    const accountAddress = userData.data.accountAddress;
    console.log("accountAddress : " + accountAddress);
    const accountInstance = window.web3.eth.contract(AccountAbi).at(accountAddress);
    console.log("accountInstance : " + accountInstance);

    // 현재 브라우저에 접속한 유저가 포함된 계약의 개수
    const contractsLength = await this.getContractsLength(accountInstance);
    console.log("contractsLength : " + contractsLength);

    // 유저가 포함된 컨트랙트들을 state에 추가
    for(let i = 0; i<contractsLength; i++) {
      this.addContractInfoAt(accountInstance, i);
    }

    // state 제대로 들어갔나 확인
    this.state.contractInfoList.forEach((contractInfo, index) => {
      console.log("-----------" + index);
      console.log("contract type : " + contractInfo[0]);
      console.log("contract state : " + contractInfo[1]);
    });

    // 최신 블록 넘버 가져오기
    const latestBlock = await this.getLatestBlockNumber();
    console.log("latestBlock : " + latestBlock);

    // UpdateEvent 이벤트에 대한 filter
    const updateEvent = accountInstance.UpdateContract(null, {
      fromBlock: 0,
      toBlock: "latest"
    });

    // UpdateEvent 이벤트에 대한 watch
    updateEvent.watch((error, result) => {
      if(error) {
        console.log(error);
      } else {
        const updateType = result.args.updateType.c[0];
        const contractIndex = result.args.contractIndex.c[0];
        console.log("----------conntractIndex : " + contractIndex);
        if(updateType === 1) {
          // add contract 이므로 state에 새로 생성된 컨트랙트 추가
          console.log("add contract");
          this.addContractInfoAt(accountInstance, contractIndex);
        }
        if(updateType === 2) {
          // 컨트랙트상태가 변경된것이므로 해당하는 인덱스의 상태변경
          console.log("state change");
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
    const { tradeModal } = this.state;

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
                진행중거래 (9건)
              </MyPageTab>
              <MyPageTab
                item={1}
                activeItem={activeTab}
                handleSelect={handleTabSelect}
              >
                완료된거래 (20건)
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
          {tradeModal && <JunggaeTradeModal onClose={this.handleToggleModal} />}
        </div>
      </div>
    );
  }
}

export default JunggaeMyPage;
