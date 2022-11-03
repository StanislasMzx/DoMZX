import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import App from "./App";
import "./styles/global.css";

axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrf_access_token";
axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
