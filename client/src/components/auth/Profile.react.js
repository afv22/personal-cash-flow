import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { IconButton, MenuItem, Select } from "@mui/material";
import { ArrowBack, Person } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loading from "components/applet/Loading.react";
import { useNavigate } from "react-router-dom";
import StateNames from "./utils/StateNames";

const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String!
    $lastName: String!
    $state: String!
  ) {
    updateUser(
      data: { firstName: $firstName, lastName: $lastName, state: $state }
    ) {
      success
    }
  }
`;

const FETCH_USER_DATA = gql`
  query FetchUserData {
    whoami {
      firstName
      lastName
      state
    }
  }
`;

const styles = {
  backButton: { top: 20, left: 20 },
  avatar: { m: 1, bgcolor: "secondary.main" },
  formBox: { mt: 3 },
  submitButton: { mt: 3, mb: 2 },
};

export default () => {
  const navigate = useNavigate();
  const updateUser = useMutation(UPDATE_USER)[0];
  const FetchUserDataResponse = useQuery(FETCH_USER_DATA);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    state: "",
  });

  const handleChange = (event) => {
    var newFormData = { ...formData };
    switch (event.target.name) {
      case "firstName":
        newFormData.firstName = event.target.value;
        break;
      case "lastName":
        newFormData.lastName = event.target.value;
        break;
      case "state":
        newFormData.state = event.target.value;
    }
    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    updateUser({
      variables: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        state: formData.state,
      },
    });
  };

  useEffect(() => {
    if (!FetchUserDataResponse.data) {
      return;
    }
    setFormData(FetchUserDataResponse.data.whoami);
  }, [FetchUserDataResponse.data]);

  if (FetchUserDataResponse.loading) {
    return <Loading />;
  } else if (FetchUserDataResponse.error) {
    return <p>Error!</p>;
  }

  return (
    <React.Fragment>
      <IconButton
        onClick={() => navigate("/")}
        size="large"
        sx={styles.backButton}
      >
        <ArrowBack />
      </IconButton>
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
          <Avatar sx={styles.avatar}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5"></Typography>
          <Box sx={styles.formBox}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  fullWidth
                  required
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  {StateNames.map((state) => (
                    <MenuItem
                      value={state.abbreviation}
                      key={state.abbreviation}
                    >
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.submitButton}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};
