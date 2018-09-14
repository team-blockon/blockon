import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';

import AuthContent from 'components/auth/AuthContent';
import AuthButton from 'components/auth/AuthButton';
import AuthLink from 'components/auth/AuthLink';

import * as AuthAPI from 'lib/api/auth';
import * as Web3Utils from 'lib/web3/utils';

import { Divider } from 'antd';

class Login extends Component {
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleLogin = async () => {
    const { history } = this.props; // 나중에 없앨 것!

    if (!Web3Utils.check()) return;

    const { setLoggedInfo } = this.props;
    const ethAddress = await Web3Utils.getDefaultAccount();

    AuthAPI.login(ethAddress).then(res => {
      const loggedInfo = res.data;
      setLoggedInfo(loggedInfo);

      localStorage.setItem('loggedInfo', JSON.stringify(loggedInfo));
      history.push('/pricing'); // 나중에 없앨 것!
    });
  };

  handleRegister = () => {
    const { history } = this.props;
    if (!Web3Utils.check()) return;

    history.push('/auth/register');
  };

  render() {
    return (
      <AuthContent title="로그인">
        <AuthButton onClick={this.handleLogin}>MetaMask로 로그인</AuthButton>
        <Divider />
        <AuthLink onClick={this.handleRegister}>회원가입</AuthLink>
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
