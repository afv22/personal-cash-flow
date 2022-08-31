import React from "react";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { Delete } from "@mui/icons-material";
import { formatUSD } from "../helpers";

const EDGE_LIST_DELETE_EDGE = gql`
  mutation EdgeListDeleteEdge($edgeID: ID!) {
    deleteEdge(id: $edgeID) {
      edge {
        id
      }
    }
  }
`;

export default ({ edge, sourceName, targetName, getDataQuery }) => {
  const [deleteEdge, _] = useMutation(EDGE_LIST_DELETE_EDGE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const handleDelete = (edgeID) => {
    deleteEdge({ variables: { edgeID: edgeID } });
  };

  var value;
  if (edge.sourcePercentage) {
    value = edge.sourcePercentage + "%";
  } else if (edge.sourceAmount) {
    value = formatUSD(edge.sourceAmount);
  } else {
    value = "Balance";
  }

  return (
    <Card key={edge.id}>
      <Grid container direction="column" columnSpacing={6}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          rowSpacing={20}
        >
          <Grid item>
            <Typography component="div" variant="h6">
              {sourceName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div" variant="h6">
              {targetName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="space-evenly">
        <Grid item>
          <Typography variant="subtitle1">{value}</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => handleDelete(edge.id)}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};
