import React, { Component, Fragment } from 'react';
import InputWithLabel from 'components/common/InputWithLabel';
import InputEmail from 'components/common/InputEmail';
import profileImage from 'static/images/profile.svg';
import { Avatar, Upload, Button, Input } from 'antd';
import './UserInfo.scss';

const getProfileUrl = thumbnail => {
  if (!thumbnail) return null;
  return `http://localhost:8000/uploads/${thumbnail}`;
};

class UserInfo extends Component {
  state = {
    file: null,
    id: '',
    password: '',
    username: '',
    email: ''
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

  render() {
    const { file, id, password } = this.state;
    const { profile, username, email, handleChange } = this.props;

    return (
      <div className="UserInfo">
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
            {file && <img src={file} alt="profile" />}
            {!file && (
              <Fragment>
                <img src={profileImage} alt="profile" />
                프로필 사진 변경
              </Fragment>
            )}
          </div>
        </div>
        <hr />
        {/* <div className="profile">
          <Avatar size={120} icon="user" src={getProfileUrl(profile)} />
          <div className="action">
            <Upload
              name="profile"
              action="/api/auth/profile"
              showUploadList={false}
              onChange={this.handleProfileChange}
            >
              <Button>수정</Button>
            </Upload>
            <Button onClick={this.deleteProfile}>삭제</Button>
          </div>
        </div> */}
        <InputWithLabel
          label="아이디"
          name="id"
          value={id}
          placeholder="아이디"
          onChange={this.handleChange}
        />
        <InputWithLabel
          label="비밀번호"
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
          onChange={handleChange}
        />
        <InputWithLabel
          label="이메일"
          type="email"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={handleChange}
          sendAuthEmail={this.sendAuthEmail}
        />
        <div className="action">
          <button onClick={this.handleSubmit}>확인</button>
        </div>
      </div>
    );
  }
}

export default UserInfo;
