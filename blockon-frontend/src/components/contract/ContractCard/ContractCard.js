import React from 'react';
import maemulImage from 'static/images/maemul.png';
import { Badge } from 'antd';
import './ContractCard.scss';

// 계약상태 상수
const state = Object.freeze({
  DOWN_PAYMENT: 1, // 계약금 입금
  MIDDLE_PAYMENT: 2, // 중도금 입금
  FINAL_PAYMENT: 3, // 잔금 입금
  REGISTRATION: 4, // 등기 등록 신청
  FIXED_DATE: 5, // 확정일자
  COMPLETED_CONTRACT: 100 // 완료
});

const getStepWord = step => {
  switch (step) {
  case state.DOWN_PAYMENT:
    return '계약금 처리 진행 중';
  case state.MIDDLE_PAYMENT:
    return '중도금 처리 진행 중';
  case state.FINAL_PAYMENT:
    return '잔금 처리 진행 중';
  case state.REGISTRATION:
    return '등기신청 진행 중';
  case state.FIXED_DATE:
    return '확정일자 신청 진행 중';
  case state.COMPLETED_CONTRACT:
    return '거래 종료';
  default:
  }
};

const getCards = (contractInfoList, activeTab) => {
  return contractInfoList.map((contractInfo, index) => {
    const { building, state: contractState } = contractInfo;

    if (
      (activeTab === 'ongoing' && contractState !== state.COMPLETED_CONTRACT) ||
      (activeTab === 'completed' && contractState === state.COMPLETED_CONTRACT)
    ) {
      return (
        <div className="card" key={index}>
          <p className="no">No. {building._id.slice(0, 6)}</p>
          <div className="content">
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
            <div className="detail">
              <p>18.07.05</p>
              <p>{building.name}</p>
              <p>{building.address}</p>
              <p>
                <Badge
                  status={
                    contractState !== state.COMPLETED_CONTRACT
                      ? 'processing'
                      : 'success'
                  }
                  text={getStepWord(contractState)}
                />
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  });
};

const ContractCard = ({ contractInfoList, activeTab }) => {
  return (
    <div className="card-wrapper">{getCards(contractInfoList, activeTab)}</div>
  );
};

export default ContractCard;
