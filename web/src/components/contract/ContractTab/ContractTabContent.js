import React from 'react';
import JunggaeReview from 'components/junggae/JunggaeReview';
import JunggaeTradeCard from 'components/junggae/JunggaeTradeCard';
import JunggaeTradeList from 'components/junggae/JunggaeTradeList';

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
        <JunggaeTradeList
          handleSelect={handleSelect}
          contractInfoList={contractInfoList}
          accountInstance={accountInstance}
          activeTab={activeTab}
        />
      );
    } else {
      return <JunggaeTradeCard />;
    }
  case 'completed': // 완료된 거래
    if (activeType === 0) {
      return (
        <JunggaeTradeList
          handleSelect={handleSelect}
          contractInfoList={contractInfoList}
          activeTab={activeTab}
        />
      );
    } else {
      return <JunggaeTradeCard />;
    }
  case 'review':
    return <JunggaeReview />;
  default:
    return '유효하지 않은 탭입니다.';
  }
};

export default ContractTabContent;
