import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { PortfolioProvider } from "./contexts/PortfolioContext";

ReactDOM.render(
  <React.StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
