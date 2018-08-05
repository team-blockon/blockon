import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeWrapper from 'components/HomeWrapper';

class Home extends Component {
  render() {
    const { isLogged } = this.props;

    // 이미 로그인되어 있으면 리다이렉트
    if (isLogged) return <Redirect to="/contract" />;

    return <HomeWrapper />;
  }
}

const mapSateToProps = ({ user }) => ({
  isLogged: user.isLogged
});

export default connect(mapSateToProps)(Home);
