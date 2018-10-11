import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import maemulImage from 'static/images/maemul.png';
import { Button } from 'antd';
import Chat from '../Chat';
import './ContractList.scss';

// 계약종류 상수
const type = Object.freeze({
  TRADE: 1,
  RENT: 2
});

// 계약상태 상수
const state = Object.freeze({
  DOWN_PAYMENT: 1, // 계약금 입금
  MIDDLE_PAYMENT: 2, // 중도금 입금
  FINAL_PAYMENT: 3, // 잔금 입금
  REGISTRATION: 4, // 등기 등록 신청
  FIXED_DATE: 5, // 확정일자
  COMPLETED_CONTRACT: 100 // 완료
});

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

    const tradeStep = [
      state.DOWN_PAYMENT,
      state.MIDDLE_PAYMENT,
      state.FINAL_PAYMENT,
      state.REGISTRATION,
      state.COMPLETED_CONTRACT
    ];
    const rentStep = [
      state.DOWN_PAYMENT,
      state.FINAL_PAYMENT,
      state.FIXED_DATE,
      state.COMPLETED_CONTRACT
    ];

    const nextStep = (currentStep => {
      switch (contractType) {
      case type.TRADE:
        for (const [index, step] of tradeStep.entries()) {
          if (step === currentStep) {
            return tradeStep[index + 1];
          }
        }
        break;
      case type.RENT:
        for (const [index, step] of rentStep.entries()) {
          if (step === currentStep) {
            return rentStep[index + 1];
          }
        }
        break;
      default:
      }
    })(stepIndex);

    const getStepWord = step => {
      switch (step) {
      case state.DOWN_PAYMENT:
        return '계약금';
      case state.MIDDLE_PAYMENT:
        return '중도금';
      case state.FINAL_PAYMENT:
        return '잔금';
      case state.REGISTRATION:
        return '등기신청';
      case state.FIXED_DATE:
        return '확정일자';
      case state.COMPLETED_CONTRACT:
        return '완료';
      default:
      }
    };

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

    if (contractType === type.TRADE) {
      contractStep = [
        state.DOWN_PAYMENT,
        state.MIDDLE_PAYMENT,
        state.FINAL_PAYMENT,
        state.REGISTRATION,
        state.COMPLETED_CONTRACT
      ];
    } else {
      contractStep = [
        state.DOWN_PAYMENT,
        state.FINAL_PAYMENT,
        state.FIXED_DATE,
        state.COMPLETED_CONTRACT
      ];
    }

    const progressbarList = [];

    contractStep.forEach(step => {
      if (step < contractState) {
        progressbarList.push(
          this.getProgressbarItem(step, liClass.ACTIVE, cardIndex, contractType)
        );
      } else if (step === contractState) {
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
    const { index, type, state, people, building } = contractInfo;

    let contractData;
    if (type === type.TRADE) {
      contractData = <p>매매 / 10억</p>;
    }
    if (type === type.RENT) {
      contractData = <p>전,월세 / 1000/45 </p>;
    }

    const getKoreanBuildingType = eng => {
      const map = {
        jutaek: '주택',
        apartment: '아파트',
        sangga: '상가',
        officetel: '오피스텔'
      };

      return map[eng];
    };

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
            {this.getProgressbarList(type, state, index)}
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
        (activeTab === 'ongoing' &&
          contractState !== state.COMPLETED_CONTRACT) ||
        (activeTab === 'completed' &&
          contractState === state.COMPLETED_CONTRACT)
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
        <div className="sidebar">
          {showChat && <Chat party={chatParty} />}
          <button className="upload">
            <Link to="/contract/edit">계약 올리기</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default ContractList;
