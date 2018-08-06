import React, { Component } from 'react';
import TradeForm from './TradeForm';
import RentForm from './RentForm';
import * as PdfAPI from 'lib/api/pdf';
import { withStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  pdfContainer: {
    padding: theme.spacing.unit * 3
  }
});

/**
 * 계약서 상단에 보여주는 스텝
 */
function getSteps() {
  return ['부동산의 표시', '당사자의 표시', '매매대금', '날짜 및 서명날인'];
}

/**
 * 계약 타입에 따른 조건부 렌더링
 * @param type 매매인지 전월세인지를 나타내는 타입
 * @param step 어느 step을 출력해야 하는지 props로 넘겨줌
 * @param storeData submit될 때 사용하는 input 데이터를 담기 위한 함수
 */
function getStepContent(type, step, storeData, formData) {
  if (type === 'rent') {
    return <RentForm step={step} storeData={storeData} formData={formData} />;
  } else {
    return <TradeForm step={step} storeData={storeData} formData={formData} />;
  }
}

/**
 * 계약서 내용을 나타내는 컴포넌트
 */
class ContractContent extends Component {
  // state에 있는 값이 바뀌면 리렌더링
  state = {
    activeStep: 0,
    formData: {
      location: '',
      seller: '',
      buyer: '',
      deposit: '',
      monthlyRent: '',
      downPayment: '',
      middlePayment: '',
      balance: '',
      contractDate: '2018-01-01'
    }
  };

  /**
   * 다음 스텝으로 이동하도록 state 변경
   */
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  /**
   * 이전 스텝으로 이동하도록 state 변경
   */
  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  /**
   * 자식 컴포넌트에서 input에 사용자 입력이 발생할 때마다 호출되는 함수
   * @param data submit될 때 사용하는 input 데이터
   */
  storeData = data => {
    this.setState(
      {
        formData: {
          ...this.state.formData,
          [data.name]: data.value
        }
      },
      () => console.log(this.state.formData)
    );
  };

  /**
   * form에 submit 이벤트가 발생하면 호출되는 이벤트 핸들러
   * @param event
   */
  handleSubmit = event => {
    const { formData } = this.state;
    event.preventDefault();
    PdfAPI.getFilledPDF(formData);
  };

  render() {
    const { type, classes } = this.props;
    const { formData, activeStep } = this.state;
    const steps = getSteps();

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="{classes.root}">
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    {getStepContent(type, activeStep, this.storeData, formData)}
                    <div className={classes.actionsContainer}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        이전
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? '완료' : '다음'}
                      </Button>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <div className={classes.pdfContainer}>
              <Typography>계약서 작성을 완료하였습니다.</Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                PDF 생성
              </Button>
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(ContractContent);
