import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Home, Search, Contract, ContractEdit, Pricing, Auth } from 'pages';
import AppTemplate from 'components/base/AppTemplate';
import HeaderNav from 'components/base/HeaderNav';
import HeaderContainer from 'containers/HeaderContainer';
import PrivateRoute from 'components/PrivateRoute';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';

import Web3 from 'web3';
import Abi from 'abi/blockon_abi';

/**
 * 서버와 클라이언트에서 공용으로 사용하는 컴포넌트
 */
class App extends Component {
  state = {
    activeItem: null
  };

  // 새로고침시 로그인 유지
  initializeUserInfo = () => {
    const loggedInfo = JSON.parse(localStorage.getItem('loggedInfo'));
    if (!loggedInfo) return;

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
  };

  handleSelectNav = activeItem => {
    this.setState({ activeItem });
    localStorage.setItem('HeaderActiveItem', activeItem);
  };

  componentDidMount() {
    let { web3 } = window;

    this.initializeUserInfo();

    // 새로고침시 헤더 선택된 아이템 유지
    const activeItem = localStorage.getItem('HeaderActiveItem') || 'about';
    this.setState({ activeItem });

    if (web3) {
      // 메타마스크가 자동으로 브라우저에 인젝트하는
      // web3가 정의되어 있다면 currentProvider를 가져옴
      this.web3Provider = web3.currentProvider;
    } else {
      // 직접 HttpProvider로 Provier 설정
      // 로컬에서 full node를 돌리고 있을때 보통 8545 포트
      this.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:8545'
      );
    }

    web3 = new Web3(this.web3Provider); // web3 객체를 만들어줌
    const contract = web3.eth.contract(Abi); // 컨트랙트 클래스 생성
    window.blockon = contract.at('0x293f26dd93794f1e5507d91cece3c7e6469f510f'); // 컨트랙트 인스턴스 생성
    web3.eth.defaultAccount = web3.eth.accounts[0]; // 내가 지금 메타마스크에서 사용하고 있는 주소를 defaultAccount로 설정
  }

  render() {
    const { isLogged, isJunggae } = this.props;
    const { activeItem } = this.state;

    return (
      <AppTemplate
        header={
          <HeaderContainer
            navItem={
              <HeaderNav
                activeItem={activeItem}
                onSelect={this.handleSelectNav}
              />
            }
          />
        }
      >
        <Switch>
          {/* 라우트에 맞춰서 컴포넌트를 보여줌 */}
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <PrivateRoute
            exact
            path="/contract"
            component={Contract}
            isLogged={isLogged}
            isJunggae={isJunggae}
          />
          <PrivateRoute
            path="/contract/edit"
            component={ContractEdit}
            isLogged={isLogged}
          />
          <Route path="/pricing" component={Pricing} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </AppTemplate>
    );
  }
}

// 스토어의 state를 props로 넣어주는 함수
const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged,
  isJunggae: user.isJunggae
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
