import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import './Autocomplete.scss';

const getSuggestionValue = suggestion => suggestion.place_name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.category_group_name} / {suggestion.place_name}
  </div>
);

class Autocomplete extends Component {
  state = {
    value: '',
    suggestions: []
  };

  goToSearchPage = value => {
    const { history } = this.props;
    history.push(`/search?q=${value}`);
  };

  onChange = (event, { newValue, method }) => {
    const { onChange } = this.props;

    this.setState({
      value: newValue
    });
    onChange(newValue);

    if (method === 'click') {
      this.goToSearchPage(newValue);
    }
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.goToSearchPage(e.target.value);
    }
  };

  render() {
    const { value } = this.state;

    const inputProps = {
      placeholder: this.props.placeholder,
      name: this.props.name,
      // value, onChange를 props로 받으면
      // 자동완성 아이템을 선택하더라도 onChange가 호출되지 않는듯
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    return (
      <Autosuggest
        suggestions={this.props.suggestions}
        onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={(event, { suggestionValue }) => {
          // 마우스 클릭시 value 값 변경
          // event.target.name이 undefined임
          this.props.onChange(suggestionValue);
        }}
      />
    );
  }
}

export default withRouter(Autocomplete);
