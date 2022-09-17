import React, { useContext, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AuthContext } from "./App.react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const FETCH_USER_DATA = gql`
  query FetchUserData {
    whoami {
      firstName
      lastName
      state
    }
  }
`;

const SideMenu = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_USER_DATA);

  const loggedOutMenu = (
    <Box
      sx={{ width: 250, textAlign: "center" }}
      role="presentation"
      onKeyDown={() => toggleDrawer(false)}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", paddingTop: 3 }}
      >
        <Button
          variant="contained"
          sx={{
            width: "80%",
          }}
          onClick={() => {
            navigate("/login");
            toggleDrawer(false);
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );

  if (!auth.isAuth || loading || error) {
    return loggedOutMenu;
  }

  return (
    <Box
      sx={{ width: 250, textAlign: "center" }}
      role="presentation"
      onKeyDown={() => toggleDrawer(false)}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", marginTop: 3, marginBottom: 3 }}
      >
        <Typography
          variant="h5"
          sx={{ width: "80%" }}
        >{`${data.whoami.firstName} ${data.whoami.lastName}`}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", paddingTop: 3 }}
      >
        <Button
          variant="contained"
          sx={{
            width: "80%",
          }}
          onClick={() => {
            auth.logout();
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default SideMenu;
