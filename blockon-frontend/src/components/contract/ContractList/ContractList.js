import React, { Component } from 'react';
import Chat from '../Chat';
import * as ContractUtils from 'lib/utils/contract';
import maemulImage from 'static/images/maemul.png';
import { Button } from 'antd';
import './ContractList.scss';

const {
  ct,
  cs,
  tradeStep,
  rentStep,
  getStepWord,
  getKoreanBuildingType
} = ContractUtils;

// .progressbar > li에 붙는 클래스 이름 상수
const liClass = Object.freeze({
  ACTIVE: 1,
  FIRST_NOT_ACTIVE: 2,
  INACTIVE: 3
});

const getListClassName = listClassName => {
  switch (listClassName) {
  case liClass.ACTIVE:
    return 'active';
  case liClass.FIRST_NOT_ACTIVE:
    return 'first-not-active';
  default:
    return '';
  }
};

class ContractList extends Component {
  state = {
    showChat: false,
    chatParty: null
  };

  getProgressbarItem = (stepIndex, listClassName, cardIndex, contractType) => {
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
        className={getListClassName(listClassName)}
        onClick={
          listClassName === liClass.FIRST_NOT_ACTIVE && // 진행하지 않은 단계 중 첫 번째이면서
          activeTab !== 'completed' // 완료 단계가 아닐 때
            ? e => {
              handleSelect(
                accountInstance.address,
                cardIndex,
                nextStep,
                getStepWord(nextStep)
              );
            }
            : undefined
        }
        key={stepIndex}
      >
        {getStepWord(stepIndex)}
      </li>
    );
  };

  getProgressbarList = (contractType, contractState, cardIndex) => {
    let contractStep;

    if (contractType === ct.TRADE) {
      contractStep = tradeStep;
    } else {
      contractStep = rentStep;
    }

    const progressbarList = [];

    contractStep.forEach(step => {
      if (step < contractState) {
        progressbarList.push(
          this.getProgressbarItem(step, liClass.ACTIVE, cardIndex, contractType)
        );
      } else if (contractState) {
        progressbarList.push(
          this.getProgressbarItem(
            step,
            liClass.FIRST_NOT_ACTIVE,
            cardIndex,
            contractType
          )
        );
      } else {
        progressbarList.push(
          this.getProgressbarItem(
            step,
            liClass.INACTIVE,
            cardIndex,
            contractType
          )
        );
      }
    });

    return progressbarList;
  };

  getCard = contractInfo => {
    const { index, type: contractType, state, people, building } = contractInfo;

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
      <div className="card" key={index}>
        <p className="no">No. {building._id.slice(0, 6)}</p>
        <div className="content">
          <div className="detail">
            <div className="image">
              {building.photo ? (
                <img
                  src={`http://localhost:8000/uploads/contracts/${
                    building.photo
                  }`}
                  alt="maemul"
                />
              ) : (
                <img src={maemulImage} alt="maemul" />
              )}
            </div>
            <div>
              <p>{building.name}</p>
              <p>{getKoreanBuildingType(building.type)}</p>
              <p>{building.address}</p>
              {contractData}
            </div>
          </div>
        </div>
        <div className="progressbar-wrapper">
          <ul className="progressbar">
            {this.getProgressbarList(contractType, state, index)}
          </ul>
        </div>
        <Button onClick={() => this.toggleChat(people)}>채팅</Button>
      </div>
    );

    return card;
  };

  getLists = () => {
    const { contractInfoList, activeTab } = this.props;
    const cards = [];

    contractInfoList.forEach(contractInfo => {
      const { state: contractState } = contractInfo;

      if (
        (activeTab === 'ongoing' && contractState !== cs.END_TRADE) ||
        (activeTab === 'completed' && contractState === cs.END_TRADE)
      ) {
        cards.push(this.getCard(contractInfo));
      }
    });
    return cards;
  };

  toggleChat = people => {
    const { showChat } = this.state;
    this.setState({
      showChat: !showChat,
      chatParty: people
    });
  };

  render() {
    const { showChat, chatParty } = this.state;

    return (
      <div className="ContractList">
        <div className="list-wrapper">{this.getLists()}</div>
        <div>{showChat && <Chat party={chatParty} />}</div>
      </div>
    );
  }
}

export default ContractList;
