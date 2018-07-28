import React, { Component } from "react";
import AuthContent from "components/AuthContent";
import InputWithLabel from "components/InputWithLabel";
import AuthButton from "components/AuthButton";
import * as AuthAPI from "lib/api/auth";

class Register extends Component {
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

  handleSubmit = event => {
    const { email, password } = this.state;
    event.preventDefault();
    AuthAPI.register({ email, password }).then(() => (window.location = "/"));
  };

  render() {
    return (
      <AuthContent title="회원가입">
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
        <AuthButton onClick={this.handleSubmit}>회원가입</AuthButton>
      </AuthContent>
    );
  }
}

export default Register;
