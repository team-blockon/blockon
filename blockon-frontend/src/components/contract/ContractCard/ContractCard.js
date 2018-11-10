import React from 'react';
import { Link } from 'react-router-dom';
import * as ContractUtils from 'lib/utils/contract';
import houseImage from 'static/images/house-1.svg';
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
    const {
      building,
      state: contractState,
      index: contractIndex
    } = contractInfo;

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
                  alt="house"
                />
              ) : (
                <img src={houseImage} alt="house" />
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
              <p className="view">
                <Link
                  to={{
                    pathname: '/contract/detail',
                    state: { contractInfo, activeTab }
                  }}
                >
                  상세보기
                </Link>
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
