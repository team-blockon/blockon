import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import produce from 'immer';
import * as UserAPI from 'lib/api/user';
import * as ContractAPI from 'lib/api/contract';
import * as MetamaskUtil from 'lib/MetamaskUtil';
import AccountAbi from 'abi/account_abi';
import { AutoComplete, Radio, DatePicker } from 'antd';
import './ContractEditForm.scss';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ContractEditForm extends Component {
  state = {
    dataSource: [],
    sellerEmail: '',
    buyerEmail: '',
    formData: {
      people: {
        agentAddress: null,
        sellerAddress: null,
        buyerAddress: null
      },
      building: {
        type: null,
        address: '',
        photo: null
      },
      contract: {
        index: null,
        date: null,
        type: null
      }
    }
  };

  handleSubmit = async () => {
    const { sellerEmail, buyerEmail, formData } = this.state;
    const { agentAddress } = formData.people;
    const { type } = formData.contract;
    const { blockon } = window;

    const seller = await UserAPI.getAccountAddressByEamil(sellerEmail);
    const buyer = await UserAPI.getAccountAddressByEamil(buyerEmail);

    const sellerAddress = seller.data.accountAddress;
    const buyerAddress = buyer.data.accountAddress;
    this.setState(
      produce(draft => {
        draft.formData.people.sellerAddress = sellerAddress;
        draft.formData.people.buyerAddress = buyerAddress;
      })
    );

    console.group('createContractByAccountAddress called');
    console.log('agentAddress:', agentAddress);
    console.log('sellerAddress:', sellerAddress);
    console.log('buyerAddress:', buyerAddress);
    console.log('contractType:', type);
    console.groupEnd();

    blockon.createContractByAccountAddress.sendTransaction(
      /* 먼저 createAccount를 호출하고, 생성된 Account 컨트랙트의 주소를 넣음 */
      agentAddress,
      sellerAddress,
      buyerAddress,
      type,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('createContractByAccountAddress res:', res);
        }
      }
    );
  };

  handleBuildingChange = event => {
    const { name, value } = event.target;
    this.setState(
      produce(draft => {
        draft.formData.building[name] = value;
      })
    );
  };

  handleBuildingAddressClick = () => {
    const { daum } = window;
    const self = this;

    daum.postcode.load(function() {
      new daum.Postcode({
        oncomplete: function(data) {
          self.setState(
            produce(draft => {
              draft.formData.building.address = data.jibunAddress;
            })
          );
        }
      }).open();
    });
  };

  handleContractChange = event => {
    const { name, value } = event.target;
    this.setState(
      produce(draft => {
        draft.formData.contract[name] = value;
      })
    );
  };

  handleDateChange = (date, dateString) => {
    this.setState(
      produce(draft => {
        draft.formData.contract.date = dateString;
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
    this.setState(
      produce(draft => {
        draft.formData.people.agentAddress = agentAddress;
      })
    );
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
        this.setState(
          produce(draft => {
            draft.formData.contract.index = result.args.contractIndex.toNumber(); // BigNumber to Number
          })
        );
        await ContractAPI.create(this.state.formData);
        history.push('/contract');
      }
    });
  }

  render() {
    const { dataSource, sellerEmail, buyerEmail, formData } = this.state;
    const { address } = formData.building;

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
                      draft.buyerEmail = value;
                    })
                  );
                }}
                onSelect={value => {
                  this.setState(
                    produce(draft => {
                      draft.buyerEmail = value;
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
                      draft.sellerEmail = value;
                    })
                  );
                }}
                onSelect={value => {
                  this.setState(
                    produce(draft => {
                      draft.sellerEmail = value;
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
                name="type"
                onChange={this.handleBuildingChange}
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
                value={address}
                name="address"
                onClick={this.handleBuildingAddressClick}
                placeholder="예) 센트럴타운로 76"
                readOnly
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
              <DatePicker onChange={this.handleDateChange} />
            </div>
            <div className="form-group">
              <label className="form-label">계약종류</label>
              <RadioGroup
                name="type"
                onChange={this.handleContractChange}
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
                  <li className={'first-not-active'}>계약금</li>
                  <li>중도금</li>
                  <li>잔금처리</li>
                  <li>등기신청</li>
                  <li>완료</li>
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
