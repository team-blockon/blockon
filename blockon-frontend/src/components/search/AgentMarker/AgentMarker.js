import React from 'react';
import { Link } from 'react-router-dom';
import marker from 'static/images/icon/marker.png';
import s_marker from 'static/images/icon/special_marker.png'
import { Popover, Button } from 'antd';
import './AgentMarker.scss';

const getContent = agent => {
  return (
    <div className="infowindow">
      <p>{agent.road_address_name}</p>
      <Link to={{ pathname: '/contract', state: { activeTab: 'review' } }}>
        <Button type="primary">리뷰 보기</Button>
      </Link>
    </div>
  );
};

const AgentMarker = ({ agent, idx }) => {
  return (
    <div className="AgentMarker">
      <Popover content={getContent(agent)} title={agent.place_name}>
        {(idx === 1 || idx === 3) ? <img src={s_marker} alt="special marker"/>:<img src={marker} alt="marker"/>}
      </Popover>
    </div>
  );
};

export default AgentMarker;
