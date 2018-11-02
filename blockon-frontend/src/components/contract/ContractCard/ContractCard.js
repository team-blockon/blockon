import React from 'react';
import * as ContractUtils from 'lib/utils/contract';
import maemulImage from 'static/images/maemul.png';
import './ContractCard.scss';

const { cs, getStepWord, getKoreanBuildingType } = ContractUtils;

const StepBadge = ({ children }) => {
  return <span className="StepBadge">{children}</span>;
};

const BuildingTypeBadge = ({ children }) => {
  return <span className="BuildingTypeBadge">{children}</span>;
};

const getCards = (contractInfoList, activeTab) => {
  return contractInfoList.map((contractInfo, index) => {
    const { building, state: contractState } = contractInfo;

    if (
      (activeTab === 'ongoing' && contractState !== cs.COMPLETED_CONTRACT) ||
      (activeTab === 'completed' && contractState === cs.COMPLETED_CONTRACT)
    ) {
      return (
        <div className="card" key={index}>
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
              <StepBadge>{getStepWord(contractState)}</StepBadge>
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
              <p className="view">상세보기</p>
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
