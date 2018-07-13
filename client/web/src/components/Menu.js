import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    minWidth: 345
  }
};

const contracts = [
  {
    title: "매매",
    subtitle: "부동산매매계약서",
    link: "contract?type=trade"
  },
  {
    title: "전월세",
    subtitle: "부동산임대차계약서",
    link: "contract?type=rent"
  }
];

/**
 * / 라우트에서 보여지는 계약서 메뉴 컴포넌트
 * 먼저 매매계약서, 임대차계약서 중 선택
 * 
 * @param props 부모 컴포넌트로부터 넘겨받는 값
 */
const Menu = props => {
  const { classes } = props;

  return (
    <div>
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
                  <Button component={Link} to="#" color="primary">
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
    </div>
  );
};

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
