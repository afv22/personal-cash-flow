import React from "react";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { formatUSD } from "../helpers";

const DELETE_NODE = gql`
  mutation DeleteNode($nodeID: ID!) {
    deleteNode(id: $nodeID) {
      node {
        id
      }
    }
  }
`;

export default ({ account, getDataQuery }) => {
  const [deleteNode, _] = useMutation(DELETE_NODE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const handleDelete = (nodeID) => {
    deleteNode({ variables: { nodeID: nodeID } });
  };

  return (
    <Card sx={{ display: "flex" }} key={account.id}>
      <Grid container direction="row">
        <CardContent sx={{ flex: "1 0 auto", width: "70%" }}>
          <Typography component="div" variant="h6">
            {account.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Income: {formatUSD(account.initialValue)}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Balance: {formatUSD(account.netValue)}
          </Typography>
        </CardContent>
        <IconButton onClick={() => handleDelete(account.id)}>
          <Delete />
        </IconButton>
      </Grid>
    </Card>
  );
};
