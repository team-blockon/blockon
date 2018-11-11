import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './Autocomplete.scss';

const getSuggestionValue = suggestion => suggestion.email;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.username} / {suggestion.email}
  </div>
);

class Autocomplete extends Component {
  state = {
    value: '',
    suggestions: []
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    this.props.onChange(newValue);
  };

  render() {
    const { value } = this.state;

    const inputProps = {
      placeholder: this.props.placeholder,
      name: this.props.name,
      // value, onChange를 props로 받으면
      // 자동완성 아이템을 선택하더라도 onChange가 호출되지 않는듯
      value,
      onChange: this.onChange
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

export default Autocomplete;
