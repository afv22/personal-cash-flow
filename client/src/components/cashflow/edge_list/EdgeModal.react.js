import {
  Grid,
  TextField,
  Divider,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Modal, { ModalButton } from "../Modal.react";

const CREATE_EDGE_FORM_GET_ACCOUNT_NAMES = gql`
  query CreateEdgeFromGetAccountNames {
    userNodes {
      id
      name
    }
  }
`;

const CREATE_EDGE_FORM_CREATE_EDGE = gql`
  mutation CreateEdgeFormCreateEdge(
    $sourceID: ID!
    $targetID: ID!
    $isTaxable: Boolean!
    $sourcePercentage: Float!
    $sourceAmount: Float!
    $sourceRemainingBalance: Boolean!
  ) {
    createEdge(
      data: {
        sourceId: $sourceID
        targetId: $targetID
        isTaxable: $isTaxable
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

const inputStyle = {
  width: 160,
};

export default ({ open, setOpen, getDataQuery }) => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [edgeType, setEdgeType] = useState(0);
  const [edgeValue, setEdgeValue] = useState("");
  const [edgeIsTaxable, setEdgeIsTaxable] = useState(false);

  const edgeTypesMenu = ["Percentage", "Amount", "Remaining Balance"].map(
    (type, index) => (
      <MenuItem value={index} key={index}>
        {type}
      </MenuItem>
    )
  );

  const getAccountNamesResponse = useQuery(CREATE_EDGE_FORM_GET_ACCOUNT_NAMES);
  const [createEdge, _] = useMutation(CREATE_EDGE_FORM_CREATE_EDGE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const closeModal = () => {
    setSource("");
    setTarget("");
    setEdgeType(0);
    setEdgeValue("");
    setEdgeIsTaxable(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (source === "" || target === "") {
      return;
    }
    createEdge({
      variables: {
        sourceID: source,
        targetID: target,
        isTaxable: edgeIsTaxable,
        sourcePercentage: edgeType === 0 ? parseFloat(edgeValue) : 0,
        sourceAmount: edgeType === 1 ? parseFloat(edgeValue) : 0,
        sourceRemainingBalance: edgeType === 2,
      },
    });
    closeModal();
  };

  if (getAccountNamesResponse.loading) {
    return;
  }

  const accountsMenu = getAccountNamesResponse.data.userNodes.map((num) => (
    <MenuItem value={num.id} key={num.id}>
      {num.name}
    </MenuItem>
  ));

  return (
    <Modal open={open} closeModal={closeModal} title="Add Edge">
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Divider />
        </Grid>
        <Grid container direction="row" spacing={3} justifyContent="center">
          <Grid item>
            <Select
              style={inputStyle}
              value={source}
              onChange={(event) => setSource(event.target.value)}
            >
              {accountsMenu}
            </Select>
          </Grid>
          <Grid item>
            <Select
              style={inputStyle}
              value={target}
              onChange={(event) => setTarget(event.target.value)}
            >
              {accountsMenu}
            </Select>
          </Grid>
          <Grid item>
            <Select
              style={inputStyle}
              value={edgeType}
              label="Type"
              onChange={(event) => {
                setEdgeType(event.target.value);
                setEdgeValue("");
              }}
            >
              {edgeTypesMenu}
            </Select>
          </Grid>
          <Grid item>
            <TextField
              disabled={edgeType === 2}
              style={inputStyle}
              label={["%", "$", ""][edgeType]}
              variant="outlined"
              onChange={(event) => setEdgeValue(event.target.value)}
              value={edgeValue}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={edgeIsTaxable}
                onClick={() => setEdgeIsTaxable(!edgeIsTaxable)}
              />
            }
            label="Is Taxable"
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
            <ModalButton onClick={handleSubmit} title="Add Edge" />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};
