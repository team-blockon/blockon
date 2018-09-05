import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthWrapper from 'components/auth/AuthWrapper';
import { Route } from 'react-router-dom';
import { Login, Register } from 'containers/auth';

class Auth extends Component {
  render() {
    const { isLogged } = this.props;

    // 이미 로그인되어 있으면 리다이렉트
    if (isLogged) return <Redirect to="/contract" />;

    return (
      <AuthWrapper>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
      </AuthWrapper>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged
});

export default connect(mapStateToProps)(Auth);
