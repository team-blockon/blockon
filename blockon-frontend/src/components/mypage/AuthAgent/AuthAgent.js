import React, { Component, Fragment } from 'react';
import InputWithLabel from 'components/common/InputWithLabel';
import * as Web3Auth from 'lib/web3/auth';
import certificateImage from 'static/images/certificate.svg';
import './AuthAgent.scss';

class AuthAgent extends Component {
  state = {
    isAgent: false,
    file: null,
    certificateNo: '',
    username: '',
    birth: '',
    date: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleFileChange = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
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
    const { isAgent, file, certificateNo, username, birth, date } = this.state;
    // const { username } = this.props;

    return (
      <div className="AuthAgent">
        <input
          type="file"
          ref={ref => {
            this.upload = ref;
          }}
          onChange={this.handleFileChange}
        />
        <div className="upload">
          <div
            className="icon-with-text"
            onClick={() => {
              this.upload.click();
            }}
          >
            {file && <img src={file} alt="certificate" />}
            {!file && (
              <Fragment>
                <img src={certificateImage} alt="certificate" />
                공인중개사자격증 등록
              </Fragment>
            )}
          </div>
        </div>
        <hr />

        <InputWithLabel
          label="자격증번호"
          name="certificateNo"
          value={certificateNo}
          placeholder="자격증번호"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="성명"
          name="username"
          value={username}
          placeholder="성명"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="생년월일"
          name="birth"
          value={birth}
          placeholder="생년월일"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="취득일자"
          name="date"
          value={date}
          placeholder="취득일자"
          onChange={this.handleChange}
        />

        <p className="notice">
          거래 등록은 <span>중개인 인증</span>시 가능합니다.
        </p>
        <div className="action">
          <button onClick={() => this.handleAuth()}>확인</button>
        </div>
        {/* {isAgent && (
          <p className="levelText">
            {username}
            님의 보안등급은 현재 <span>공인중개사</span>
            입니다.
          </p>
        )} */}
      </div>
    );
  }
}

export default AuthAgent;
