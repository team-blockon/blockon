import React, { Component } from 'react';
import AuthContent from 'components/AuthContent';
import InputWithLabel from 'components/InputWithLabel';
import AuthButton from 'components/AuthButton';
import * as AuthAPI from 'lib/api/auth';

class Register extends Component {
  state = {
    profile: '',
    username: '',
    email: ''
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
    const isJunggae = this.state.isJunggae === 1;

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
    return (
      <AuthContent title="회원가입">
        <InputWithLabel
          label="프로필 사진"
          type="text"
          name="username"
          value={this.state.profile}
          placeholder="프로필 사진"
          onChange={this.handleChange}
        />
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

        <AuthButton onClick={this.handleRegister}>회원가입</AuthButton>
      </AuthContent>
    );
  }
}

export default Register;
