import React from "react";
import {
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { Delete, Save } from "@mui/icons-material";
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

  const edgeTypes = ["Percentage", "Amount", "Remaining Balance"];

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
        <Grid container direction="row" justifyContent="space-evenly">
          <Grid item>
            <Select
              style={{ width: 160 }}
              labelId="create-edge-select-type-label"
              id="create-edge-select-type"
              value={0}
              label="Type"
              onChange={(event) => {}}
            >
              {edgeTypes.map((type, index) => (
                <MenuItem value={index} key={index}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{value}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-evenly">
          <Grid item>
            <IconButton onClick={() => handleDelete(edge.id)}>
              <Save />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleDelete(edge.id)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
