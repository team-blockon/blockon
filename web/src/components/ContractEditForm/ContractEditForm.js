import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import produce from 'immer';
import * as UserAPI from 'lib/api/user';
import * as ContractAPI from 'lib/api/contract';
import * as MetamaskUtil from 'lib/MetamaskUtil';
import AccountAbi from 'abi/account_abi';
import { AutoComplete, Radio, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import './ContractEditForm.scss';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ContractEditForm extends Component {
  state = {
    agentAddress: null,
    dataSource: [],
    formData: {
      sellerEmail: '',
      buyerEmail: '',
      buildingAddress: ''
    }
  };

  handleSelect = status => {
    this.setState(
      produce(draft => {
        draft.formData.contractType = status;
      })
    );
  };

  handleSubmit = async () => {
    const { agentAddress } = this.state;
    const { sellerEmail, buyerEmail, contractType } = this.state.formData;
    const { blockon } = window;

    const seller = await UserAPI.getAccountAddressByEamil(sellerEmail);
    const buyer = await UserAPI.getAccountAddressByEamil(buyerEmail);

    const sellerAddress = seller.data.accountAddress;
    const buyerAddress = buyer.data.accountAddress;

    console.group('createContractByAccountAddress called');
    console.log('agentAddress:', agentAddress);
    console.log('sellerAddress:', sellerAddress);
    console.log('buyerAddress:', buyerAddress);
    console.log('contractType:', contractType);
    console.groupEnd();

    blockon.createContractByAccountAddress.sendTransaction(
      /* 먼저 createAccount를 호출하고, 생성된 Account 컨트랙트의 주소를 넣음 */
      agentAddress,
      sellerAddress,
      buyerAddress,
      contractType,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('createContractByAccountAddress res:', res);
        }
      }
    );
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(
      produce(draft => {
        draft.formData[name] = value;
      })
    );
  };

  handleSearch = value => {
    UserAPI.getEmailList(value).then(res => {
      const emailList = res.data;
      this.setState({
        dataSource: emailList
      });
    });
  };

  async componentDidMount() {
    const { history } = this.props;
    const { web3 } = window;

    const agent = await UserAPI.getAccountAddressByEthAddress(
      MetamaskUtil.getDefaultAccount()
    );
    const agentAddress = agent.data.accountAddress;
    this.setState({ agentAddress });
    const accountInstance = web3.eth.contract(AccountAbi).at(agentAddress);

    const latestBlockNumber = await MetamaskUtil.getLatestBlockNumber();

    // UpdateEvent 이벤트에 대한 filter
    const updateEvent = accountInstance.UpdateContract(null, {
      fromBlock: latestBlockNumber,
      toBlock: 'latest'
    });

    // UpdateEvent 이벤트에 대한 watch
    updateEvent.watch(async (error, result) => {
      if (error) {
        console.log(error);
      } else {
        await ContractAPI.create(this.state.formData);
        history.push('/contract');
      }
    });
  }

  render() {
    const { dataSource } = this.state;
    const {
      sellerEmail,
      buyerEmail,
      buildingAddress,
      status
    } = this.state.formData;

    return (
      <div className="ContractEditForm">
        <div className="container content">
          <h1>계약등록</h1>
          <h2>거래당사자</h2>
          <div>
            <div className="form-group">
              <label className="form-label">매수인</label>
              <AutoComplete
                name="buyerEmail"
                dataSource={dataSource}
                onChange={value => {
                  this.setState(
                    produce(draft => {
                      draft.formData.buyerEmail = value;
                    })
                  );
                }}
                onSelect={value => {
                  this.setState(
                    produce(draft => {
                      draft.formData.buyerEmail = value;
                    })
                  );
                }}
                onSearch={this.handleSearch}
              >
                <input
                  type="email"
                  value={buyerEmail}
                  name="buyerEmail"
                  placeholder="이메일 주소로 검색하세요"
                />
              </AutoComplete>
            </div>
            <div className="form-group">
              <label className="form-label">매도인</label>
              <AutoComplete
                dataSource={dataSource}
                onChange={value => {
                  this.setState(
                    produce(draft => {
                      draft.formData.sellerEmail = value;
                    })
                  );
                }}
                onSelect={value => {
                  this.setState(
                    produce(draft => {
                      draft.formData.sellerEmail = value;
                    })
                  );
                }}
                onSearch={this.handleSearch}
              >
                <input
                  type="email"
                  value={sellerEmail}
                  name="sellerEmail"
                  placeholder="이메일 주소로 검색하세요"
                />
              </AutoComplete>
            </div>
          </div>

          <div>
            <h2>매물정보</h2>
            <div className="form-group type">
              <label className="form-label">건물형태</label>
              <RadioGroup
                name="buildingType"
                onChange={this.handleChange}
                defaultValue="jutaek"
                buttonStyle="solid"
              >
                <RadioButton value="jutaek">주택</RadioButton>
                <RadioButton value="apartment">아파트</RadioButton>
                <RadioButton value="sangga">상가</RadioButton>
                <RadioButton value="officetel">오피스텔</RadioButton>
              </RadioGroup>
            </div>
            <div className="form-group">
              <label className="form-label">건물주소</label>
              <input
                type="text"
                value={buildingAddress}
                name="buildingAddress"
                onChange={this.handleChange}
                placeholder="예) 센트럴타운로 76"
              />
            </div>
            <div className="form-group">
              <label className="form-label">매물사진</label>
              <input type="file" />
            </div>
          </div>

          <h2>계약상황</h2>
          <div>
            <div className="form-group">
              <label className="form-label">거래일자</label>
              <DatePicker locale={locale} />
            </div>
            <div className="form-group">
              <label className="form-label">계약종류</label>
              <RadioGroup
                name="contractType"
                onChange={this.handleChange}
                defaultValue="wolse"
                buttonStyle="solid"
              >
                <RadioButton value={1}>월세</RadioButton>
                <RadioButton value={2}>전세</RadioButton>
                <RadioButton value={3}>매매</RadioButton>
              </RadioGroup>
            </div>
            <div className="form-group">
              <label className="form-label">계약상황</label>
              <div className="progressbar-wrapper">
                <ul className="progressbar">
                  <li
                    className={classNames({ active: status === 'deposit' })}
                    onClick={() => this.handleSelect('deposit')}
                  >
                    계약금
                  </li>
                  <li
                    className={classNames({
                      active: status === 'middlePayment'
                    })}
                    onClick={() => this.handleSelect('middlePayment')}
                  >
                    중도금
                  </li>
                  <li
                    className={classNames({ active: status === 'balance' })}
                    onClick={() => this.handleSelect('balance')}
                  >
                    잔금처리
                  </li>
                  <li
                    className={classNames({
                      active: status === 'registration'
                    })}
                    onClick={() => this.handleSelect('registration')}
                  >
                    등기신청
                  </li>
                  <li
                    className={classNames({ active: status === 'complete' })}
                    onClick={() => this.handleSelect('complete')}
                  >
                    완료
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="action">
            <button type="button" onClick={this.handleSubmit}>
              계약등록
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ContractEditForm);
