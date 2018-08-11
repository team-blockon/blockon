import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * 로그인되어 있으면 원래 컴포넌트를 보여주고,
 * 로그인되어 있지 않으면 리다이렉트시키는 컴포넌트
 */
class PrivateRoute extends Component {
  render() {
    const { component: Component, isLogged, isJunggae, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isLogged ? (
            <Component isJunggae={isJunggae} {...props} />
          ) : (
            <Redirect to="/auth/login" />
          )
        } // history, location, match를 props 인자로 전달받음
      />
    );
  }
}

export default PrivateRoute;
