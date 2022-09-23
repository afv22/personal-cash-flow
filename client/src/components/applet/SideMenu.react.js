import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import AuthContext from "components/auth/AuthContext";
import { gql, useQuery } from "@apollo/client";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const FETCH_USER_DATA = gql`
  query FetchUserData {
    whoami {
      username
      firstName
      lastName
      state
    }
  }
`;

const SideMenu = ({ closeDrawer }) => {
  const { logout } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_USER_DATA);
  const navigate = useNavigate();

  const MenuButton = ({ buttonType, title, onClick }) => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", paddingTop: 3 }}
    >
      <Button
        variant={buttonType}
        sx={{
          width: "80%",
        }}
        onClick={onClick}
      >
        {title}
      </Button>
    </Box>
  );

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
            sx={{ width: "100%", marginTop: 3 }}
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
            sx={{ width: "100%", marginBottom: 3 }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "80%" }}
            >{`@${data.whoami.username}`}</Typography>
          </Box>
          <MenuButton
            buttonType="outlined"
            title="View Account"
            onClick={() => navigate("profile")}
          />
          <MenuButton
            buttonType="contained"
            title="Sign Out"
            onClick={() => {
              closeDrawer();
              logout();
            }}
          />
        </React.Fragment>
      )}
    </Box>
  );
};

export default SideMenu;
