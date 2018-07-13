import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Contract } from "pages";
import Menu from "components/Menu";

/**
 * 서버와 클라이언트에서 공용으로 사용하는 컴포넌트
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* 라우트에 맞춰서 컴포넌트를 보여줌 */}
        <Route exact path="/" component={Menu} />
        <Route path="/contract" component={Contract} />
      </div>
    );
  }
}

export default App;
