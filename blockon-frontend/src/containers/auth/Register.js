import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { register, registerEvent } from 'store/modules/web3/auth';

import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/auth/InputWithLabel';
import AuthButton from 'components/auth/AuthButton';
import Loading from 'components/common/Loading';

import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';
import * as Web3Utils from 'lib/web3/utils';

import { Upload, Icon, Button, notification } from 'antd';

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
    email: '',
    authNo: ''
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleClick = async () => {
    const { email } = this.state;
    await AuthAPI.sendAuthEmail({ email });
    notification['success']({
      message: '입력하신 이메일로 인증 메일이 발송되었습니다.',
      duration: 3
    });
  };

  handleRegister = async event => {
    const { profileFilename, username, email } = this.state;
    const ethAddress = await Web3Utils.getDefaultAccount();

    /* 컨트랙트 내에서 계정 생성 성공시 이벤트를 받아 / 라우트로 리다이렉트 */
    const { register, registerEvent, history } = this.props;

    if (!ethAddress || !email) {
      return;
    }
    await register({ ethAddress, email });
    await registerEvent(ethAddress);

    // accountAddress를 제외한 나머지를 DB에 추가
    await AuthAPI.register({
      ethAddress,
      profileFilename,
      username,
      email
    });

    const { accountAddress } = this.props;
    await UserAPI.updateAccountAddressByEthAddress(accountAddress, ethAddress);

    history.push('/');
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
    const { loading } = this.props;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">사진 업로드</div>
      </div>
    );

    return (
      <Fragment>
        {loading && <Loading />}
        <AuthContent title="회원가입">
          <div className="InputWithLabel">
            <div className="label">프로필</div>
            <Upload
              name="profile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/auth/profile"
              onChange={this.handleProfileChange}
              customRequest={this.customRequest}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className="profile_pic"
                  style={{ width: 100 + '%' }}
                  alt="avatar"
                />
              ) : (
                uploadButton
              )}
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
          <div className="InputWithLabel">
            <div className="label">이메일</div>
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="이메일"
                onChange={this.handleChange}
              />
              <Button
                type="primary"
                style={{ height: '44px' }}
                onClick={this.handleClick}
              >
                인증
              </Button>
            </div>
          </div>
          <AuthButton onClick={this.handleRegister}>회원가입</AuthButton>
        </AuthContent>
      </Fragment>
    );
  }
}

export default connect(
  ({ web3Auth, pender }) => ({
    accountAddress: web3Auth.accountAddress,
    loading: pender.pending['web3/auth/REGISTER_EVENT']
  }),
  { register, registerEvent }
)(Register);
