import React, { Component } from 'react';
import UserInfo from '../UserInfo';
import AuthAgent from '../AuthAgent';
import * as Web3Utils from 'lib/web3/utils';
import * as Web3User from 'lib/web3/user';
import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';
import { Layout, Menu, message, notification } from 'antd';
import './MyPageTemplate.scss';

const { Content, Sider } = Layout;

class MyPageTemplate extends Component {
  state = {
    key: '1',
    ethAddress: null,
    profile: null,
    username: '',
    email: ''
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

  handleMenu = ({ key }) => {
    this.setState({
      ...this.state,
      key
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
    await AuthAPI.sendAuthEmail({ email });
    notification['success']({
      message: '입력하신 이메일로 인증 메일이 발송되었습니다.',
      duration: 3
    });
  };

  handleSubmit = () => {
    const { ethAddress, profile, email } = this.state;

    UserAPI.updateAccountByEthAddress({
      ethAddress,
      profile,
      email
    }).then(res => {
      message.success('회원정보가 수정되었습니다.');
    });
  };

  async componentDidMount() {
    const ethAddress = await Web3Utils.getDefaultAccount();

    Web3User.getAccountInfo().then(({ account, accountInstance }) => {
      const {
        email,
        profile: { username, thumbnail }
      } = account;

      this.setState({
        ...this.state,
        ethAddress,
        accountInstance,
        profile: thumbnail,
        username,
        email
      });
    });
  }

  render() {
    const { key, accountInstance, profile, username, email } = this.state;

    return (
      <div className="MyPageTemplate">
        <div className="container content">
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                onClick={this.handleMenu}
                mode="vertical"
                defaultSelectedKeys={['1']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1">회원정보</Menu.Item>
                <Menu.Item key="2">보안인증</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 50px' }}>
              {key === '1' ? (
                <UserInfo profile={profile} username={username} email={email} />
              ) : (
                <AuthAgent
                  accountInstance={accountInstance}
                  username={username}
                />
              )}
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default MyPageTemplate;
