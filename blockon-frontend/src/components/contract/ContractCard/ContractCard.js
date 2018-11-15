import React from 'react';
import { Link } from 'react-router-dom';
import StepBadge from '../StepBadge';
import { getImageUrl } from 'lib/utils/common';
import * as ContractUtils from 'lib/utils/contract';
import houseImage from 'static/images/house-1.svg';
import './ContractCard.scss';

const {
  getStepWord,
  getColorByStepWord,
  getKoreanBuildingType,
  getPriceField
} = ContractUtils;

const BuildingTypeBadge = ({ children }) => {
  return <span className="BuildingTypeBadge">{children}</span>;
};

const getCards = (contractInfoList, currentPage, activeTab) => {
  let filteredContractInfoList;

  // 현재 탭이 진행중 거래 탭
  if (activeTab === 'ongoing') {
    filteredContractInfoList = contractInfoList.filter(
      contractInfo => contractInfo.state !== ContractUtils.cs.COMPLETED_CONTRACT
    );
  }
  // 현재 탭이 완료된 거래 탭
  if (activeTab === 'completed') {
    filteredContractInfoList = contractInfoList.filter(
      contractInfo => contractInfo.state === ContractUtils.cs.COMPLETED_CONTRACT
    );
  }

  // 9개씩 출력되도록 페이지네이션
  const startIndex = (currentPage - 1) * 9;
  const endIndex =
    filteredContractInfoList.length > currentPage * 9 // 리스트 길이가 현재 페이지 * 9보다 작으면 끝까지 출력
      ? startIndex + 9
      : filteredContractInfoList.length;

  const subList = filteredContractInfoList.slice(startIndex, endIndex);
  return subList.map((contractInfo, index) => {
    const {
      type,
      building,
      state: contractState,
      index: contractIndex,
      price
    } = contractInfo;

    console.log(building);

    return (
      <div className="card" key={index}>
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
            <StepBadge className={getColorByStepWord(contractState)}>
              {getStepWord(contractState)}
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
            <p className="view">
              <Link
                to={{
                  pathname: '/contract/detail',
                  state: { contractIndex }
                }}
              >
                상세보기
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  });
};

const ContractCard = ({ contractInfoList, currentPage, activeTab }) => {
  return (
    <div className="card-wrapper">
      {getCards(contractInfoList, currentPage, activeTab)}
    </div>
  );
};

export default ContractCard;
