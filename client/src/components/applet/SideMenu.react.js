import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AuthContext } from "../App.react";
import { gql, useQuery } from "@apollo/client";
import { BeatLoader } from "react-spinners";

const FETCH_USER_DATA = gql`
  query FetchUserData {
    whoami {
      firstName
      lastName
      state
    }
  }
`;

const SideMenu = ({ closeDrawer }) => {
  const auth = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_USER_DATA);

  return (
    <Box
      sx={{ width: 250, textAlign: "center" }}
      role="presentation"
      onKeyDown={closeDrawer}
    >
      {loading ? (
        <Box sx={{ marginTop: 10 }}>
          <BeatLoader />
        </Box>
      ) : (
        <React.Fragment>
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
                closeDrawer();
                auth.logout();
              }}
            >
              Sign Out
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default SideMenu;
