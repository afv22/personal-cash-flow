import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AccountModal from "./AccountModal.react";
import { DataGrid } from "@mui/x-data-grid";
import { gql, useMutation } from "@apollo/client";
import { getRows, getColumns } from "./utils/processNodes";
import { processRowUpdate, onProcessRowUpdateError } from "./utils/rowUpdate";

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

export default ({ nodes, getDataQuery }) => {
  const pageSizes = [10, 20, 50];
  const [modalOpen, setModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [updateNode, _] = useMutation(UPDATE_NODE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  return (
    <Box sx={{ height: 400, width: 900 }}>
      <DataGrid
        rows={getRows(nodes)}
        columns={getColumns(getDataQuery)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={pageSizes}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={(newRow) => processRowUpdate(newRow, updateNode)}
        onProcessRowUpdateError={onProcessRowUpdateError}
      />
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Add Node
      </Button>
      <AccountModal
        open={modalOpen}
        setOpen={setModalOpen}
        getDataQuery={getDataQuery}
      />
    </Box>
  );
};
