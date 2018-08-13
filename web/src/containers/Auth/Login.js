import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthContent from 'components/AuthContent';
import InputWithLabel from 'components/InputWithLabel';
import AuthButton from 'components/AuthButton';
import AuthLink from 'components/AuthLink';
import * as AuthAPI from 'lib/api/auth';
import * as userActions from 'store/modules/user';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleLogin = event => {
    const { setLoggedInfo, history } = this.props;
    const { email, password } = this.state;

    AuthAPI.login({ email, password }).then(res => {
      const loggedInfo = res.data;
      setLoggedInfo(loggedInfo);

      localStorage.setItem('loggedInfo', JSON.stringify(loggedInfo));
      history.push('/');
    });
  };

  handleKeyPress = event => {
    // 엔터가 입력되면 로그인 진행
    if (event.charCode === 13) {
      this.handleLogin();
    }
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
          onKeyPress={this.handleKeyPress}
        />
        <AuthButton onClick={this.handleLogin}>로그인</AuthButton>
        <AuthLink to="/auth/register">회원가입</AuthLink>
      </AuthContent>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLoggedInfo: loggedInfo => dispatch(userActions.setLoggedInfo(loggedInfo))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
