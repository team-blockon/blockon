import React, { Component } from "react";
import AuthContent from "components/AuthContent";
import InputWithLabel from "components/InputWithLabel";
import AuthButton from "components/AuthButton";
import * as AuthAPI from "lib/api/auth";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleLogin = event => {
    const { email, password } = this.state;
    event.preventDefault();
    AuthAPI.login({ email, password }).then(res => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      window.location = "/contract";
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <AuthContent title="로그인">
        <InputWithLabel
          label="이메일"
          type="text"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={this.handleChange}
        />
        <AuthButton onClick={this.handleLogin}>로그인</AuthButton>
      </AuthContent>
    );
  }
}

export default Login;
