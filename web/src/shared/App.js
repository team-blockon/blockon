import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Contract } from "pages";
import ContractCardList from "components/ContractCardList";
import AppTemplate from "components/AppTemplate";
import Header from "components/Header";
import Button from "components/Button";

/**
 * 서버와 클라이언트에서 공용으로 사용하는 컴포넌트
 */
class App extends Component {
  render() {
    return (
      <AppTemplate header={<Header right={<Button>로그인</Button>} />}>
        {/* 라우트에 맞춰서 컴포넌트를 보여줌 */}
        <Route exact path="/" component={ContractCardList} />
        <Route path="/contract" component={Contract} />
      </AppTemplate>
    );
  }
}

export default App;
