import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import GoogleMapReact from 'google-map-react';
import * as MapAPI from 'lib/api/map';
import marker from 'static/images/icon/marker.png';
import './SearchWrapper.scss';
import { Popover, Button } from 'antd';

const content = agent => {
  return (
    <div className="infowindow">
      <p>{agent.road_address_name}</p>
      <Link to={{ pathname: '/contract', state: { activeTab: 2 } }}>
        <Button type="primary">리뷰 보기</Button>
      </Link>
    </div>
  );
};

const AgentMarker = ({ agent }) => (
  <div className="AgentMarker">
    <Popover content={content(agent)} title={agent.place_name}>
      <img src={marker} alt="marker" style={{ width: '40px' }} />
    </Popover>
  </div>
);

export class SearchWrapper extends Component {
  state = {
    agents: []
  };

  static defaultProps = {
    center: {
      lat: 37.5037267,
      lng: 127.0404673
    },
    zoom: 18
  };

  getAgents = () => {
    const agents = this.state.agents.map((agent, index) => (
      <div className="agent" key={index}>
        <div
          className={classNames('circle')}
          style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
          {agent.place_name.charAt(0)}
        </div>
        <div>
          <p>{agent.place_name}</p>
          <p>{agent.road_address_name}</p>
        </div>
      </div>
    ));
    return agents;
  };

  /**
   * 지도 움직일 때마다 공인중개사 목록 갱신
   */
  handleChange = ({ center }) => {
    const { lat, lng } = center;

    MapAPI.getAgents(lat, lng, 1000).then(res => {
      const agents = res.data.documents;
      this.setState({ agents });
    });
  };

  render() {
    const { agents } = this.state;

    return (
      <div className="SearchWrapper">
        <div className="map-container">
          <div style={{ flex: 1 }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyCpPfq3qe6Jr4YJ9zABDWAWL3RYd_IbiTc'
              }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onChange={this.handleChange}
            >
              {agents.map(agent => {
                return (
                  <AgentMarker lat={agent.y} lng={agent.x} agent={agent} />
                );
              })}
            </GoogleMapReact>
          </div>
          <div className="agent-list">{this.getAgents()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchWrapper);
