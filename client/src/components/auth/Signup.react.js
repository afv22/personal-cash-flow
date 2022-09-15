import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation REGISTER_USER(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      errors
    }
  }
`;

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const isAuth = useContext(AuthContext);
  const [registerUser, _] = useMutation(REGISTER_USER);

  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [passwordsMismatch, setPasswordsMismatch] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await registerUser({
      variables: {
        email: email,
        username: username,
        password1: password1,
        password2: password2,
      },
    });

    if (response.error) {
      console.log(response.error);
      return;
    }

    setUsername("");
    setEmail("");
    setPassword1("");
    setPassword2("");

    navigate("/login");
  };

  useEffect(() => {
    setSubmitDisabled(
      [username, email, password1, password2].includes("") || passwordsMismatch
    );
  }, [username, email, password1, password2, passwordsMismatch]);

  if (isAuth.isAuth) {
    navigate("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Password"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setPassword1(event.target.value);
                    setPasswordsMismatch(password2 !== event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  focused={passwordsMismatch}
                  name="password2"
                  label="Re-enter Password"
                  type="password2"
                  id="password"
                  autoComplete="new-password"
                  color={passwordsMismatch ? "error" : "info"}
                  onChange={(event) => {
                    setPassword2(event.target.value);
                    setPasswordsMismatch(password1 !== event.target.value);
                  }}
                />
              </Grid>
              {passwordsMismatch ? (
                <Grid item xs={12}>
                  <Typography variant="body2" color="error">
                    Passwords do not match
                  </Typography>
                </Grid>
              ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={submitDisabled}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
