import React, { Component } from 'react';
import { Form, Input, Button, Card, Avatar } from 'antd';
import './MyPageTemplate.scss';
import * as MyPageAPI from 'lib/api/myPage';
import * as Web3Utils from 'lib/web3/utils';

const FormItem = Form.Item;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      userEmail: Form.createFormField({
        ...props.userEmail,
        value: props.userEmail.value
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value
      }),
      passwordCheck: Form.createFormField({
        ...props.passwordCheck,
        value: props.passwordCheck.value
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})(props => {
  const { getFieldDecorator } = props.form;

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

  return (
    <Form>
      <FormItem {...formItemLayout} label="이메일">
        {getFieldDecorator('userEmail', {
          rules: [{ required: true, message: 'user email is required' }]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="비밀번호">
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'password is required' }]
        })(<Input id="error" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="비밀번호 확인">
        {getFieldDecorator('passwordCheck', {
          rules: [{ required: true, message: 'check your password again' }]
        })(<Input />)}
      </FormItem>
    </Form>
  );
});

class MyPageTemplate extends Component {
  state = {
    fields: {
      userEmail: {
        value: 'yicho93@gmail.com'
      },
      password: {
        value: '********'
      },
      passwordCheck: {
        value: '********'
      }
    },
    hasWallet: false
  };

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  handleJsonToggle = () => {
    this.setState(prevState => ({
      jsonShow: !prevState.jsonShow
    }));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  async componentDidMount() {
    const ethAddress = await Web3Utils.getDefaultAccount();

    await MyPageAPI.getWallet({ ethAddress }).then(res => {
      if (!res.data || !res.data.hyconAddress || !res.data.hyconPrivateKey) {
        return;
      }

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
    const { fields, jsonShow } = this.state;

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

    return (
      <div className="MyPageTemplate">
        <div className="container content">
          <div className="account-info">
            <Card className="account-profile" title="프로필">
              <div className="profile-wrapper">
                <div className="user-picture">
                  <Avatar size={120} icon="user" src="" />
                  <Button className="edit-btn">수정</Button>
                </div>

                <Form className="userNameForm" layout="inline">
                  <FormItem {...formItemLayout} label="이름">
                    <Input type="text" name="userName" disabled />
                  </FormItem>
                </Form>
              </div>
            </Card>

            <Card className="account-contact" title="연락처">
              <div>
                <CustomizedForm {...fields} onChange={this.handleFormChange} />
                <Button onClick={this.handleJsonToggle}>json 파일보기</Button>
                <Button>변경 완료</Button>
                <pre className="language-bash">
                  {jsonShow ? JSON.stringify(fields, null, 2) : ''}
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPageTemplate;
