import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/store/index";
import { Auth0Provider } from "@auth0/auth0-react";

// const domain = process.env.AUTH0_DOMAIN;
// const clientId = process.env.AUTH0_ID;

ReactDOM.render(
  // <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
  <Auth0Provider
    domain="dev-plerr0wia452arpa.us.auth0.com"
    clientId="GMstwgCCOFqqy1KHuQvj4Si3EK2nMXDz"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Auth0Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

