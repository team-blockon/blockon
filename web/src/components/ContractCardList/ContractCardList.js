import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "./ContractCardList.scss";
import PreviewBox from "../PreviewBox";

const styles = {
  card: {
    minWidth: 345
  }
};

const contracts = [
  {
    title: "매매",
    subtitle: "부동산매매계약서",
    link: "contract/edit?type=trade"
  },
  {
    title: "전월세",
    subtitle: "부동산임대차계약서",
    link: "contract/edit?type=rent"
  }
];

/**
 * / 라우트에서 보여지는 계약서 카드 리스트 컴포넌트
 * 먼저 매매계약서, 임대차계약서 중 선택
 *
 * @param props 부모 컴포넌트로부터 넘겨받는 값
 */
class ContractCardList extends Component {
  state = {
    previewBox: false // 모달 상태
  };

  /**
   * 모달 토글
   */
  handleTogglePreviewBox = () => {
    this.setState({ previewBox: !this.state.previewBox });
  };

  render() {
    const { classes } = this.props;
    const { previewBox } = this.state;

    return (
      <div className="ContractCardList">
        <Grid container spacing={24}>
          {contracts.map((contract, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {contract.title}
                    </Typography>
                    <Typography component="p">{contract.subtitle}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to="#"
                      color="primary"
                      onClick={this.handleTogglePreviewBox}
                    >
                      미리보기
                    </Button>
                    <Button component={Link} to={contract.link} color="primary">
                      작성하기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {/*모달 상태가 true일 때만 렌더링*/}
        {previewBox && <PreviewBox onClose={this.handleTogglePreviewBox} />}
      </div>
    );
  }
}

export default withStyles(styles)(ContractCardList);
