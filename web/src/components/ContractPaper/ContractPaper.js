import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ContractContent from '../ContractContent';
import './ContractPaper.scss';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

/**
 * 계약서 종이를 나타내는 컴포넌트
 */
class ContractPaper extends Component {
  render() {
    return (
      <div className="container content">
        <div className="ContractPaper">
          <Paper className={this.props.classes.root} elevation={1}>
            <Typography variant="headline" component="h3">
              {this.props.type === 'rent'
                ? '부동산임대차계약서'
                : '부동산매매계약서'}
            </Typography>
            <ContractContent type={this.props.type} />
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ContractPaper);
