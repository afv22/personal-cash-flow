import React, { useState, useEffect, createContext } from "react";
import CashFlowApp from "./CashFlowApp.react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import { AUTH_TOKEN } from "./constants";
import LoginReact from "./Login.react";

const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

export default ({}) => {
  const [verifyToken, _verifyTokenResult] = useMutation(VERIFY_TOKEN);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const func = async () => {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (!token) {
        return;
      }
      const payload = await verifyToken({ variables: { token: token } });
      setIsAuth(payload.data.verifyToken.payload !== null);
    };
    func();
  }, []);

  return isAuth ? <CashFlowApp /> : <LoginReact />;
};
