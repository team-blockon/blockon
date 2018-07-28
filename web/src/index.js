import React from "react";
import ReactDOM from "react-dom";
import Root from "./client/Root";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// Root 컴포넌트를 id가 root인 DOM에 렌더링
ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
