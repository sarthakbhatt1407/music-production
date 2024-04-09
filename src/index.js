import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// @media only screen and (min-width: 0px) and (max-width: 350px) {

// }
// @media only screen and (min-width: 351px) and (max-width: 549px) {

// }
// @media only screen and (min-width: 550px) and (max-width: 800px) {

// }
