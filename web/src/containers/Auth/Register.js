import React, { Component } from 'react';
import AuthContent from 'components/AuthContent';
import InputWithLabel from 'components/InputWithLabel';
import AuthButton from 'components/AuthButton';
import * as AuthAPI from 'lib/api/auth';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordCheck: ''
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleRegister = event => {
    const { history } = this.props;
    const { username, email, password } = this.state;

    AuthAPI.register({ username, email, password }).then(() => {
      history.push('/');
    });
  };

  handleKeyPress = event => {
    // 엔터가 입력되면 회원가입 진행
    if (event.charCode === 13) {
      this.handleRegister();
    }
  };

  render() {
    return (
      <AuthContent title="회원가입">
        <InputWithLabel
          label="이름"
          type="text"
          name="username"
          value={this.state.username}
          placeholder="이름"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="이메일"
          type="text"
          name="email"
          value={this.state.email}
          placeholder="이메일"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          type="password"
          name="password"
          value={this.state.password}
          placeholder="비밀번호"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="비밀번호 확인"
          type="password"
          name="passwordCheck"
          value={this.state.passwordCheck}
          placeholder="비밀번호 확인"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <AuthButton onClick={this.handleSubmit}>회원가입</AuthButton>
      </AuthContent>
    );
  }
}

export default Register;
