import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import NumberFormat from "react-number-format";

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
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
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
const TradeForm = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <div>
          <p>등기부등본의 표시란과 동일하게 적어주세요.</p>
          <FormControl fullWidth>
            <TextField
              id="location"
              label="소재지"
              placeholder="소재지"
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
              id="seller"
              label="매도인"
              placeholder="매도인"
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="buyer"
              label="매수인"
              placeholder="매수인"
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
              id="downPayment"
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
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="middlePayment"
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
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="balance"
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
              id="contractDate"
              type="date"
              label="계약일"
              defaultValue="2018-01-01"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
          </FormControl>
        </div>
      );

    default:
      return "Unknown step";
  }
};

export default TradeForm;
