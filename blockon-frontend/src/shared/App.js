import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import {
  Landing,
  Search,
  Contract,
  ContractUpload,
  MyPage,
  Pricing,
  Auth
} from 'pages';

import AppTemplate from 'components/base/AppTemplate';
import HeaderContainer from 'containers/base/HeaderContainer';
import HeaderNav from 'components/base/HeaderNav';
import PrivateRoute from 'components/common/PrivateRoute';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';

import Web3 from 'web3';
import blockonABI from 'abi/blockon_abi';
import * as Web3Utils from 'lib/web3/utils';

/**
 * 서버와 클라이언트에서 공용으로 사용하는 컴포넌트
 */
class App extends Component {
  // 새로고침시 로그인 유지
  initializeUserInfo = () => {
    const loggedInfo = JSON.parse(localStorage.getItem('loggedInfo'));
    if (!loggedInfo) return;

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
  };

  async componentDidMount() {
    let { web3 } = window;

    this.initializeUserInfo();

    if (web3) {
      // 메타마스크가 자동으로 브라우저에 인젝트하는
      // web3가 정의되어 있다면 currentProvider를 가져옴
      this.web3Provider = web3.currentProvider;
    } else {
      // 직접 HttpProvider로 Provier 설정
      // 로컬에서 full node를 돌리고 있을때 보통 8545 포트
      // this.web3Provider = new Web3.providers.HttpProvider(
      //   'http://localhost:8545'
      // );
      return;
    }

    web3 = new Web3(this.web3Provider); // web3 객체를 만들어줌
    const contract = web3.eth.contract(blockonABI); // Blockon 컨트랙트 클래스 생성
    window.blockon = contract.at('0x4c49Ae08de294D77A08B1cCB89A1118DD4aD8C9B'); // 컨트랙트 인스턴스 생성
    web3.eth.defaultAccount = await Web3Utils.getDefaultAccount(); // 내가 지금 메타마스크에서 사용하고 있는 주소를 defaultAccount로 설정
  }

  render() {
    const { isLogged } = this.props;

    return (
      <AppTemplate header={<HeaderContainer navItem={<HeaderNav />} />}>
        <Switch>
          {/* 라우트에 맞춰서 컴포넌트를 보여줌 */}
          <Route exact path="/" component={Landing} />
          <Route path="/search" component={Search} />
          <PrivateRoute
            exact
            path="/contract"
            component={Contract}
            isLogged={isLogged}
          />
          <PrivateRoute
            path="/contract/edit"
            component={ContractUpload}
            isLogged={isLogged}
          />
          <PrivateRoute path="/mypage" component={MyPage} isLogged={isLogged} />
          <PrivateRoute
            path="/pricing"
            component={Pricing}
            isLogged={isLogged}
          />
          <Route path="/auth" component={Auth} />
        </Switch>
      </AppTemplate>
    );
  }
}

// 스토어의 state를 props로 넣어주는 함수
const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged
});

// 액션을 dispatch하는 함수를 props로 넣어주는 함수
const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch)
});

// withRouter: 라우트가 변경될 때마다 render가 호출되게 함
export default withRouter(
  // connect 함수로 컴포넌트에 스토어 연동
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
