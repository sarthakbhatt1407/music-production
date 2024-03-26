import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// @media only screen and (min-width: 0px) and (max-width: 350px) {

// }
// @media only screen and (min-width: 351px) and (max-width: 549px) {

// }
// @media only screen and (min-width: 550px) and (max-width: 800px) {

// }
