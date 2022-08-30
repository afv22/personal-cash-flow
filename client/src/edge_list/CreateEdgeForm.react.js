import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
    $isPercentage: Boolean!
    $amount: Float!
  ) {
    createEdge(
      data: {
        sourceId: $sourceID
        targetId: $targetID
        isPercentage: $isPercentage
        amount: $amount
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
  const [isPercentage, setIsPercentage] = useState(false);
  const [amount, setAmount] = useState("");

  const getAccountNamesResponse = useQuery(CREATE_EDGE_FORM_GET_ACCOUNT_NAMES);
  const [createEdge, _] = useMutation(CREATE_EDGE_FORM_CREATE_EDGE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const handleSubmit = () => {
    if (source == "" || target == "") {
      return;
    }
    createEdge({
      variables: {
        sourceID: source,
        targetID: target,
        isPercentage: isPercentage,
        amount: amount,
      },
    });
    setSource("");
    setTarget("");
    setIsPercentage(false);
    setAmount("");
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
            label="Source"
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
            label="Target"
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
          <FormControlLabel
            control={
              <Checkbox
                value={isPercentage}
                onChange={() => setIsPercentage(!isPercentage)}
              />
            }
            label="Percentage"
          />
        </Grid>
        <Grid item>
          <TextField
            style={{ width: 160 }}
            id="create-edge-amount-input"
            label="Amount"
            variant="outlined"
            onChange={(event) => setAmount(event.target.value)}
            value={amount}
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
