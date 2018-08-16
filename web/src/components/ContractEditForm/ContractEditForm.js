import React, { Component } from 'react';
import classNames from 'classnames';
import './ContractEditForm.scss';

class ContractEditForm extends Component {
  state = {
    seller: '',
    buyer: '',
    status: ''
  };

  handleSelect = status => {
    this.setState({
      status
    });
  };

  handleSubmit = () => {
    window.blockon.createContract.sendTransaction(
      '0x2cacbe568e220d6cc7d4995455e1e1616b830bd0',
      '0x97bf1acae54d933ede531c2ca4bedc341f6e5c15',
      '0x736202c81da14abac98ea9cf3e3bf4b54e625e77',
      1,
      (err, res) => {
        console.log(res);
      }
    );
  };

  render() {
    const { status } = this.state;

    return (
      <div className="ContractEditForm">
        <div className="container content">
          <h1>계약등록</h1>
          <h2>거래당사자</h2>
          <div>
            <div className="form-group">
              <label className="form-label">매수인</label>
              <input
                type="text"
                placeholder="이메일 주소 또는 전화번호로 검색하세요"
              />
            </div>
            <div className="form-group">
              <label className="form-label">매도인</label>
              <input
                type="text"
                placeholder="이메일 주소 또는 전화번호로 검색하세요"
              />
            </div>
          </div>

          <div>
            <h2>매물정보</h2>
            <div className="form-group type">
              <label className="form-label">건물형태</label>
              <input type="radio" id="jutaek" name="type" /> 주택
              <input type="radio" id="apartment" name="type" /> 아파트
              <input type="radio" id="sangga" name="type" /> 상가
              <input type="radio" id="officetel" name="type" /> 오피스텔
            </div>
            <div className="form-group">
              <label className="form-label">건물주소</label>
              <input type="text" placeholder="예) 센트럴타운로 76" />
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
              <input type="date" placeholder="2018-09-31" />
            </div>
            <div className="form-group">
              <label className="form-label">계약종류</label>
              <input type="radio" value="wolse" /> 월세
              <input type="radio" value="jeonse" /> 전세
              <input type="radio" value="maemae" /> 매매
            </div>
            <div className="form-group">
              <label className="form-label">계약상황</label>
              <div className="progressbar-wrapper">
                <ul className="progressbar">
                  <li
                    className={classNames({ active: status === 'deposit' })}
                    onClick={() => this.handleSelect('deposit')}
                  >
                    가계약금
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

export default ContractEditForm;
