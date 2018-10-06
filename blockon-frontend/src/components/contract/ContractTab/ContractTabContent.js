import React from 'react';
import ContractList from '../ContractList';
import ContractCard from '../ContractCard';
import ContractReview from '../ContractReview';

const ContractTabContent = ({
  activeTab,
  activeType,
  contractInfoList,
  accountInstance,
  handleSelect
}) => {
  switch (activeTab) {
  case 'ongoing': // 진행중 거래
    if (activeType === 0) {
      return (
        <ContractList
          handleSelect={handleSelect}
          contractInfoList={contractInfoList}
          accountInstance={accountInstance}
          activeTab={activeTab}
        />
      );
    } else {
      return <ContractCard />;
    }
  case 'completed': // 완료된 거래
    if (activeType === 0) {
      return (
        <ContractList
          handleSelect={handleSelect}
          contractInfoList={contractInfoList}
          activeTab={activeTab}
        />
      );
    } else {
      return <ContractCard />;
    }
  case 'review':
    return <ContractReview />;
  default:
    return '유효하지 않은 탭입니다.';
  }
};

export default ContractTabContent;
