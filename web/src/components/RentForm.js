import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import {
  FormControl,
  TextField,
  InputAdornment,
  Grid
} from '@material-ui/core';

/**
 * 숫자 세자리마다 콤마 찍기
 * @param props 부모 컴포넌트로부터 넘겨받는 값
 */
const NumberFormatCustom = props => {
  // other에 props의 나머지 요소들을 다 할당받음
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
 * 부동산임대차계약서 폼 컴포넌트
 * @param step props에서 step만 가져옴
 */
class RentForm extends Component {
  /**
   * input에 사용자 입력이 발생할 때마다 호출되는 이벤트 핸들러
   * @param event
   */
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.props.storeData({ name, value });
  };

  render() {
    const {
      location,
      seller,
      buyer,
      deposit,
      monthlyRent,
      downPayment,
      middlePayment,
      balance,
      contractDate
    } = this.props.formData;

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
          <p>임대인과 임차인을 적어주세요.</p>
          <FormControl fullWidth>
            <TextField
              name="seller"
              value={seller}
              label="임대인"
              placeholder="임대인"
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="buyer"
              value={buyer}
              label="임차인"
              placeholder="임차인"
              onChange={this.handleChange}
              margin="normal"
            />
          </FormControl>
        </div>
      );

    case 2:
      return (
        <div>
          <p>임대료와 그 지급날짜를 적어주세요.</p>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name="deposit"
                  value={deposit}
                  label="보증금"
                  placeholder="보증금"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name="monthlyRent"
                  value={monthlyRent}
                  label="월세"
                  placeholder="월세"
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
            </Grid>
          </Grid>
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

export default RentForm;
