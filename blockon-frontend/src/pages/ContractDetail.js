import React from 'react';
import ContractDetailTemplate from 'components/contract/ContractDetailTemplate';

const ContractDetail = ({ contractInfo, activeTab }) => {
  return (
    <ContractDetailTemplate contractInfo={contractInfo} activeTab={activeTab} />
  );
};

export default ContractDetail;
