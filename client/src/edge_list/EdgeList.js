import React, { useState } from "react";
import { Button, List, Grid, Typography, Divider } from "@mui/material";
import { gql, useLazyQuery } from "@apollo/client";
import EdgeCard from "./EdgeCard.react";
import EdgeModal from "./EdgeModal.react";

const EDGE_LIST_GET_ACCOUNT_NAMES = gql`
  query EdgeListGetAccountNames($nodeIds: [Int!]!) {
    nodes(nodeIds: $nodeIds) {
      id
      name
    }
  }
`;

export default ({ edges, getDataQuery }) => {
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
    <Grid sx={[{ width: "400px" }]}>
      <Typography variant="h4" align="center">
        Edges
      </Typography>
      <Divider variant="middle" />
      <List>
        {edges.map((edge) => (
          <EdgeCard
            edge={edge}
            sourceName={accountNames[edge.sourceId]}
            targetName={accountNames[edge.targetId]}
            getDataQuery={getDataQuery}
          />
        ))}
      </List>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Create New Edge
      </Button>
      <EdgeModal
        open={modalOpen}
        setOpen={setModalOpen}
        getDataQuery={getDataQuery}
      />
    </Grid>
  );
};
