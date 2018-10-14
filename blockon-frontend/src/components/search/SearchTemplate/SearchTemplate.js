import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import AgentMarker from '../AgentMarker';
import AgentList from '../AgentList';
import * as MapAPI from 'lib/api/map';
import { Input } from 'antd';
import './SearchTemplate.scss';

const Search = Input.Search;

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

  handleSearch = value => {
    const { history } = this.props;
    history.push(`/search?q=${value}`);
  };

  /**
   * 지도 움직일 때마다 공인중개사 목록 갱신
   */
  handleMapChange = ({ center }) => {
    const { lat, lng } = center;

    MapAPI.getAgents(lat, lng, 1000).then(res => {
      const agents = res.data.documents;
      this.setState({ agents });
    });
  };

  searchLocation = () => {
    const { location } = this.props;
    const q = new URLSearchParams(location.search).get('q');

    MapAPI.searchLocation(q).then(res => {
      const result = res.data.documents[0];
      console.log(result);
      this.setState({
        center: {
          lat: Number(result.y),
          lng: Number(result.x)
        }
      });
    });
  };

  componentDidMount() {
    this.searchLocation();
  }

  static getDerivedStateFromProps(props, state) {
    const { location } = props;
    const q = new URLSearchParams(location.search).get('q');

    if (state.q !== q) {
      return {
        ...state,
        q
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q) {
      this.searchLocation();
    }
  }

  render() {
    const { agents } = this.state;

    return (
      <div className="SearchTemplate">
        <div className="search-input">
          <Search
            placeholder="원하시는 지역을 검색해보세요."
            style={{ width: 300 }}
            enterButton="검색"
            size="large"
            onSearch={this.handleSearch}
          />
        </div>
        <div className="map-container">
          <div style={{ flex: 1 }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyCpPfq3qe6Jr4YJ9zABDWAWL3RYd_IbiTc'
              }}
              defaultCenter={this.props.center}
              center={this.state.center}
              defaultZoom={this.props.zoom}
              onChange={this.handleMapChange}
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
