import { Grid, TextField, Divider } from "@mui/material";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Modal, { ModalButton } from "components/cashflow/Modal.react";

const CREATE_NODE = gql`
  mutation CreateNode($name: String!, $initialValue: Float!) {
    createNode(data: { name: $name, initialValue: $initialValue }) {
      node {
        id
      }
    }
  }
`;

export default ({ open, setOpen, getDataQuery }) => {
  const [name, setName] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [createNode, _] = useMutation(CREATE_NODE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const closeModal = () => {
    setName("");
    setInitialValue("");
    setOpen(false);
  };

  const handleSubmit = () => {
    if (name === "") {
      return;
    }
    createNode({
      variables: {
        name: name,
        initialValue: parseFloat(initialValue !== "" ? initialValue : 0),
      },
    });
    closeModal();
  };

  return (
    <Modal open={open} closeModal={closeModal} title="Add Node">
      <Grid container direction="column" alignItems="center" spacing={2}>
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
          <Divider />
        </Grid>
        <Grid container direction="row" spacing={2} justifyContent="center">
          <Grid item>
            <ModalButton onClick={closeModal} title="Cancel" />
          </Grid>
          <Grid item>
            <ModalButton onClick={handleSubmit} title="Add Node" />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};
