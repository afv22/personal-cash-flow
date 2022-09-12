import React, { useState, useEffect, createContext } from "react";
import CashFlowApp from "./CashFlowApp.react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from "./constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReact from "./Login.react";

const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

const GET_USER = gql`
  query GetUser {
    whoami {
      id
      username
      firstName
      lastName
    }
  }
`;

const UserContext = createContext(null);

export default ({}) => {
  const [verifyToken, _verifyTokenResult] = useMutation(VERIFY_TOKEN);
  const [loadUser, result] = useLazyQuery(GET_USER);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const func = async () => {
      // Fetch the token from storage
      const token = localStorage.getItem(AUTH_TOKEN);
      if (!token) {
        return;
      }
      // Verify it's still valid
      const payload = await verifyToken({ variables: { token: token } });
      if (payload.data.verifyToken.payload === null) {
        return;
      }
      // Load the user's account
      const user = await loadUser();
      if (user.error) {
        console.error(user.error);
      } else {
        setUser(user.data.whoami);
      }
      console.log(result, user);
    };
    func();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CashFlowApp />}>
            <Route path="cashflow" element={<CashFlowApp />} />
          </Route>
          <Route path="/login" element={<LoginReact />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export { UserContext };
