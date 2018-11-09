import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import {
  Landing,
  Search,
  Contract,
  ContractUpload,
  ContractDetail,
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

import caver from 'lib/caver';
import blockonABI from 'abi/blockon_abi';

/**
 * 서버와 클라이언트에서 공용으로 사용하는 컴포넌트
 */
class App extends Component {
  // 새로고침시 defaultAccount 유지
  constructor() {
    super();
    this.loggedInfo = JSON.parse(localStorage.getItem('loggedInfo'));
    if (!this.loggedInfo) return;
    caver.klay.defaultAccount = `0x${this.loggedInfo.klaytnAddress}`;
  }

  // 새로고침시 로그인 유지
  initializeUserInfo = () => {
    const { UserActions } = this.props;
    UserActions.setLoggedInfo(this.loggedInfo);
  };

  async componentDidMount() {
    this.initializeUserInfo();

    window.blockon = new caver.klay.Contract(
      blockonABI,
      '0xbb2834280affc578307fb70d05887e19115e6eb6'
    );
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
          <PrivateRoute
            path="/contract/:contractNo"
            component={ContractDetail}
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
