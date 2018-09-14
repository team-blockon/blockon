import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoodsList from '../GoodsList/GoodsList';
import * as Web3Utils from 'lib/web3/utils';
import * as MyPageAPI from 'lib/api/myPage';
import * as PricingAPI from 'lib/api/pricing';
import { Form, Input, Radio, Checkbox, Button, Spin, Modal } from 'antd';
import './PricingTemplate.scss';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class PricingTemplate extends Component {
  state = {
    payment: 'card',
    visible: false,
    loading: false
  };

  handleChange = e => {
    this.setState({
      payment: e.target.value
    });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handlePay = async () => {
    this.setState({ loading: true });
    const ethAddress = await Web3Utils.getDefaultAccount();

    await MyPageAPI.getWallet({ ethAddress }).then(res => {
      const { hyconAddress, hyconPrivateKey } = res.data;
      this.setState({
        hyconAddress,
        hyconPrivateKey
      });
    });

    const { hyconAddress, hyconPrivateKey } = this.state;

    const getTx = sendTxRes => {
      return new Promise((resolve, reject) => {
        const intervalID = setInterval(async () => {
          const { txHash } = sendTxRes.data;
          const getTxRes = await PricingAPI.getTx({ txHash });
          console.log(getTxRes.data);

          if (!!getTxRes.data.blockHash) {
            clearInterval(intervalID);
            resolve(getTxRes.data.blockHash);
          }
        }, 5000);
      });
    };

    await PricingAPI.sendTx({
      privateKey: hyconPrivateKey,
      from: hyconAddress,
      amount: 1
    })
      .then(getTx)
      .then(console.log);

    this.props.history.push({
      pathname: '/contract',
      state: { activeTab: 'review' }
    });
  };

  handleClick = index => {
    this.setState({
      activeItem: index
    });
  };

  render() {
    const { activeItem, payment, loading } = this.state;

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
      <div className="PricingTemplate">
        <div className="container content">
          <div className="title">
            <h1>BLOCKON 평판리뷰 열람권 구매</h1>
            <p>
              공인중개소 평판과 사용자들의 리뷰를 열람하실 수 있습니다. 부가세
              포함 금액입니다.
            </p>
          </div>

          <GoodsList activeItem={activeItem} handleClick={this.handleClick} />

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
            <Button type="primary" onClick={this.showModal}>
              결제
            </Button>
          </div>
        </div>

        <Modal title="열람권 결제" visible={this.state.visible}>
          <Button type="primary" onClick={this.handlePay} block>
            Hycon으로 결제하기
          </Button>
        </Modal>
        {loading && <Spin tip="결제 진행중..." size="large" />}
      </div>
    );
  }
}

export default withRouter(PricingTemplate);
