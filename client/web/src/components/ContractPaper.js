import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ContractContent from "./ContractContent";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

/**
 * 계약서 종이를 나타내는 컴포넌트
 * @param props 부모 컴포넌트로부터 넘겨받는 값
 */
const ContractPaper = props => {
  const { classes, type } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          {type === "rent" ? "부동산임대차계약서" : "부동산매매계약서"}
        </Typography>
        <ContractContent type={type} />
      </Paper>
    </div>
  );
};

ContractPaper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContractPaper);
