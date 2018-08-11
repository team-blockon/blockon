import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'components/Header';
import LoggedInNav from 'components/HeaderNav/LoggedInNav';
import LoggedOutNav from 'components/HeaderNav/LoggedOutNav';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import * as AuthAPI from 'lib/api/auth';

class HeaderContainer extends Component {
  handleLogout = async () => {
    const { UserActions } = this.props;

    await AuthAPI.logout()
      .then(() => {
        console.log('access-token 쿠키 삭제 성공');
      })
      .catch(() => {
        console.log('access-token 쿠키 삭제 실패');
      });

    localStorage.removeItem('loggedInfo');
    UserActions.logout();
    this.props.history.push('/'); /* / 라우트로 이동 */
  };

  render() {
    const { isLogged, navItem } = this.props;

    /**
     * 로그인 여부에 따라 로그인/로그아웃 버튼 조건부 렌더링
     */
    const getUserButtons = () => {
      if (isLogged) {
        return <LoggedInNav handleLogout={this.handleLogout} />;
      } else {
        return <LoggedOutNav />;
      }
    };

    return <Header navItem={navItem} userButtons={getUserButtons()} />;
  }
}

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch)
});

// withRouter: 상위 Route 컴포넌트의 history 객체를 props로 넣어줌
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderContainer)
);
