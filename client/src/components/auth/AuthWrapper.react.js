import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import LoginReact from "./Login.react";
import SignUp from "./Signup.react";

const AuthWrapper = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState(true);
  if (isAuth) {
    return children;
  }
  return loginForm ? (
    <LoginReact toggleForm={() => setLoginForm(false)} />
  ) : (
    <SignUp toggleForm={() => setLoginForm(true)} />
  );
};

export default AuthWrapper;
