import React, { Fragment } from 'react';
import { Avatar, Upload, Button, Input } from 'antd';
import './UserInfo.scss';

const getProfileUrl = thumbnail => {
  if (!thumbnail) return null;
  return `http://localhost:8000/uploads/${thumbnail}`;
};

const UserInfo = ({ profile, username, email }) => {
  return (
    <Fragment>
      <h2>회원정보</h2>
      <table>
        <tbody>
          <tr>
            <th>사진</th>
            <td>
              <div className="profile">
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
              </div>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              <Input name="username" value={username} disabled />
            </td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>
              <div className="button-addon">
                <Input
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <Button onClick={this.sendAuthEmail}>인증</Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="action">
        <Button onClick={this.handleSubmit}>확인</Button>
      </div>
    </Fragment>
  );
};

export default UserInfo;
