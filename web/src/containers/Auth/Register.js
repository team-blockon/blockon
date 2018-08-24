import React, { Component } from 'react';
import AuthContent from 'components/AuthContent';
import InputWithLabel from 'components/InputWithLabel';
import AuthButton from 'components/AuthButton';
import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';
import * as MetamaskUtil from 'lib/MetamaskUtil';
import { Upload, Icon } from 'antd';
import axios from 'axios';

/**
 * 프로필 사진 미리보기를 위한 base64 인코딩
 * @param {*} img
 * @param {*} callback
 */
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

class Register extends Component {
  state = {
    loading: false, // 프로필 사진 업로드 상태
    username: '',
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
    const { profileFilename, username, email } = this.state;
    const { web3, blockon } = window;
    const ethAddress = web3.eth.defaultAccount;

    // Blockon 계약 내의 createAccount 함수 호출
    blockon.createAccount.sendTransaction(ethAddress, email, (err, txHash) => {
      if (err) {
        console.group('createAccount 함수 호출 실패');
        console.log(err);
        console.groupEnd();
        return;
      } else {
        /* 컨트랙트 내에서 계정 생성 성공시 이벤트를 받아 / 라우트로 리다이렉트 */
        console.log('createAccount 함수 호출 성공');
        const { history } = this.props;
        const { blockon } = window;
        const ethAddress = MetamaskUtil.getDefaultAccount();

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
            console.log(res);
            const { accountAddress, publicAddress } = res.args;
            UserAPI.updateAccountAddressByEthAddress(
              accountAddress,
              publicAddress
            );
            history.push('/');
          }
        });
      }
    });

    // accountAddress를 제외한 나머지를 DB에 추가
    AuthAPI.register({
      ethAddress,
      profileFilename,
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

  /**
   * 프로필 사진 업로드 상태 변경
   */
  handleProfileChange = info => {
    const { status, originFileObj, response } = info.file;

    if (status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (status === 'done') {
      getBase64(originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          profileFilename: response.path,
          loading: false
        })
      );
    }
  };

  /**
   * multipart/form-data 요청을 위한 커스텀 요청 생성
   */
  customRequest = options => {
    const formData = new FormData();
    formData.append('profile', options.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios
      .post(options.action, formData, config)
      .then(res => {
        options.onSuccess(res.data, options.file);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { imageUrl, username, email } = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">사진 업로드</div>
      </div>
    );

    return (
      <AuthContent title="회원가입">
        <div className="InputWithLabel">
          <div className="label">프로필</div>
          <Upload
            name="profile"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//localhost:8000/api/auth/profile"
            onChange={this.handleProfileChange}
            customRequest={this.customRequest}
          >
            {imageUrl ? <img src={imageUrl} className="profile_pic" style={{width: 100+'%'}} alt="avatar" /> : uploadButton}
          </Upload>
        </div>
        <InputWithLabel
          label="이름"
          type="text"
          name="username"
          value={username}
          placeholder="이름"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="이메일"
          type="text"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />

        <AuthButton onClick={this.handleRegister}>회원가입</AuthButton>
      </AuthContent>
    );
  }
}

export default Register;
