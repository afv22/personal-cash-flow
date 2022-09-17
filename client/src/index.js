import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.react";
import ApolloWrapper from "./components/ApolloWrapper.react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </React.StrictMode>
);
