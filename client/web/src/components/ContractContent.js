import React, { Component } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TradeForm from "./TradeForm";
import RentForm from "./RentForm";

const styles = theme => ({
  root: {
    width: "90%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

/**
 * 계약서 상단에 보여주는 스텝
 */
function getSteps() {
  return ["부동산의 표시", "당사자의 표시", "매매대금", "날짜 및 서명날인"];
}

/**
 * 계약 타입에 따른 조건부 렌더링
 * @param type 매매인지 전월세인지를 나타내는 타입
 * @param step 어느 step을 출력해야 하는지 props로 넘겨줌
 */
function getStepContent(type, step, handleChange) {
  if (type === "rent") {
    return <RentForm step={step} handleChange={handleChange} />;
  } else {
    return <TradeForm step={step} handleChange={handleChange} />;
  }
}

/**
 * 계약서 내용을 나타내는 컴포넌트
 */
class ContractContent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // state에 있는 값이 바뀌면 리렌더링
  state = {
    activeStep: 0
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

  /* 얘는 수동 바인딩 */
  handleChange(event) {
    const id = event.target.id;
    const value = event.target.value;

    this.props.onChange({ id, value });
  }

  /* 화살표 함수는 자동으로 this 바인딩 */
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="{classes.root}">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? (
              <div>
                <p>계약서 작성을 완료하였습니다.</p>
                <Button type="submit" variant="contained" color="primary">
                  PDF 생성
                </Button>
              </div>
            ) : (
              <div>
                {getStepContent(this.props.type, activeStep, this.handleChange)}
                <div>
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
                    {activeStep === steps.length - 1 ? "완료" : "다음"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(ContractContent);
