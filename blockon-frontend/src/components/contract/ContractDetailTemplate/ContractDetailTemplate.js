import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import StepBadge from '../StepBadge';
import Loading from 'components/common/Loading';
import Chat from '../Chat';

import { getImageUrl } from 'lib/utils/common';
import * as ContractAPI from 'lib/api/contract';
import * as UserAPI from 'lib/api/user';
import * as ContractUtils from 'lib/utils/contract';
import * as CaverUser from 'lib/caver/user';
import * as CaverContract from 'lib/caver/contract';

import houseImage from 'static/images/house-1.svg';
import agreeIcon from 'static/images/icon/agree.svg';
import disagreeIcon from 'static/images/icon/disagree.svg';

import { message } from 'antd';
import './ContractDetailTemplate.scss';

const {
  ct,
  tradeStep,
  rentStep,
  getStepWord,
  getColorByStepWord,
  getNextStep,
  getAgreementWord,
  getKoreanBuildingType,
  getPriceField
} = ContractUtils;

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
    const { type, state, confirmInfo, names, building, price } = contractInfo;
    const {
      isAgentConfirmed,
      isSellerConfirmed,
      isBuyerConfirmed
    } = confirmInfo;

    const nextStep = getNextStep(type, state);

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
                src={getImageUrl(`contracts/${building.photo}`)}
                alt="house"
              />
            ) : (
              <img src={houseImage} alt="house" />
            )}
            <StepBadge className={getColorByStepWord(state)}>
              {getStepWord(state)}
            </StepBadge>
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
            {getPriceField(type, price)}
          </div>
        </div>

        {state === ContractUtils.cs.COMPLETED_CONTRACT ? (
          <div className="agreement">
            <p className="title">
              이 계약은 <StepBadge>완료</StepBadge>되었습니다.
            </p>

            <div className="table">
              <div className="thead">
                <div className="tr">
                  <div className="td">관계</div>
                  <div className="td">이름</div>
                </div>
              </div>
              <div className="tbody">
                <div className="tr">
                  <div className="td">중개인</div>
                  <div className="td">{names.agentName}</div>
                </div>
                <div className="tr">
                  <div className="td">매수인</div>
                  <div className="td">{names.buyerName}</div>
                </div>
                <div className="tr">
                  <div className="td">매도인</div>
                  <div className="td">{names.sellerName}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="agreement">
              <p className="title">
                다음 단계는
                <StepBadge className={getColorByStepWord(nextStep)}>
                  {getStepWord(nextStep)}
                </StepBadge>
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
                    <div className="td">{names.agentName}</div>
                    <div className="td">
                      {getAgreementWord(isAgentConfirmed)}
                    </div>
                  </div>
                  <div className="tr">
                    <div className="td">매수인</div>
                    <div className="td">{names.buyerName}</div>
                    <div className="td">
                      {getAgreementWord(isSellerConfirmed)}
                    </div>
                  </div>
                  <div className="tr">
                    <div className="td">매도인</div>
                    <div className="td">{names.sellerName}</div>
                    <div className="td">
                      {getAgreementWord(isBuyerConfirmed)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="title">유의사항</p>
            <div className="notice">
              매매계약을 체결할 때는 당사자 간 약정이 있는 경우를 제외하고는
              통상 매매대금의 10%에 해당하는 금액(근저당 등이 설정되었거나
              전세금이 있는 경우에는 전체 매매대금에서 그 금액을 제외한 금액의
              10%에 해당하는 금액)을 계약금으로 지급하는 것이 관례입니다. 이
              계약금은 매매계약을 해제하는 경우에 상대방에 대한 손해배상의
              기준이 됩니다.
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
          </Fragment>
        )}
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

    message.success('동의 요청이 완료되었습니다.');
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

    const newContractInfo = { ...this.state.contractInfo };
    newContractInfo.confirmInfo = confirmInfo;
    await this.setState({
      contractInfo: newContractInfo
    });

    if (
      confirmInfo.isAgentConfirmed === true &&
      confirmInfo.isSellerConfirmed === true &&
      confirmInfo.isBuyerConfirmed === true
    ) {
      this.initializeContractInfo();
    }
  };

  async initializeContractInfo() {
    const { accountInstance } = this.state;
    // 온체인 데이터 가져오기
    const { contractIndex } = this.props.location.state;
    const contractInfo = await CaverContract.getContractInfoAt(
      accountInstance,
      contractIndex
    );
    const contractType = Number(contractInfo.contractType);
    const contractStep = Number(contractInfo.contractState);

    const confirmInfo = await CaverContract.hasConfirmed(
      accountInstance,
      contractIndex,
      contractStep === ContractUtils.cs.COMPLETED_CONTRACT
        ? contractStep
        : getNextStep(contractType, contractStep)
    );

    // 오프체인 데이터 가져오기
    const contractRes = await ContractAPI.get(
      accountInstance._address,
      contractIndex
    );

    if (!contractRes || !contractRes.data || !contractRes.data.building) {
      return;
    }
    const {
      _id,
      people,
      building,
      contract: { deposit, wolse, maemaePrice }
    } = contractRes.data;

    const namesRes = await UserAPI.getNamesByAccountAddress(people);

    this.setState({
      contractInfo: {
        id: _id, // 계약 ID가 다르면 채팅 참여자가 같아도 구분
        index: contractIndex,
        type: contractType,
        state: contractStep,
        confirmInfo,
        people,
        names: namesRes.data,
        building,
        price: { deposit, wolse, maemaePrice }
      }
    });
  }

  async componentDidMount() {
    const { accountInstance } = await CaverUser.getAccountInfo();

    this.setState({ accountInstance }, () => {
      this.initializeContractInfo();
      this.watchConfirmChangeContractStateEvent();
      this.watchRevokeConfirmationEvent();
    });
  }

  render() {
    if (!!this.state.contractInfo) {
      const { contractInfo } = this.state;
      const { people } = contractInfo;
      console.log(people);

      return (
        <div className="ContractDetailTemplate">
          <div className="container content">
            <div className="list-wrapper">{this.getCard()}</div>
            <Chat contractId={contractInfo.id} party={people} />
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default withRouter(ContractDetailTemplate);
