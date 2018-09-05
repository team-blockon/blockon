import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import AgentMarker from '../AgentMarker';
import AgentList from '../AgentList';
import * as MapAPI from 'lib/api/map';
import './SearchTemplate.scss';

export class SearchTemplate extends Component {
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
      <div className="SearchTemplate">
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
              {agents.map((agent, index) => {
                return (
                  <AgentMarker
                    lat={agent.y}
                    lng={agent.x}
                    agent={agent}
                    key={index}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
          <AgentList agents={agents} />
        </div>
      </div>
    );
  }
}

export default withRouter(SearchTemplate);
