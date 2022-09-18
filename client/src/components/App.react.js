import React, { useContext, useEffect } from "react";
import { AUTH_TOKEN } from "../constants";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppletPage from "./applet/AppletPage.react";
import AuthContext from "./auth/AuthContext";
import { TokenContext } from "./ApolloWrapper.react";
import CashFlow from "./cashflow/CashFlow.react";

const App = () => {
  const { token, setToken } = useContext(TokenContext);

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
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, logout, updateToken }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<AppletPage applet={<CashFlow />} title="Cash Flow" />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;

export { AuthContext };
