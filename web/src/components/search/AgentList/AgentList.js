import React from 'react';
import './AgentList.scss';

const AgentList = ({ agents }) => {
  return (
    <div className="AgentList">
      {agents.map((agent, index) => (
        <div className="agent" key={index}>
          <div
            className="circle"
            style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          >
            {agent.place_name.charAt(0)}
          </div>
          <div>
            <p>{agent.place_name}</p>
            <p>{agent.road_address_name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentList;
