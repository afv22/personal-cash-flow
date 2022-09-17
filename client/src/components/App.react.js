import React, { useContext, useEffect } from "react";
import LoginPage from "./auth/Login.react";
import SignupPage from "./auth/Signup.react";
import { AUTH_TOKEN } from "../constants";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppPage from "./AppPage.react";
import AuthContext from "./auth/AuthContext";
import { TokenContext } from "./Apollo.react";

export default () => {
  const { token, setToken } = useContext(TokenContext);

  const updateToken = (newToken) => {
    localStorage.setItem(AUTH_TOKEN, newToken);
    setToken(newToken);
  };

  const isAuth = token && token !== "null" && token !== "";

  const logout = () => {
    updateToken(null);
  };

  useEffect(() => {
    const newToken = localStorage.getItem(AUTH_TOKEN);
    console.log(newToken);
    setToken(newToken);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, logout, updateToken }}>
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
