import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import NumberFormat from 'react-number-format';

/**
 * 숫자 세자리마다 콤마 찍기
 * @param props 부모 컴포넌트로부터 넘겨받는 값
 */
const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={(values, event) => {
        const { name } = event.target;
        const { formattedValue } = values;
        onChange({
          target: {
            name: name,
            value: formattedValue
          }
        });
      }}
      thousandSeparator
    />
  );
};

/**
 * 부동산매매계약서 폼 컴포넌트
 * @param step props에서 step만 가져옴
 */
class TradeForm extends Component {
  state = {
    location: '',
    seller: '',
    buyer: '',
    downPayment: '',
    middlePayment: '',
    balance: '',
    contractDate: '2018-01-01'
  };

  /**
   * input에 사용자 입력이 발생할 때마다 호출되는 이벤트 핸들러
   * @param event
   */
  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    // setState: 비동기로 state를 업데이트한 후,
    // 두 번째 파라미터로 받는 콜백 함수 호출
    this.setState({ [name]: value }, () => {
      this.props.storeData(this.state);
    });
  };

  render() {
    const {
      location,
      seller,
      buyer,
      downPayment,
      middlePayment,
      balance,
      contractDate
    } = this.state;

    switch (this.props.step) {
    case 0:
      return (
        <div>
          <p>등기부등본의 표시란과 동일하게 적어주세요.</p>
          <FormControl fullWidth>
            <TextField
              name="location"
              value={location}
              label="소재지"
              placeholder="소재지"
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
        </div>
      );

    case 1:
      return (
        <div>
          <p>매도인과 매수인을 적어주세요.</p>
          <FormControl fullWidth>
            <TextField
              name="seller"
              value={seller}
              label="매도인"
              placeholder="매도인"
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="buyer"
              value={buyer}
              label="매수인"
              placeholder="매수인"
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
        </div>
      );

    case 2:
      return (
        <div>
          <p>매매대금과 그 지급날짜를 적어주세요.</p>
          <FormControl fullWidth>
            <TextField
              name="downPayment"
              value={downPayment}
              label="계약금"
              placeholder="계약금"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">금액</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">원</InputAdornment>
                ),
                inputComponent: NumberFormatCustom
              }}
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="middlePayment"
              value={middlePayment}
              label="중도금"
              placeholder="중도금"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">금액</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">원</InputAdornment>
                ),
                inputComponent: NumberFormatCustom
              }}
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="balance"
              value={balance}
              label="잔금"
              placeholder="잔금"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">금액</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">원</InputAdornment>
                ),
                inputComponent: NumberFormatCustom
              }}
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
        </div>
      );

    case 3:
      return (
        <div>
          <p>계약을 맺은 날짜를 적어주세요.</p>
          <FormControl fullWidth>
            <TextField
              name="contractDate"
              value={contractDate}
              type="date"
              label="계약일"
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
        </div>
      );

    default:
      return 'Unknown step';
    }
  }
}

export default TradeForm;
