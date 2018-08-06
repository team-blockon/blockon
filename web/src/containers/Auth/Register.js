import React, { Component } from 'react';
import AuthContent from 'components/AuthContent';
import InputWithLabel from 'components/InputWithLabel';
import AuthButton from 'components/AuthButton';
import * as AuthAPI from 'lib/api/auth';
import { Tabs, Tab } from '@material-ui/core';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
    isJunggae: 0
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleTabChange = (event, value) => {
    this.setState({
      isJunggae: value
    });
  };

  handleRegister = event => {
    const { history } = this.props;
    const { username, email, password, isJunggae } = this.state;

    AuthAPI.register({ username, email, password, isJunggae }).then(() => {
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
    const { isJunggae } = this.state;

    return (
      <AuthContent title="회원가입">
        <Tabs value={isJunggae} onChange={this.handleTabChange}>
          <Tab label="매도 / 매수인" />
          <Tab label="공인중개사" />
        </Tabs>

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

        {isJunggae === 1 && <div>중개인 인증</div>}

        <AuthButton onClick={this.handleRegister}>회원가입</AuthButton>
      </AuthContent>
    );
  }
}

export default Register;
