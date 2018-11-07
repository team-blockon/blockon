import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';

import AuthContent from 'components/auth/AuthContent';
import AuthButton from 'components/auth/AuthButton';
import AuthLink from 'components/auth/AuthLink';
import InputWithLabel from 'components/common/InputWithLabel';

import * as AuthAPI from 'lib/api/auth';
import caver from 'lib/caver';
import * as CaverWallet from 'lib/caver/wallet';

import { Divider, message } from 'antd';

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

  handleLogin = async () => {
    const { email, password } = this.state;
    const { history } = this.props; // 나중에 없앨 것!
    const { setLoggedInfo } = this.props;

    AuthAPI.login({ email, password })
      .then(res => {
        const { loggedInfo, keyStore } = res.data;
        setLoggedInfo(loggedInfo);
        caver.klay.defaultAccount = `0x${keyStore.address}`;

        // keystore에서 프라이빗 키를 가져옴
        const { privateKey: privateKeyFromKeystore } = CaverWallet.decrypt(
          keyStore,
          password
        );

        localStorage.setItem('loggedInfo', JSON.stringify(loggedInfo));
        sessionStorage.setItem(
          'privateKey',
          JSON.stringify(privateKeyFromKeystore)
        );

        history.push('/pricing'); // 나중에 없앨 것!
      })
      .catch(() => {
        message.warning('가입되지 않은 사용자입니다.');
      });
  };

  handleRegister = () => {
    const { history } = this.props;
    history.push('/auth/register');
  };

  render() {
    const { email, password } = this.state;
    return (
      <AuthContent title="로그인">
        <InputWithLabel
          label="이메일"
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
        <Divider />
        <AuthLink handleClick={this.handleRegister}>회원가입</AuthLink>
      </AuthContent>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLoggedInfo: loggedInfo => dispatch(userActions.setLoggedInfo(loggedInfo))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
);
