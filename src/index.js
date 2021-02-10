import React from "react";
import ReactDOM from "react-dom";

import "./assets/css/black-dashboard-react.min.css";
import "./assets/css/myStyles.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App";

//redux
import { Provider } from "react-redux";
import store from "store";

//firebase
import firebaseConfig from "firebase.config";
import { FirebaseAppProvider } from "reactfire";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store={store}>{<App />}</Provider>
  </FirebaseAppProvider>,

  document.getElementById("root")
);
