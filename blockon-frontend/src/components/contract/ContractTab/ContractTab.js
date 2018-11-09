import React from 'react';
import { Tab, TabItem } from 'components/common/Tab';

const ContractTab = ({ activeTab, handleTabSelect }) => {
  return (
    <Tab>
      <TabItem
        item="ongoing"
        activeItem={activeTab}
        handleSelect={handleTabSelect}
      >
        진행중 거래
      </TabItem>
      <TabItem
        item="completed"
        activeItem={activeTab}
        handleSelect={handleTabSelect}
      >
        완료된 거래
      </TabItem>
    </Tab>
  );
};

export default ContractTab;
