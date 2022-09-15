import React, { createContext, useEffect, useState } from "react";
import { GRAPHQL_ENDPOINT_URL } from "../constants";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AUTH_TOKEN } from "../constants";

const TokenContext = createContext();

const createApolloClient = (token) => {
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

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default ({ children }) => {
  const [token, setNewToken] = useState(null);
  const client = createApolloClient(token);

  useEffect(() => {
    setNewToken(localStorage.getItem(AUTH_TOKEN));
  }, []);

  return (
    <ApolloProvider client={client}>
      <TokenContext.Provider value={{ token, setNewToken }}>
        {children}
      </TokenContext.Provider>
    </ApolloProvider>
  );
};

export { TokenContext };
