import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as AuthAPI from 'lib/api/auth';
import * as userActions from 'store/modules/user';

class LoggedOutNav extends Component {
  handleLogin = () => {
    const { setLoggedInfo } = this.props;
    const ethAddress = window.web3.eth.defaultAccount;

    AuthAPI.login(ethAddress).then(res => {
      const loggedInfo = res.data;
      setLoggedInfo(loggedInfo);

      localStorage.setItem('loggedInfo', JSON.stringify(loggedInfo));
      alert('로그인 성공');
    });
  };

  render() {
    return (
      <Fragment>
        <li onClick={this.handleLogin}>로그인</li>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setLoggedInfo: loggedInfo => dispatch(userActions.setLoggedInfo(loggedInfo))
});

export default connect(
  null,
  mapDispatchToProps
)(LoggedOutNav);
