import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.react";
import { ApolloProvider, InitializeApolloClient } from "./Apollo";

const client = InitializeApolloClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
