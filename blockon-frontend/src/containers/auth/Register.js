import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { register } from 'store/modules/caver/auth';

import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/common/InputWithLabel';
import InputEmail from 'components/common/InputEmail';
import AuthButton from 'components/auth/AuthButton';
import Loading from 'components/common/Loading';

import * as AuthAPI from 'lib/api/auth';

import { Upload, Icon, notification, message } from 'antd';

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
    emailauth: false,
    email: '',
    password: '',
    username: '',
    authNo: ''
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleAuthEmail = async () => {
    const { email } = this.state;
    const res = await AuthAPI.sendAuthEmail({ email });
    if (!res || !res.data) {
      return;
    }
    if (res.data.result) {
      this.setState({ ...this.state, emailauth: true });
      notification['success']({
        message: '입력하신 이메일로 인증 메일이 발송되었습니다.',
        duration: 3
      });
    } else {
      notification['error']({
        message: '이미 존재하는 이메일입니다',
        duration: 3
      });
    }
  };

  handleRegister = async event => {
    if (!this.state.emailauth) {
      message.warning('이메일 인증을 진행해 주세요.');
      return;
    }
    const { profileFilename, email, password, username } = this.state;
    const { history } = this.props;

    if (!email || !password) {
      return;
    }

    // accountAddress를 제외한 나머지를 DB에 추가
    AuthAPI.register({
      profileFilename,
      email,
      password,
      username
    }).then(res => {
      history.push('/');
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
        message.error('프로필 사진 업로드에 실패했습니다.');
      });
  };

  render() {
    const { imageUrl, email, password, username } = this.state;
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
          <InputEmail
            label="이메일"
            type="email"
            name="email"
            value={email}
            placeholder="이메일"
            onChange={this.handleChange}
            sendAuthEmail={this.handleAuthEmail}
          />
          <InputWithLabel
            label="비밀번호"
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호"
            onChange={this.handleChange}
          />
          <InputWithLabel
            label="이름"
            name="username"
            value={username}
            placeholder="이름"
            onChange={this.handleChange}
          />
          <AuthButton onClick={this.handleRegister}>회원가입</AuthButton>
        </AuthContent>
      </Fragment>
    );
  }
}

export default connect(
  ({ caverAuth, pender }) => ({
    accountAddress: caverAuth.accountAddress,
    loading: pender.pending['caver/auth/REGISTER_EVENT']
  }),
  { register }
)(Register);
