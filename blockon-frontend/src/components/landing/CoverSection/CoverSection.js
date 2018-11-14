import React, { Component } from 'react';
import Autocomplete from './Autocomplete';
import * as MapAPI from 'lib/api/map';
import './CoverSection.scss';

const searchResult = value => {
  return new Promise((resolve, reject) => {
    MapAPI.getSubways(value).then(res => {
      const subways = res.data.documents;
      if (subways.length > 0) {
        resolve(
          subways.map(document => ({
            category_group_name: document.category_group_name,
            place_name: document.place_name
          }))
        );
      } else {
        resolve([]);
      }
    });
  });
};

const getSuggestions = value => {
  if (value.length === 0) return Promise.resolve([]);
  return searchResult(value);
};

class CoverSection extends Component {
  state = {
    suggestions: [], // 자동완성 아이템 리스트
    agent: ''
  };

  /**
   * value 값에 따라 자동완성 아이템 리스트 변경
   */
  onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then(res => {
      this.setState({
        ...this.state,
        suggestions: res
      });
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      ...this.state,
      suggestions: []
    });
  };

  render() {
    const { suggestions } = this.state;

    return (
      <section className="CoverContainer">
        <div className="subtitleDiv">
          안전한 거래를 함께할 중개소를 찾아보세요.
        </div>
        <div className="searchDiv">
          <Autocomplete
            name="agent"
            placeholder="관심지역 또는 공인중개소를 검색해보세요."
            onChange={suggestionValue => {
              console.log(suggestionValue);
              this.setState({
                ...this.state,
                agent: suggestionValue
              });
            }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          />
        </div>
      </section>
    );
  }
}

export default CoverSection;
