import React from "react";
import { List, Grid, Typography, Divider } from "@mui/material";
import AccountCard from "./AccountCard.react";
import CreateNodeForm from "./CreateNodeForm.react";

export default ({ nodes, getDataQuery }) => {
  return (
    <Grid sx={[{ width: "300px" }]}>
      <Typography variant="h4" align="center">
        Accounts
      </Typography>
      <Divider />
      <List>
        {nodes.map((account) => (
          <AccountCard account={account} getDataQuery={getDataQuery} />
        ))}
      </List>
      <CreateNodeForm getDataQuery={getDataQuery} />
    </Grid>
  );
};
