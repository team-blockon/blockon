import React from 'react';
import { Link } from 'react-router-dom';
import maemulImage from 'static/images/maemul.png';
import './JunggaeTradeList.scss';

/**
 * contractType 인덱스
 */
const TRADE = 1;
const RENT = 2;

/**
 * contract state
 * 1 - 계약금 입금
 * 2 - 중도금 입금
 * 3 - 잔금 입금
 * 4 - 등기 등록 신청
 * 5 - 확정일자
 * 100 - 완료
 */
const DOWN_PAYMENT = 1;
const MIDDLE_PAYMENT = 2;
const FINAL_PAYMENT = 3;
const REGISTRATION = 4;
const FIXED_DATE = 5;
const COMPLETED_CONTRACT = 100;

/**
 * activeTab 인덱스
 * 0 - 진행중거래 탭
 * 1 - 완료된거래 탭
 */
const ONGOING_TAB = 0;
const COMPLETED_TAB = 1;

/**
 * list class name
 * 1 - active
 * 2 - first-not-active
 * 3 - INACTIVE
 */
const ACTIVE = 1;
const FIRST_NOT_ACTIVE = 2;
const INACTIVE = 3;

const JunggaeTradeList = ({
  handleSelect,
  contractInfoList,
  accountInstance,
  activeTab
}) => {
  // console.log('Entry : JunggaeTradeList');
  const getListClassName = listClassName => {
    switch (listClassName) {
    case ACTIVE:
      return 'active';
    case FIRST_NOT_ACTIVE:
      return 'first-not-active';
    default:
      return '';
    }
  };

  const getListItem = (stepIndex, listClassName, cardIndex, contractType) => {
    const tradeStep = [
      DOWN_PAYMENT,
      MIDDLE_PAYMENT,
      FINAL_PAYMENT,
      REGISTRATION,
      COMPLETED_CONTRACT
    ];
    const rentStep = [
      DOWN_PAYMENT,
      FINAL_PAYMENT,
      FIXED_DATE,
      COMPLETED_CONTRACT
    ];

    const nextStep = (currentStep => {
      switch (contractType) {
      case TRADE:
        for (const [index, step] of tradeStep.entries()) {
          if (step === currentStep) {
            return tradeStep[index + 1];
          }
        }
        break;
      case RENT:
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
      case DOWN_PAYMENT:
        return '계약금';
      case MIDDLE_PAYMENT:
        return '중도금';
      case FINAL_PAYMENT:
        return '잔금';
      case REGISTRATION:
        return '등기신청';
      case FIXED_DATE:
        return '확정일자';
      case COMPLETED_CONTRACT:
        return '완료';
      default:
      }
    };

    return (
      <li
        className={getListClassName(listClassName)}
        onClick={
          listClassName === FIRST_NOT_ACTIVE
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
      >
        {getStepWord(stepIndex)}
      </li>
    );
  };

  const getProgressbarList = (contractType, contractState, cardIndex) => {
    let contractStep;

    if (contractType === TRADE) {
      contractStep = [
        DOWN_PAYMENT,
        MIDDLE_PAYMENT,
        FINAL_PAYMENT,
        REGISTRATION,
        COMPLETED_CONTRACT
      ];
    } else {
      contractStep = [
        DOWN_PAYMENT,
        FINAL_PAYMENT,
        FIXED_DATE,
        COMPLETED_CONTRACT
      ];
    }

    const progressbarList = [];

    contractStep.forEach(step => {
      if (step < contractState) {
        progressbarList.push(
          getListItem(step, ACTIVE, cardIndex, contractType)
        );
      } else if (step === contractState) {
        progressbarList.push(
          getListItem(step, FIRST_NOT_ACTIVE, cardIndex, contractType)
        );
      } else {
        progressbarList.push(
          getListItem(step, INACTIVE, cardIndex, contractType)
        );
      }
    });

    return progressbarList;
  };

  const getCard = contractInfo => {
    const { index, type, state, building } = contractInfo;

    let contractData;
    if (type === TRADE) {
      contractData = <p>매매 / 10억</p>;
    }
    if (type === RENT) {
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
        <p className="no">No. mxabcff</p>
        <div className="content">
          <div className="detail">
            <div className="image">
              <img src={maemulImage} alt="maemul" />
            </div>
            <div>
              <p>준영타워팰리스</p>
              <p>{getKoreanBuildingType(building.type)}</p>
              <p>{building.address}</p>
              {contractData}
            </div>
          </div>
        </div>
        <div className="progressbar-wrapper">
          <ul className="progressbar">
            {getProgressbarList(type, state, index)}
          </ul>
        </div>
      </div>
    );

    return card;
  };

  const getLists = () => {
    const cards = [];

    contractInfoList.forEach(contractInfo => {
      const contractState = contractInfo.state;

      if (activeTab === ONGOING_TAB && contractState !== COMPLETED_CONTRACT) {
        cards.push(getCard(contractInfo));
      } else if (
        activeTab === COMPLETED_TAB &&
        contractState === COMPLETED_CONTRACT
      ) {
        cards.push(getCard(contractInfo));
      }
    });
    return cards;
  };

  return (
    <div className="JunggaeTradeList">
      <div className="list-wrapper">{getLists()}</div>
      <div className="sidebar">
        <button>
          <Link to="/contract/edit">계약 올리기</Link>
        </button>
      </div>
    </div>
  );
};

export default JunggaeTradeList;
