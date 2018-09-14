import React, { Component } from 'react';
import { Form, Input, Button, Card } from 'antd';

const FormItem = Form.Item;

class MyPageTemplate extends Component {
  state = {};

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
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
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="지갑 이름">
                <Input type="text" name="walletName" placeholder="지갑 이름" />
              </FormItem>
              <FormItem {...formItemLayout} label="비밀번호">
                <Input type="password" name="password" placeholder="비밀번호" />
              </FormItem>
              <FormItem {...formItemLayout} label="비밀번호 확인">
                <Input type="password" placeholder="비밀번호 확인" />
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary">지갑 생성</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default MyPageTemplate;
