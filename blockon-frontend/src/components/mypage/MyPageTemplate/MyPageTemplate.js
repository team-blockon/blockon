import React, { Component } from 'react';
import { Layout, Menu, Input, Button, Avatar } from 'antd';
import * as Web3Utils from 'lib/web3/utils';
import * as UserAPI from 'lib/api/user';
import './MyPageTemplate.scss';

const { Content, Sider } = Layout;

class MyPageTemplate extends Component {
  state = {
    profile: null,
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    newPasswordCheck: ''
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
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
        profile: thumbnail,
        username,
        email
      });
    });
  }

  render() {
    const {
      profile,
      username,
      email,
      oldPassword,
      newPassword,
      newPasswordCheck
    } = this.state;

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
                        <Avatar size={120} icon="user" src={profile} />
                        <div className="action">
                          <Button>수정</Button>
                          <Button>삭제</Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td>
                      <Input
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>이메일</th>
                    <td>
                      <Input
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>기존 비밀번호</th>
                    <td>
                      <Input
                        type="password"
                        name="oldPassword"
                        value={oldPassword}
                        placeholder="기존 비밀번호"
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>비밀번호</th>
                    <td>
                      <Input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        placeholder="비밀번호"
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>비밀번호 확인</th>
                    <td>
                      <Input
                        type="password"
                        name="newPasswordCheck"
                        value={newPasswordCheck}
                        placeholder="비밀번호 확인"
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="action">
                <Button>확인</Button>
              </div>
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default MyPageTemplate;
