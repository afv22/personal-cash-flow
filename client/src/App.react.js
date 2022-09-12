import React, { useEffect, useState } from "react";
import CashFlowApp from "./CashFlowApp.react";
import LoginReact from "./Login.react";
import { AUTH_TOKEN, GRAPHQL_ENDPOINT_URL } from "./constants";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export default ({}) => {
  const [token, _setToken] = useState("");
  const setToken = (newToken) => {
    localStorage.setItem(AUTH_TOKEN, newToken);
    _setToken(newToken);
  };

  useEffect(() => {
    _setToken(localStorage.getItem(AUTH_TOKEN));
  }, []);

  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {token != "" ? (
        <CashFlowApp setToken={setToken} />
      ) : (
        <LoginReact setToken={setToken} />
      )}
    </ApolloProvider>
  );
};
