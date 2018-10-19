import React, { Component } from 'react';
import * as Web3Auth from 'lib/web3/auth';
import { Button } from 'antd';
import './AuthAgent.scss';

class AuthAgent extends Component {
  state = {
    isAgent: false
  };

  isAgent = accountInstance => {
    if (!accountInstance) return;

    return new Promise((resolve, reject) => {
      accountInstance.isAgent.call((error, result) => {
        if (!error) {
          resolve({ result });
        } else {
          reject({ msg: error });
        }
      });
    });
  };

  handleAuth = () => {
    Web3Auth.authorizeAsAgent();
  };

  async componentDidMount() {
    const { accountInstance } = this.props;
    const { result } = await this.isAgent(accountInstance);

    this.setState({
      ...this.state,
      isAgent: result
    });
  }

  render() {
    const { isAgent } = this.state;
    const { username } = this.props;
    return (
      <div className="AuthAgent">
        <h2>보안인증</h2>

        {!isAgent ? (
          <Button onClick={() => this.handleAuth()}>공인중개사 인증</Button>
        ) : (
          <p className="levelText">
            {username}
            님의 보안등급은 현재 <span>공인중개사</span>
            입니다.
          </p>
        )}
      </div>
    );
  }
}

export default AuthAgent;
