import React from "react";
import SankeyDiagram from "./SankeyDiagram.react";
import AccountList from "./AccountList.react";
import { gql, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import EdgeList from "./EdgeList";

const GET_DATA = gql`
  query GetData {
    allNodes {
      id
      name
    }
    allEdges {
      id
      sourceId
      targetId
    }
  }
`;

export default ({}) => {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error!</p>;
  }

  return (
    <Grid container direction="column" alignItems="center">
      <SankeyDiagram data={data} />
      <Grid container justifyContent="center" spacing={12}>
        <Grid item>
          <AccountList nodes={data.allNodes} getDataQuery={GET_DATA} />
        </Grid>
        <Grid item>
          <EdgeList edges={data.allEdges} getDataQuery={GET_DATA} />
        </Grid>
      </Grid>
    </Grid>
  );
};
