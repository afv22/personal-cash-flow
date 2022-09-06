import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AccountModal from "./AccountModal.react";
import { DataGrid } from "@mui/x-data-grid";
import { gql, useMutation } from "@apollo/client";
import DeleteNodeButton from "./DeleteNodeButton.react";

const UPDATE_NODE = gql`
  mutation UpdateNode($id: ID!, $name: String!, $initialValue: Float!) {
    updateNode(id: $id, data: { name: $name, initialValue: $initialValue }) {
      node {
        id
        name
        initialValue
      }
    }
  }
`;

const getRows = (nodes) => {
  return nodes.map((node) => {
    return {
      id: node.id,
      name: node.name,
      initialValue: node.initialValue,
    };
  });
};

const getColumns = (getDataQuery) => {
  return [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Account name", width: 180, editable: true },
    {
      field: "initialValue",
      headerName: "Initial Value",
      width: 120,
      editable: true,
    },
    {
      field: "delete",
      type: "actions",
      width: 60,
      getActions: (params) => [
        <DeleteNodeButton params={params} getDataQuery={getDataQuery} />,
      ],
    },
  ];
};

export default ({ nodes, getDataQuery }) => {
  const [updateNode, _] = useMutation(UPDATE_NODE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const [modalOpen, setModalOpen] = useState(false);

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      const response = await updateNode({
        variables: {
          id: newRow.id,
          name: newRow.name,
          initialValue: newRow.initialValue,
        },
      });
      return response.data.updateNode.node;
    },
    [setModalOpen]
  );

  const onProcessRowUpdateError = (error) => {
    console.error(error);
  };

  return (
    <Box sx={{ height: 400, width: 900 }}>
      <DataGrid
        rows={getRows(nodes)}
        columns={getColumns(getDataQuery)}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
      />
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Create New Node
      </Button>
      <AccountModal
        open={modalOpen}
        setOpen={setModalOpen}
        getDataQuery={getDataQuery}
      />
    </Box>
  );
};
