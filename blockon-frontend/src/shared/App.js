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

import CaverJs from 'caver-js';
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
    // caver 객체를 만들어줌
    // 이때 주소를 백엔드에서 동작중인 klaytn 노드의 주소로 해야한다.
    window.caver = new CaverJs('http://localhost:8551');
    let { caver } = window;

    this.initializeUserInfo();

    window.blockon = new caver.klay.Contract(
      blockonABI,
      '0x6bd496d462d7500e7a4275a3186b735331281ec3'
    );

    // 아이디와 비번을 치고 로그인하면, DB에서 디폴트어카운트를 받아와서 설정해줘야 한다.
    // caver.klay.defaultAccount = "받아온 키스토어에서 퍼블릭어드레스 뽑은것"
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
