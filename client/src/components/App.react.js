import React, { useContext, useEffect, useState } from "react";
import LoginPage from "./auth/Login.react";
import SignupPage from "./auth/Signup.react";
import { AUTH_TOKEN } from "../constants";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppPage from "./AppPage.react";
import AuthContext from "./auth/AuthContext";
import { gql, useMutation } from "@apollo/client";
import { TokenContext } from "./Apollo.react";

const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

export default () => {
  const { token, setNewToken } = useContext(TokenContext);
  const [isAuth, setIsAuth] = useState(false);
  const [verifyToken, { data }] = useMutation(VERIFY_TOKEN);

  const setToken = (newToken) => {
    localStorage.setItem(AUTH_TOKEN, newToken);
    setNewToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (token == null) {
      return;
    }
    verifyToken({ variables: { token: token } });
  }, [token, verifyToken]);

  useEffect(() => {
    setIsAuth(data !== undefined);
  }, [data]);

  return (
    <AuthContext.Provider value={{ isAuth, logout, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export { AuthContext };
