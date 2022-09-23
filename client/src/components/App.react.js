import React, { useContext, useEffect, useState } from "react";
import { AUTH_TOKEN } from "../constants";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppletPage from "./applet/AppletPage.react";
import AuthContext from "./auth/AuthContext";
import { TokenContext } from "./ApolloWrapper.react";
import CashFlow from "./cashflow/CashFlow.react";
import ProfilePageReact from "./auth/ProfilePage.react";
import Loading from "./applet/Loading.react";

const App = () => {
  const { token, setToken } = useContext(TokenContext);
  const [loadingToken, setLoadingToken] = useState(true);

  const updateToken = (newToken) => {
    localStorage.setItem(AUTH_TOKEN, newToken);
    setToken(newToken);
  };

  // TODO: Make this not shitty
  const isAuth = token && token !== "null" && token !== "";

  const logout = () => {
    updateToken(null);
  };

  useEffect(() => {
    const newToken = localStorage.getItem(AUTH_TOKEN);
    setToken(newToken);
    setLoadingToken(false);
  }, []);

  return loadingToken ? (
    <Loading />
  ) : (
    <AuthContext.Provider value={{ isAuth, logout, updateToken }}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path="/"
            element={<AppletPage applet={<CashFlow />} title="Cash Flow" />}
          />
          <Route path="profile" element={<ProfilePageReact />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
