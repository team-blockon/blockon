import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * 로그인되어 있으면 원래 컴포넌트를 보여주고,
 * 로그인되어 있지 않으면 리다이렉트시키는 컴포넌트
 */
class PrivateRoute extends Component {
  render() {
    const { component: Component, isLogged, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isLogged ? <Component {...props} /> : <Redirect to="/auth/login" />
        }
      />
    );
  }
}

export default PrivateRoute;
