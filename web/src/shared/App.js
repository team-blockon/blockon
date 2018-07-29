import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Contract, Auth } from "pages";
import ContractCardList from "components/ContractCardList";
import AppTemplate from "components/AppTemplate";
import Header from "components/Header";
import HeaderNav from "components/HeaderNav";
import Button from "components/Button";

/**
 * 서버와 클라이언트에서 공용으로 사용하는 컴포넌트
 */
class App extends Component {
  state = {
    tab: null
  };

  handleSelectTab = tab => {
    this.setState({
      tab
    });
  };

  render() {
    const { tab } = this.state;

    const loginButton = (
      <Link to="/auth/login">
        <Button>로그인</Button>
      </Link>
    );

    return (
      <AppTemplate
        header={
          <Header
            left={<HeaderNav tab={tab} onSelect={this.handleSelectTab} />}
            right={loginButton}
          />
        }
      >
        {/* 라우트에 맞춰서 컴포넌트를 보여줌 */}
        <Route exact path="/contract" component={ContractCardList} />
        <Route path="/contract/edit" component={Contract} />
        <Route path="/auth" component={Auth} />
      </AppTemplate>
    );
  }
}

export default App;
