import React, { useEffect, useState } from "react";
import LoginPage from "./auth/Login.react";
import SignupPage from "./auth/Signup.react";
import { AUTH_TOKEN, GRAPHQL_ENDPOINT_URL } from "./constants";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppPageReact from "./AppPage.react";
import AuthContext from "./auth/AuthContext";

export default ({}) => {
  const [token, _setToken] = useState("");
  const isAuth = token !== "";

  const setToken = (newToken) => {
    localStorage.setItem(AUTH_TOKEN, newToken);
    _setToken(newToken);
  };

  useEffect(() => {
    _setToken(localStorage.getItem(AUTH_TOKEN));
  }, []);

  const logout = () => {
    setToken("");
  };

  // Create Apollo Client

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
      <AuthContext.Provider value={{ isAuth, logout, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppPageReact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export { AuthContext };
