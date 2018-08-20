import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthContent from 'components/AuthContent';
import AuthButton from 'components/AuthButton';
import AuthLink from 'components/AuthLink';
import * as AuthAPI from 'lib/api/auth';
import * as userActions from 'store/modules/user';
import { Divider } from 'antd';
import * as MetamaskUtil from 'lib/MetamaskUtil';

class Login extends Component {
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleLogin = () => {
    if (!MetamaskUtil.check()) return;

    const { setLoggedInfo } = this.props;
    const ethAddress = window.web3.eth.defaultAccount;

    AuthAPI.login(ethAddress).then(res => {
      const loggedInfo = res.data;
      setLoggedInfo(loggedInfo);

      localStorage.setItem('loggedInfo', JSON.stringify(loggedInfo));
    });
  };

  handleKeyPress = event => {
    // 엔터가 입력되면 로그인 진행
    if (event.charCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <AuthContent title="로그인">
        <AuthButton onClick={this.handleLogin}>MetaMask로 로그인</AuthButton>
        <Divider />
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
