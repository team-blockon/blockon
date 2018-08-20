import React, { Component } from 'react';
import AuthContent from 'components/AuthContent';
import InputWithLabel from 'components/InputWithLabel';
import AuthButton from 'components/AuthButton';
import * as AuthAPI from 'lib/api/auth';

class Register extends Component {
  state = {
    profile: '',
    thumbnail: '',
    email: ''
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleRegister = event => {
    const { thumbnail, username, email } = this.state;
    const { web3, blockon } = window;
    const ethAddress = web3.eth.defaultAccount;

    // Blockon 계약 내의 createAccount 함수 호출
    blockon.createAccount.sendTransaction(ethAddress, email, (err, txHash) => {
      if (err) {
        console.log('createAccount 함수 호출 실패');
      } else {
        console.log('createAccount 함수 호출 성공');
      }
    });

    // accountAddress를 제외한 나머지를 DB에 추가
    AuthAPI.register({
      ethAddress,
      thumbnail,
      username,
      email
    });
  };

  handleKeyPress = event => {
    // 엔터가 입력되면 회원가입 진행
    if (event.charCode === 13) {
      this.handleRegister();
    }
  };

  componentDidMount() {
    const { history } = this.props;
    const { web3, blockon } = window;
    const ethAddress = web3.eth.defaultAccount;

    // CreateAccount 이벤트 필터 객체 생성
    // publicAddress가 ethAddress인 이벤트 로그만
    // 범위는 첫 번째 블록부터 마지막 블록까지
    const createAccountEvent = blockon.CreateAccount(
      { publicAddress: ethAddress },
      {
        fromBlock: 0,
        toBlock: 'latest'
      }
    );

    // CreateAccount 이벤트 불러오기
    createAccountEvent.watch((err, res) => {
      if (err) {
        console.log(err);
      } else {
        const { accountAddress, publicAddress } = res.args;
        AuthAPI.updateAccountAddressByEthAddress(accountAddress, publicAddress);
        history.push('/');
      }
    });
  }

  render() {
    return (
      <AuthContent title="회원가입">
        <InputWithLabel
          label="프로필 사진"
          type="text"
          name="thumbnail"
          value={this.state.thumbnail}
          placeholder="프로필 사진"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="이름"
          type="text"
          name="username"
          value={this.state.username}
          placeholder="이름"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="이메일"
          type="text"
          name="email"
          value={this.state.email}
          placeholder="이메일"
          onChange={this.handleChange}
        />

        <AuthButton onClick={this.handleRegister}>회원가입</AuthButton>
      </AuthContent>
    );
  }
}

export default Register;
