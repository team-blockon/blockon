import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Chat from '../Chat';
import * as ContractUtils from 'lib/utils/contract';
import * as CaverUser from 'lib/caver/user';
import * as CaverContract from 'lib/caver/contract';
import houseImage from 'static/images/house-1.svg';
import agreeIcon from 'static/images/icon/agree.svg';
import disagreeIcon from 'static/images/icon/disagree.svg';
import './ContractDetailTemplate.scss';

const {
  ct,
  tradeStep,
  rentStep,
  getStepWord,
  getNextStep,
  getAgreementWord,
  getKoreanBuildingType
} = ContractUtils;

const StepBadge = ({ children }) => {
  return <span className="StepBadge">{children}</span>;
};

const BuildingTypeBadge = ({ children }) => {
  return <span className="BuildingTypeBadge">{children}</span>;
};

class ContractDetailTemplate extends Component {
  state = {
    contractInfo: null
  };
  getProgressbarItem = (stepIndex, contractStep) => {
    return (
      <li
        className={classNames({ active: stepIndex <= contractStep })}
        key={stepIndex}
      >
        {getStepWord(stepIndex)}
      </li>
    );
  };

  getProgressbarList = (contractType, contractStep) => {
    let allSteps;

    if (contractType === ct.TRADE) {
      allSteps = tradeStep;
    } else {
      allSteps = rentStep;
    }

    return allSteps.map(step => this.getProgressbarItem(step, contractStep));
  };

  getCard = () => {
    const { contractInfo } = this.state;
    const { index, type, state, confirmInfo, building } = contractInfo;
    const {
      isAgentConfirmed,
      isSellerConfirmed,
      isBuyerConfirmed
    } = confirmInfo;

    let contractData;
    if (type === ct.WOLSE) {
      contractData = <p>월세 1,000/45</p>;
    }
    if (type === ct.JEONSE) {
      contractData = <p>전세 5,000</p>;
    }
    if (type === ct.TRADE) {
      contractData = <p>매매 10억</p>;
    }

    const card = (
      <div className="card">
        <div className="progressbar-wrapper">
          <ul className="progressbar">
            {this.getProgressbarList(type, state)}
          </ul>
        </div>

        <p className="title">거래정보</p>
        <div className="content">
          <div className="image">
            {building.photo ? (
              <img
                src={`http://localhost:8000/uploads/contracts/${
                  building.photo
                }`}
                alt="house"
              />
            ) : (
              <img src={houseImage} alt="house" />
            )}
            <StepBadge>{getStepWord(state)}</StepBadge>
          </div>
          <div className="detail">
            <BuildingTypeBadge>
              {getKoreanBuildingType(building.type)}
            </BuildingTypeBadge>
            <p className="building">{building.name}</p>
            <p className="info">
              <span>거래시작</span>
              18.07.05
            </p>
            <p className="info">
              <span>위치</span>
              {building.address}
            </p>
            {contractData}
          </div>
        </div>

        <div className="agreement">
          <p className="title">
            다음 단계는
            <StepBadge>{getStepWord(getNextStep(type, state))}</StepBadge>
            단계입니다.
          </p>
          <div className="notice">
            중개인, 매수인, 매도인 모두의 동의가 확인되면 자동으로 단계가
            이동됩니다.
          </div>

          <div className="table">
            <div className="thead">
              <div className="tr">
                <div className="td">관계</div>
                <div className="td">이름</div>
                <div className="td">동의여부</div>
              </div>
            </div>
            <div className="tbody">
              <div className="tr">
                <div className="td">중개인</div>
                <div className="td">김수연</div>
                <div className="td">{getAgreementWord(isAgentConfirmed)}</div>
              </div>
              <div className="tr">
                <div className="td">매수인</div>
                <div className="td">최세은</div>
                <div className="td">{getAgreementWord(isSellerConfirmed)}</div>
              </div>
              <div className="tr">
                <div className="td">매도인</div>
                <div className="td">강민구</div>
                <div className="td">{getAgreementWord(isBuyerConfirmed)}</div>
              </div>
            </div>
          </div>
        </div>
        <p className="title">유의사항</p>
        <div className="notice">
          매매계약을 체결할 때는 당사자 간 약정이 있는 경우를 제외하고는 통상
          매매대금의 10%에 해당하는 금액(근저당 등이 설정되었거나 전세금이 있는
          경우에는 전체 매매대금에서 그 금액을 제외한 금액의 10%에 해당하는
          금액)을 계약금으로 지급하는 것이 관례입니다. 이 계약금은 매매계약을
          해제하는 경우에 상대방에 대한 손해배상의 기준이 됩니다.
        </div>

        <div className="action">
          <div className="radio">
            <span>
              <img src={agreeIcon} alt="agree" /> 동의
            </span>
            <span>
              <img src={disagreeIcon} alt="disagree" /> 미동의
            </span>
          </div>
          <button onClick={this.confirmButtonHandler}>확인</button>
        </div>
      </div>
    );

    return card;
  };

  confirmButtonHandler = () => {
    const { contractInfo } = this.state;
    const {
      index: contractIndex,
      state: currentState,
      type: contractType
    } = contractInfo;

    CaverContract.confirmToChangeContractStateAt({
      accountInstance: this.state.accountInstance,
      contractIndex,
      newContractState: getNextStep(contractType, currentState)
    });
  };

  watchConfirmChangeContractStateEvent = () => {
    const { accountInstance } = this.state;
    accountInstance.events.ConfirmChangeContractState(
      {
        fromBlock: 'latest'
      },
      (error, event) => {
        if (error) {
          console.log(error);
        } else {
          const { contractIndex, confirmedState } = event.returnValues;
          this.updateConfirmInfo(contractIndex, confirmedState);
        }
      }
    );
  };

  watchRevokeConfirmationEvent = () => {
    const { accountInstance } = this.state;
    accountInstance.events.RevokeConfirmation(
      {
        fromBlock: 'latest'
      },
      (error, event) => {
        if (error) {
          console.log(error);
        } else {
          const { contractIndex, revokedState } = event.returnValues;
          this.updateConfirmInfo(contractIndex, revokedState);
        }
      }
    );
  };

  updateConfirmInfo = async (contractIndex, constractState) => {
    const { accountInstance } = this.state;
    const confirmInfo = await CaverContract.hasConfirmed(
      accountInstance,
      contractIndex,
      constractState
    );
    const {
      isAgentConfirmed,
      isSellerConfirmed,
      isBuyerConfirmed
    } = confirmInfo;

    const newContractInfo = this.state.contractInfo;
    newContractInfo.confirmInfo = {
      isAgentConfirmed,
      isSellerConfirmed,
      isBuyerConfirmed
    };
    this.setState({
      contractInfo: newContractInfo
    });
  };

  async componentDidMount() {
    const { contractInfo } = this.props.location.state;
    await this.setState({ contractInfo });

    const { accountInstance } = await CaverUser.getAccountInfo();
    this.setState({ accountInstance }, () => {
      this.watchConfirmChangeContractStateEvent();
      this.watchRevokeConfirmationEvent();
    });
  }

  render() {
    if (!!this.state.contractInfo) {
      const { contractInfo } = this.state;
      const { people } = contractInfo;

      return (
        <div className="ContractDetailTemplate">
          <div className="container content">
            <div className="list-wrapper">{this.getCard()}</div>
            {/* <Chat party={people} /> */}
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default withRouter(ContractDetailTemplate);
