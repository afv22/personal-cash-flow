import React, { useState, useEffect, createContext } from "react";
import CashFlowApp from "./CashFlowApp.react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import {} from "./constants";
import LoginReact from "./Login.react";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN, GRAPHQL_ENDPOINT_URL } from "./constants";

export default ({}) => {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
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
      {token ? (
        <CashFlowApp setToken={setToken} />
      ) : (
        <LoginReact setToken={setToken} />
      )}
    </ApolloProvider>
  );
};
