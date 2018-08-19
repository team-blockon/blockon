import React, { Component } from 'react';
import classNames from 'classnames';
import * as SearchAPI from 'lib/api/search';
import markerYellow from 'static/images/icon/marker-yellow.png';
import markerBlue from 'static/images/icon/marker-blue.png';
import markerRed from 'static/images/icon/marker-red.png';
import './SearchWrapper.scss';

export class SearchWrapper extends Component {
  state = {
    agents: []
  };

  componentDidMount() {
    SearchAPI.search().then(res => {
      this.setState({
        agents: res.data
      });
    });

    window.initMap = this.initMap;

    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCpPfq3qe6Jr4YJ9zABDWAWL3RYd_IbiTc&callback=initMap';
    script.async = true;
    document.body.appendChild(script);
  }

  initMap = () => {
    const { agents } = this.state;

    const map = new window.google.maps.Map(this.refs.map, {
      center: { lat: 37.5037267, lng: 127.0404673 },
      zoom: 18
    });

    map.addListener('click', e => {
      console.log(e.latLng.lat() + ', ' + e.latLng.lng());
    });

    const getIcon = rating => {
      let url;
      let size;

      if (rating >= 4) {
        url = markerYellow;
        size = 70;
      } else if (rating >= 3) {
        url = markerBlue;
        size = 60;
      } else {
        url = markerRed;
        size = 50;
      }

      return {
        url,
        scaledSize: new window.google.maps.Size(size, size)
      };
    };

    agents.map(agent => {
      const icon = getIcon(agent.rating);

      const label = {
        text: agent.rating.toString(),
        color: 'white',
        fontSize: '1.4rem'
      };

      new window.google.maps.Marker({
        map: map,
        position: { lat: agent.lat, lng: agent.lng },
        label,
        icon
      });
    });
  };

  getAgents = () => {
    const agents = this.state.agents.map((agent, index) => (
      <div className="agent" key={index}>
        <div
          className={classNames('circle', {
            blue: 3 <= agent.rating && agent.rating < 4,
            red: 2 <= agent.rating && agent.rating < 3
          })}
        />
        <div>
          <p>{agent.rating} / 5.0</p>
          <p>{agent.name}</p>
          <p>{agent.address}</p>
        </div>
      </div>
    ));

    return agents;
  };

  render() {
    return (
      <div className="SearchWrapper">
        <div className="map-container">
          <div id="map" ref="map" />
          <div className="agent-list">{this.getAgents()}</div>
        </div>
      </div>
    );
  }
}

export default SearchWrapper;
