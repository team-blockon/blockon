import React, { Component } from 'react';
import InputWithLabel from 'components/common/InputWithLabel';
import InputEmail from 'components/common/InputEmail';
import { getImageUrl } from 'lib/utils/common';
import profileImage from 'static/images/profile.svg';
import { Upload } from 'antd';
import './UserInfo.scss';

class UserInfo extends Component {
  render() {
    const {
      profile,
      email,
      password,
      username,
      handleChange,
      handleProfileChange,
      deleteProfile,
      sendAuthEmail,
      handleSubmit
    } = this.props;

    return (
      <div className="UserInfo">
        <div className="upload">
          <Upload
            name="profile"
            action="/api/auth/profile"
            showUploadList={false}
            onChange={handleProfileChange}
          >
            <div className="icon-with-text">
              {!profile && <img src={profileImage} alt="profile" />}
              {profile && <img src={getImageUrl(profile)} alt="profile" />}
              <div>
                <span>프로필 사진 변경</span> |{' '}
                <span onClick={deleteProfile}>삭제</span>
              </div>
            </div>
          </Upload>
        </div>
        <hr />
        <InputEmail
          label="이메일"
          type="email"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={handleChange}
          sendAuthEmail={sendAuthEmail}
        />
        <InputWithLabel
          label="비밀번호"
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <InputWithLabel
          label="이름"
          name="username"
          value={username}
          placeholder="이름"
          onChange={handleChange}
          readOnly
        />

        <div className="action">
          <button onClick={handleSubmit}>확인</button>
        </div>
      </div>
    );
  }
}

export default UserInfo;
