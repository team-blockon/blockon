import React, { Component } from 'react';
import * as Web3Utils from 'lib/web3/utils';
import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';
import {
  Layout,
  Menu,
  Input,
  Avatar,
  Upload,
  message,
  Button,
  notification
} from 'antd';
import './MyPageTemplate.scss';

const { Content, Sider } = Layout;

const getProfileUrl = thumbnail => {
  if (!thumbnail) return null;
  return `http://localhost:8000/uploads/${thumbnail}`;
};

class MyPageTemplate extends Component {
  state = {
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

    UserAPI.getAccountByEthAddress(ethAddress).then(res => {
      const {
        email,
        profile: { username, thumbnail }
      } = res.data;

      this.setState({
        ...this.state,
        ethAddress,
        profile: thumbnail,
        username,
        email
      });
    });
  }

  render() {
    const { profile, username, email } = this.state;

    return (
      <div className="MyPageTemplate">
        <div className="container content">
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="vertical"
                defaultSelectedKeys={['1']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="1">회원정보</Menu.Item>
                <Menu.Item key="2">보안인증</Menu.Item>
              </Menu>
            </Sider>

            <Content style={{ padding: '0 50px' }}>
              <h2>회원정보</h2>

              <table>
                <tbody>
                  <tr>
                    <th>사진</th>
                    <td>
                      <div className="profile">
                        <Avatar
                          size={120}
                          icon="user"
                          src={getProfileUrl(profile)}
                        />
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
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default MyPageTemplate;
