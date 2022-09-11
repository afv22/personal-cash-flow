import React, { useState, useEffect } from "react";
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

export default ({}) => {
  const [verifyToken, _verifyTokenResult] = useMutation(VERIFY_TOKEN);
  const [loadUser, result] = useLazyQuery(GET_USER);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const func = async () => {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (!token) {
        return;
      }
      const payload = await verifyToken({ variables: { token: token } });
      if (payload.data.verifyToken.payload === null) {
        return;
      }
      const user = await loadUser();
      console.log(result, user);
    };
    func();
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CashFlowApp />} user={user} />
        <Route path="/login" element={<LoginReact />} />
      </Routes>
    </BrowserRouter>
  );
};
