import React, { Component } from 'react';
import MyPageTab from '../MyPageTab';
import UserInfo from '../UserInfo';
import AuthAgent from '../AuthAgent';
import * as CaverUtils from 'lib/caver/utils';
import * as CaverUser from 'lib/caver/user';
import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';
import { message, notification } from 'antd';
import './MyPageTemplate.scss';

class MyPageTemplate extends Component {
  state = {
    activeTab: 'user_info',
    defaultAccount: null,
    profile: null,
    username: '',
    email: ''
  };

  handleTabSelect = activeTab => {
    this.setState({
      ...this.state,
      activeTab
    });
  };

  handleProfileChange = info => {
    const { status, response } = info.file;

    if (status === 'done') {
      this.setState({ profile: response.path });
    } else if (status === 'error') {
      message.error('프로필 사진을 업로드할 수 없습니다.');
    }
  };

  deleteProfile = () => {
    this.setState({
      ...this.state,
      profile: null
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  sendAuthEmail = async () => {
    const { email } = this.state;
    const res = await AuthAPI.sendAuthEmail({ email });
    if (res.data.result) {
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

  handleSubmit = () => {
    const { defaultAccount, profile, email } = this.state;

    UserAPI.updateAccountByKlaytnAddress({
      klaytnAddress: defaultAccount,
      profile,
      email
    }).then(res => {
      message.success('회원정보가 수정되었습니다.');
    });
  };

  async componentDidMount() {
    const defaultAccount = CaverUtils.getDefaultAccount();

    CaverUser.getAccountInfo().then(({ account, accountInstance }) => {
      const {
        email,
        profile: { username, thumbnail }
      } = account;

      this.setState({
        ...this.state,
        defaultAccount,
        accountInstance,
        profile: thumbnail,
        username,
        email
      });
    });
  }

  render() {
    const { activeTab, accountInstance, profile, username, email } = this.state;

    return (
      <div className="MyPageTemplate">
        <div className="container content">
          <MyPageTab
            activeTab={activeTab}
            handleTabSelect={this.handleTabSelect}
          />
          {activeTab === 'user_info' && (
            <UserInfo
              profile={profile}
              username={username}
              email={email}
              handleChange={this.handleChange}
              sendAuthEmail={this.sendAuthEmail}
            />
          )}
          {activeTab === 'auth_agent' && (
            <AuthAgent accountInstance={accountInstance} username={username} />
          )}
        </div>
      </div>
    );
  }
}

export default MyPageTemplate;
