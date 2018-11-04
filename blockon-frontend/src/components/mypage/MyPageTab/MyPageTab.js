import React from 'react';
import { Tab, TabItem } from 'components/common/Tab';

const MyPageTab = ({ activeTab, handleTabSelect }) => {
  return (
    <Tab>
      <TabItem
        item="user_info"
        activeItem={activeTab}
        handleSelect={handleTabSelect}
      >
        회원정보
      </TabItem>
      <TabItem
        item="auth_agent"
        activeItem={activeTab}
        handleSelect={handleTabSelect}
      >
        중개인인증
      </TabItem>
    </Tab>
  );
};

export default MyPageTab;
