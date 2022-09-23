import React, { createContext, useState } from "react";
import { GRAPHQL_ENDPOINT_URL } from "../constants";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

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

const ApolloWrapper = ({ children }) => {
  const [token, setToken] = useState(null);
  const client = createApolloClient(token);
  return (
    <ApolloProvider client={client}>
      <TokenContext.Provider value={{ token, setToken }}>
        {children}
      </TokenContext.Provider>
    </ApolloProvider>
  );
};

export default ApolloWrapper;

export { TokenContext };
