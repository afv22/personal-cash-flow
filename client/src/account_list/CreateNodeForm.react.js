import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

const CREATE_NODE = gql`
  mutation CreateNode($name: String!, $initialValue: Float!) {
    createNode(data: { name: $name, initialValue: $initialValue }) {
      node {
        id
      }
    }
  }
`;

export default ({ getDataQuery }) => {
  const [name, setName] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [createNode, _] = useMutation(CREATE_NODE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });
  const handleSubmit = () => {
    if (name == "") {
      return;
    }
    createNode({
      variables: {
        name: name,
        initialValue: parseFloat(initialValue != "" ? initialValue : 0),
      },
    });
    setName("");
    setInitialValue("");
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid item>
        <TextField
          id="create-node-name-input"
          label="Name"
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </Grid>
      <Grid item>
        <TextField
          id="create-node-name-input"
          label="Initial Value"
          variant="outlined"
          onChange={(event) => setInitialValue(event.target.value)}
          value={initialValue}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={[{ width: "100%" }]}
        >
          Add Node
        </Button>
      </Grid>
    </Grid>
  );
};
