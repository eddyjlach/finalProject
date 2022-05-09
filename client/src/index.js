import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { CurrentUserProvider } from "./CurrentUserContext";

const REACT_APP_DOMAIN = process.env.REACT_APP_DOMAIN;
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={REACT_APP_DOMAIN}
      clientId={REACT_APP_CLIENT_ID}
      redirectUri={"http://localhost:3000/"}
    >
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
