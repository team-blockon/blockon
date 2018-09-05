import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import produce from 'immer';
import axios from 'axios';
import Loading from 'components/common/Loading';

import * as UserAPI from 'lib/api/user';
import * as ContractAPI from 'lib/api/contract';
import * as Web3User from 'lib/web3/user';
import * as Web3Contract from 'lib/web3/contract';
import { updateEvent } from 'store/modules/web3/contract';

import { AutoComplete, Radio, DatePicker } from 'antd';
import { Upload, Icon } from 'antd';
import './ContractUploadTemplate.scss';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

/**
 * 프로필 사진 미리보기를 위한 base64 인코딩
 * @param {*} img
 * @param {*} callback
 */
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

class ContractUploadTemplate extends Component {
  state = {
    dataSource: [], // 자동완성 아이템 리스트
    accountInstance: null, // 이벤트 구독 대상 Account 인스턴스
    sellerEmail: '', // 매도인 이메일
    buyerEmail: '', // 매수인 이메일
    loading: false, // 매물사진이 업로드 중인지 여부
    formData: {
      people: {
        agentAddress: null, // 중개인 Account 컨트랙트 주소
        sellerAddress: null, // 매도인 Account 컨트랙트 주소
        buyerAddress: null // 매수인 Account 컨트랙트 주소
      },
      building: {
        type: null, // 건물형태
        name: '', // 건물명
        address: '', // 건물주소
        photo: null // 매물사진
      },
      contract: {
        index: null, // 계약 생성 후 해당 계약의 인덱스를 받아옴
        date: null, // 거래일자
        type: null // 계약종류
      }
    }
  };

  handleSubmit = async () => {
    const { accountInstance, sellerEmail, buyerEmail, formData } = this.state;
    const { agentAddress } = formData.people;
    const { type } = formData.contract;
    const { updateEvent, history } = this.props;

    // 매도인, 매수인 이메일로 각각의 accountAddress를 가져옴
    const seller = await UserAPI.getAccountAddressByEamil(sellerEmail);
    const buyer = await UserAPI.getAccountAddressByEamil(buyerEmail);
    const sellerAddress = seller && seller.data && seller.data.accountAddress;
    const buyerAddress = buyer && buyer.data && buyer.data.accountAddress;

    this.setState(
      produce(draft => {
        draft.formData.people.sellerAddress = sellerAddress;
        draft.formData.people.buyerAddress = buyerAddress;
      })
    );

    // 메소드 호출 전 null 체크
    if (!agentAddress || !sellerAddress || !buyerAddress || !type) {
      return;
    }

    // 계약 생성 및 이벤트 구독
    await Web3Contract.create(agentAddress, sellerAddress, buyerAddress, type);
    const { contractIndex } = await updateEvent(accountInstance);

    this.setState(
      produce(draft => {
        draft.formData.contract.index = contractIndex;
      })
    );

    await ContractAPI.create(this.state.formData);
    history.push('/contract');
  };

  /**
   * 건물형태, 건물명 인풋 상태 관리
   */
  handleBuildingChange = event => {
    const { name, value } = event.target;
    this.setState(
      produce(draft => {
        draft.formData.building[name] = value;
      })
    );
  };

  /**
   * 건물주소 인풋을 클릭할 때 호출
   */
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

  /**
   * 계약종류 인풋 관리
   */
  handleContractChange = event => {
    const { name, value } = event.target;
    this.setState(
      produce(draft => {
        draft.formData.contract[name] = value;
      })
    );
  };

  /**
   * 거래일자 인풋 관리
   */
  handleDateChange = (date, dateString) => {
    this.setState(
      produce(draft => {
        draft.formData.contract.date = dateString;
      })
    );
  };

  /**
   * value 값에 따라 자동완성 아이템 리스트 변경
   */
  handleSearch = value => {
    UserAPI.getEmailList(value).then(res => {
      const emailList = res.data;
      this.setState({
        dataSource: emailList
      });
    });
  };

  async componentDidMount() {
    const {
      accountAddress,
      accountInstance
    } = await Web3User.getAccountInstance();

    this.setState(
      produce(draft => {
        draft.accountInstance = accountInstance;
        draft.formData.people.agentAddress = accountAddress;
      })
    );
  }

  /**
   * 매물사진 업로드 상태 변경
   */
  handlePhotoChange = info => {
    const { status, originFileObj, response } = info.file;

    if (status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (status === 'done') {
      getBase64(originFileObj, imageUrl => {
        this.setState(
          produce(draft => {
            draft.imageUrl = imageUrl;
            draft.formData.building.photo = response.path;
            draft.loading = false;
          })
        );
      });
    }
  };

  /**
   * multipart/form-data 요청을 위한 커스텀 요청 생성
   */
  customRequest = options => {
    const formData = new FormData();
    formData.append('thumbnail', options.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios
      .post(options.action, formData, config)
      .then(res => {
        options.onSuccess(res.data, options.file);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { loading } = this.props;
    const {
      dataSource,
      sellerEmail,
      buyerEmail,
      formData,
      imageUrl
    } = this.state;
    const { name, address } = formData.building;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">사진 업로드</div>
      </div>
    );

    return (
      <div className="ContractUploadTemplate">
        {loading && <Loading />}
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
              <label className="form-label">건물명</label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={this.handleBuildingChange}
                placeholder="예) 광교이편한세상"
              />
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
              <Upload
                name="photo"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/contract/photo"
                onChange={this.handlePhotoChange}
                customRequest={this.customRequest}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="profile_pic"
                    style={{ width: 100 + '%' }}
                    alt="avatar"
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
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

export default connect(
  ({ pender }) => ({ loading: pender.pending['web3/contract/UPDATE_EVENT'] }),
  { updateEvent }
)(withRouter(ContractUploadTemplate));
