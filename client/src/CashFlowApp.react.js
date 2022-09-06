import React from "react";
import SankeyDiagram from "./diagram/SankeyDiagram.react";
import AccountList from "./account_list/AccountList.react";
import { gql, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import EdgeList from "./edge_list/EdgeList";

const GET_DATA = gql`
  query GetData {
    allNodes {
      id
      name
      initialValue
      netValue
    }
    allEdges {
      id
      sourceId
      targetId
      value
      isTaxable
      sourcePercentage
      sourceAmount
      sourceRemainingBalance
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
    <Grid container direction="column" alignItems="center" spacing={8}>
      <SankeyDiagram data={data} />
      <Grid item>
        <AccountList nodes={data.allNodes} getDataQuery={GET_DATA} />
      </Grid>
      <Grid item>
        <EdgeList edges={data.allEdges} getDataQuery={GET_DATA} />
      </Grid>
    </Grid>
  );
};
