import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import maemulImage from 'static/images/maemul.png';
import { Button } from 'antd';
import Chat from '../Chat';
import './ContractList.scss';

// 계약종류 상수
const type = Object.freeze({
  WOLSE: 1,
  JEONSE: 2,
  TRADE: 3
});

// 계약상태 상수
const state = Object.freeze({
  START_TRADE: 0, // 거래시작
  DOWN_PAYMENT: 1, // 계약금 입금
  MIDDLE_PAYMENT: 2, // 중도금 입금
  FINAL_PAYMENT: 3, // 잔금 입금
  REGISTRATION: 4, // 등기 등록 신청
  FIXED_DATE: 5, // 확정일자
  END_TRADE: 100 // 거래종료
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
      state.START_TRADE,
      state.DOWN_PAYMENT,
      state.MIDDLE_PAYMENT,
      state.FINAL_PAYMENT,
      state.REGISTRATION,
      state.END_TRADE
    ];
    const rentStep = [
      state.START_TRADE,
      state.DOWN_PAYMENT,
      state.FINAL_PAYMENT,
      state.FIXED_DATE,
      state.END_TRADE
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
      case state.START_TRADE:
        return '거래시작';
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
      case state.END_TRADE:
        return '거래종료';
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
        state.START_TRADE,
        state.DOWN_PAYMENT,
        state.MIDDLE_PAYMENT,
        state.FINAL_PAYMENT,
        state.REGISTRATION,
        state.END_TRADE
      ];
    } else {
      contractStep = [
        state.START_TRADE,
        state.DOWN_PAYMENT,
        state.FINAL_PAYMENT,
        state.FIXED_DATE,
        state.END_TRADE
      ];
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
    if (contractType === type.WOLSE) {
      contractData = <p>월세 1,000/45</p>;
    }
    if (contractType === type.JEONSE) {
      contractData = <p>전세 5,000</p>;
    }
    if (contractType === type.TRADE) {
      contractData = <p>매매 10억</p>;
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
        (activeTab === 'ongoing' && contractState !== state.END_TRADE) ||
        (activeTab === 'completed' && contractState === state.END_TRADE)
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
