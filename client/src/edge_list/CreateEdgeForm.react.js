import React, { useState } from "react";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";

const CREATE_EDGE_FORM_GET_ACCOUNT_NAMES = gql`
  query CreateEdgeFromGetAccountNames {
    allNodes {
      id
      name
    }
  }
`;

const CREATE_EDGE_FORM_CREATE_EDGE = gql`
  mutation CreateEdgeFormCreateEdge(
    $sourceID: ID!
    $targetID: ID!
    $sourcePercentage: Float!
    $sourceAmount: Float!
    $sourceRemainingBalance: Boolean!
  ) {
    createEdge(
      data: {
        sourceId: $sourceID
        targetId: $targetID
        sourcePercentage: $sourcePercentage
        sourceAmount: $sourceAmount
        sourceRemainingBalance: $sourceRemainingBalance
      }
    ) {
      edge {
        id
      }
    }
  }
`;

export default ({ getDataQuery }) => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [edgeType, setEdgeType] = useState(0);
  const [edgeValue, setEdgeValue] = useState("");

  const edgeTypes = ["Percentage", "Amount", "Remaining Balance"];

  const getAccountNamesResponse = useQuery(CREATE_EDGE_FORM_GET_ACCOUNT_NAMES);
  const [createEdge, _] = useMutation(CREATE_EDGE_FORM_CREATE_EDGE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const handleSubmit = () => {
    if (source == "" || target == "") {
      return;
    }
    var variables = {
      sourceID: source,
      targetID: target,
      sourcePercentage: edgeType == 0 ? edgeValue : 0,
      sourceAmount: edgeType == 1 ? edgeValue : 0,
      sourceRemainingBalance: edgeType == 2,
    };
    createEdge({
      variables: variables,
    });
    setSource("");
    setTarget("");
    setEdgeType(0);
    setEdgeValue("");
  };

  if (getAccountNamesResponse.loading) {
    return;
  }

  const accounts = getAccountNamesResponse.data.allNodes;
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid container direction="row" spacing={3} justifyContent="center">
        <Grid item>
          <Select
            style={{ width: 160 }}
            labelId="create-edge-select-source-label"
            id="create-edge-select-source"
            value={source}
            onChange={(event) => setSource(event.target.value)}
          >
            {accounts.map((num) => (
              <MenuItem value={num.id} key={num.id}>
                {num.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select
            style={{ width: 160 }}
            labelId="create-edge-select-target-label"
            id="create-edge-select-target"
            value={target}
            onChange={(event) => {
              setTarget(event.target.value);
            }}
          >
            {accounts.map((num) => (
              <MenuItem value={num.id} key={num.id}>
                {num.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select
            style={{ width: 160 }}
            labelId="create-edge-select-type-label"
            id="create-edge-select-type"
            value={edgeType}
            label="Type"
            onChange={(event) => {
              setEdgeType(event.target.value);
              setEdgeValue("");
            }}
          >
            {edgeTypes.map((type, index) => (
              <MenuItem value={index} key={index}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <TextField
            disabled={edgeType == 2}
            style={{ width: 160 }}
            id="create-edge-value-input"
            label={["%", "$", ""][edgeType]}
            variant="outlined"
            onChange={(event) => setEdgeValue(event.target.value)}
            value={edgeValue}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={[{ width: "100%" }]}
        >
          Add Edge
        </Button>
      </Grid>
    </Grid>
  );
};
