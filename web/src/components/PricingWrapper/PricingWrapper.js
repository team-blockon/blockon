import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { Form, Input, Radio, Checkbox, Button, Spin } from 'antd';
import './PricingWrapper.scss';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class PricingWrapper extends Component {
  state = {
    payment: 'card',
    loading: false
  };

  handleChange = e => {
    this.setState({
      payment: e.target.value
    });
  };

  handlePay = () => {
    this.setState({ loading: true });

    setTimeout(() => {
      this.props.history.push({
        pathname: '/contract',
        state: { activeTab: 2 }
      });
    }, 3000);
  };

  handleClick = index => {
    this.setState({
      activeItem: index
    });
  };

  getItems = () => {
    const { activeItem } = this.state;

    const items = [
      {
        duration: '2주',
        comment: '14일',
        original: '12,600원',
        discount: '4,900원'
      },
      {
        duration: '10일',
        comment: '10일',
        original: '9,000원',
        discount: '3,900원'
      },
      {
        duration: '7일',
        comment: '7일',
        original: '6,300원',
        discount: '2,900원'
      },
      {
        duration: '3일',
        comment: '3일',
        original: '2,700원',
        discount: '1,900원'
      },
      {
        duration: '1일',
        comment: '24시간',
        discount: '900원'
      }
    ];

    return items.map((item, index) => {
      return (
        <div
          className={classNames('item', { active: activeItem === index })}
          key={index}
          onClick={() => {
            this.handleClick(index);
          }}
        >
          <div className="left">
            <h2>{item.duration} 이용권</h2>
            <p>{item.comment}간 편하게 이용하실 수 있습니다.</p>
          </div>
          <div className="right">
            <div className="price">
              <span className="original">{item.original}</span>
              <span className="discount">{item.discount}</span>
            </div>
            <div>
              <Button type="primary">선택</Button>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { payment, loading } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 25 },
        sm: { span: 20 }
      }
    };

    return (
      <div className="PricingWrapper">
        <div className="container content">
          <div className="title">
            <h1>BLOCKON 평판리뷰 열람권 구매</h1>
            <p>
              공인중개소 평판과 사용자들의 리뷰를 열람하실 수 있습니다. 부가세
              포함 금액입니다.
            </p>
          </div>

          {this.getItems()}

          <div className="form-section">
            <h3>결제방식</h3>
            <FormItem {...formItemLayout} label="결제수단">
              <RadioGroup onChange={this.handleChange} value={payment}>
                <Radio value="card">신용카드</Radio>
                <Radio value="phone">휴대폰 소액결제</Radio>
              </RadioGroup>
            </FormItem>
          </div>

          <div className="form-section">
            <h3>구매자정보</h3>
            <FormItem {...formItemLayout} label="결제자 성함">
              <Input placeholder="결제자 / 입금자 성함" />
            </FormItem>
            <FormItem {...formItemLayout} label="연락처">
              <Input placeholder="예) 010-xxxx-xxxx" />
            </FormItem>
            <FormItem {...formItemLayout} label="이메일">
              <Input placeholder="예) @gmail" />
            </FormItem>
          </div>

          <div className="agree">
            <Checkbox>이용약관에 동의합니다.</Checkbox>
            <div className="comment">
              - 이용 기간 중 PC, 모바일웹, 스마트폰에서 이용 가능합니다.
              <br />- 열람권 특성상 실사용 도중 해지 및 이에 따른 환불이
              불가능합니다.
              <br />- 일부 컨텐츠는 기업 및 작성자의 요청에 따라 열람이 거부될
              수 있습니다.
              <br />- 결제에 따른 개인정보의 ‘개인정보처리방침’에 근거하여
              관리됩니다.
            </div>
          </div>

          <div className="action">
            <Button>취소</Button>
            <Button type="primary" onClick={this.handlePay}>
              결제
            </Button>
          </div>
        </div>
        {loading && <Spin tip="결제 진행중..." size="large" />}
      </div>
    );
  }
}

export default withRouter(PricingWrapper);
