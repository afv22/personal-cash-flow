import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import EdgeModal from "./EdgeModal.react";
import { DataGrid } from "@mui/x-data-grid";
import { getColumns, getRows } from "./utils/processEdges";
import {
  processRowUpdate,
  onProcessRowUpdateError,
  UPDATE_EDGE,
} from "./utils/rowUpdate";

const EDGE_LIST_GET_ACCOUNT_NAMES = gql`
  query EdgeListGetAccountNames($nodeIds: [Int!]!) {
    nodes(nodeIds: $nodeIds) {
      id
      name
    }
  }
`;

export default ({ edges, getDataQuery }) => {
  const [updateEdge, _] = useMutation(UPDATE_EDGE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const [modalOpen, setModalOpen] = useState(false);

  const accountsWithEdgesIDs = edges
    .map((edge) => [edge.sourceId, edge.targetId])
    .flat()
    .filter((value, index, self) => self.indexOf(value) === index);

  const [getAccountNames, { loading, error, data }] = useLazyQuery(
    EDGE_LIST_GET_ACCOUNT_NAMES,
    {
      variables: { nodeIds: accountsWithEdgesIDs },
    }
  );

  // This feels wrong, I don't think I should refetch the query whenever
  // there's no data. Fix this.
  const accountNames = {};
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error!</p>;
  } else if (!data) {
    getAccountNames();
    return <p>Loading...</p>;
  } else if ("nodes" in data) {
    data.nodes.map((node) => (accountNames[node.id] = node.name));
  } else {
    return <p>Error #2!</p>;
  }

  return (
    <Box sx={{ height: 400, width: 900 }}>
      <DataGrid
        rows={getRows(edges)}
        columns={getColumns(getDataQuery)}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={(newRow) => processRowUpdate(newRow, updateEdge)}
        onProcessRowUpdateError={onProcessRowUpdateError}
      />
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Create New Edge
      </Button>
      <EdgeModal
        open={modalOpen}
        setOpen={setModalOpen}
        getDataQuery={getDataQuery}
      />
    </Box>
  );
};
