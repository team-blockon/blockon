import React from 'react';
import './AgentList.scss';

const AgentList = ({ agents }) => {
  return (
    <div className="AgentList">
      {agents.map((agent, index) => (
        <div className="agent" key={index}>
          <div className="circle">{agent.place_name.charAt(0)}</div>
          <div>
            <p>{agent.place_name}</p>
            <p>{agent.road_address_name}</p>
            { index === 1 || index === 3 ? <p> BLOCKON 인증 </p> : null }
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentList;
