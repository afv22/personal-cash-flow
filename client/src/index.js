import React from "react";
import ReactDOM from "react-dom/client";
import CashFlowApp from "./CashFlowApp.react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CashFlowApp />
    </ApolloProvider>
  </React.StrictMode>
);
