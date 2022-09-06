import React, { useState } from "react";
import { Button, List, Grid, Typography, Divider } from "@mui/material";
import AccountCard from "./AccountCard.react";
import AccountModal from "./AccountModal.react";

export default ({ nodes, getDataQuery }) => {
  const [modalOpen, setModalOpen] = useState(false);
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
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Create New Node
      </Button>
      <AccountModal
        open={modalOpen}
        setOpen={setModalOpen}
        getDataQuery={getDataQuery}
      />
    </Grid>
  );
};
