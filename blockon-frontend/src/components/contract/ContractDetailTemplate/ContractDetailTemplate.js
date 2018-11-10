import React, { Component } from 'react';
import classNames from 'classnames';
import Chat from '../Chat';
import * as ContractUtils from 'lib/utils/contract';
import houseImage from 'static/images/house-1.svg';
import agreeIcon from 'static/images/icon/agree.svg';
import disagreeIcon from 'static/images/icon/disagree.svg';
import './ContractDetailTemplate.scss';

const {
  ct,
  cs,
  tradeStep,
  rentStep,
  getStepWord,
  getKoreanBuildingType
} = ContractUtils;

const StepBadge = ({ children }) => {
  return <span className="StepBadge">{children}</span>;
};

const BuildingTypeBadge = ({ children }) => {
  return <span className="BuildingTypeBadge">{children}</span>;
};

class ContractDetailTemplate extends Component {
  getProgressbarItem = (stepIndex, contractStep, cardIndex, contractType) => {
    const { handleSelect, accountInstance, activeTab } = this.props;

    const nextStep = (currentStep => {
      switch (contractType) {
      case ct.TRADE:
        for (const [index, step] of tradeStep.entries()) {
          if (step === currentStep) {
            return tradeStep[index + 1];
          }
        }
        break;
      case ct.RENT:
        for (const [index, step] of rentStep.entries()) {
          if (step === currentStep) {
            return rentStep[index + 1];
          }
        }
        break;
      default:
      }
    })(stepIndex);

    return (
      <li
        className={classNames({ active: stepIndex <= contractStep })}
        key={stepIndex}
      >
        {getStepWord(stepIndex)}
      </li>
    );
  };

  getProgressbarList = (contractType, contractStep, cardIndex) => {
    let allSteps;

    if (contractType === ct.TRADE) {
      allSteps = tradeStep;
    } else {
      allSteps = rentStep;
    }

    return allSteps.map(step =>
      this.getProgressbarItem(step, contractStep, cardIndex, contractType)
    );
  };

  getCard = contractInfo => {
    const { index, type: contractType, state, building } = contractInfo;

    let contractData;
    if (contractType === ct.WOLSE) {
      contractData = <p>월세 1,000/45</p>;
    }
    if (contractType === ct.JEONSE) {
      contractData = <p>전세 5,000</p>;
    }
    if (contractType === ct.TRADE) {
      contractData = <p>매매 10억</p>;
    }

    const card = (
      <div className="card">
        <div className="progressbar-wrapper">
          <ul className="progressbar">
            {this.getProgressbarList(contractType, state, index)}
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
            <StepBadge>{getStepWord(state)}</StepBadge>
            단계입니다.
          </p>
          <div className="notice">
            중개인, 매수인, 매도인 모두의 동의가 확인되면 자동으로 단계가
            이동됩니다.
          </div>

          <div class="table">
            <div class="thead">
              <div class="tr">
                <div class="td">관계</div>
                <div class="td">이름</div>
                <div class="td">동의여부</div>
              </div>
            </div>
            <div class="tbody">
              <div class="tr">
                <div class="td">중개인</div>
                <div class="td">김수연</div>
                <div class="td">동의</div>
              </div>
              <div class="tr">
                <div class="td">매수인</div>
                <div class="td">최세은</div>
                <div class="td">미동의</div>
              </div>
              <div class="tr">
                <div class="td">매도인</div>
                <div class="td">강민구</div>
                <div class="td">동의</div>
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
          <button>확인</button>
        </div>
      </div>
    );

    return card;
  };

  getLists = () => {
    const { contractInfo, activeTab } = this.props;

    if (
      (activeTab === 'ongoing' && contractInfo.state !== cs.END_TRADE) ||
      (activeTab === 'completed' && contractInfo.state === cs.END_TRADE)
    ) {
      return this.getCard(contractInfo);
    }

    return null;
  };

  render() {
    const {
      contractInfo: { people }
    } = this.props;

    return (
      <div className="ContractDetailTemplate">
        <div className="container content">
          <div className="list-wrapper">{this.getLists()}</div>
          <Chat party={people} />
        </div>
      </div>
    );
  }
}

export default ContractDetailTemplate;
