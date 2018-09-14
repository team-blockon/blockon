import React, { Component } from 'react';
import { Form, Input, Button, Card } from 'antd';
import * as MyPageAPI from 'lib/api/myPage';
import * as Web3Utils from 'lib/web3/utils';

const FormItem = Form.Item;

class MyPageTemplate extends Component {
  state = {
    hasWallet: true
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await MyPageAPI.makeWallet().then(res => {
      const { address, privateKey } = res.data;
      this.setState({
        hyconAddress: address,
        hyconPrivateKey: privateKey
      });
    });

    const ethAddress = await Web3Utils.getDefaultAccount();
    const { hyconAddress, hyconPrivateKey } = this.state;

    MyPageAPI.saveWallet({
      ethAddress,
      hyconAddress,
      hyconPrivateKey
    });
  };

  async componentDidMount() {
    const ethAddress = await Web3Utils.getDefaultAccount();

    await MyPageAPI.getWallet({ ethAddress }).then(res => {
      const { hyconAddress, hyconPrivateKey } = res.data;
      console.log(hyconAddress, hyconPrivateKey);
      this.setState({
        hasWallet: true,
        hyconAddress,
        hyconPrivateKey
      });
    });

    const { hyconAddress } = this.state;
    await MyPageAPI.getBalance({ hyconAddress }).then(res => {
      const { balance } = res.data;
      this.setState({
        hyconBalance: balance
      });
    });
  }

  render() {
    const {
      hasWallet,
      hyconAddress,
      hyconPrivateKey,
      hyconBalance
    } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="MyPageTemplate">
        <div className="container content">
          <Card title="지갑 생성">
            {!hasWallet && (
              <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="지갑 이름">
                  <Input
                    type="text"
                    name="walletName"
                    onChange={this.handleChange}
                    placeholder="지갑 이름"
                  />
                </FormItem>
                <FormItem {...formItemLayout} label="비밀번호">
                  <Input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="비밀번호"
                  />
                </FormItem>
                <FormItem {...formItemLayout} label="비밀번호 확인">
                  <Input
                    type="password"
                    name="passwordConfirm"
                    onChange={this.handleChange}
                    placeholder="비밀번호 확인"
                  />
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    지갑 생성
                  </Button>
                </FormItem>
              </Form>
            )}
            지갑 주소: {hyconAddress}
            <br />
            프라이빗 키: {hyconPrivateKey}
            <br />
            잔액: {hyconBalance} HYCON
          </Card>
        </div>
      </div>
    );
  }
}

export default MyPageTemplate;
