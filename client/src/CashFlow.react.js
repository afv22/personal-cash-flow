import React from "react";
import SankeyDiagram from "./SankeyDiagram.react";
import AccountList from "./AccountList.react";
import { gql, useQuery } from "@apollo/client";
import { Divider, Grid } from "@mui/material";

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

export default (props) => {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error!</p>;
  }

  console.log(data);

  return (
    <Grid container direction="column" alignItems="center">
      <SankeyDiagram data={data} />
      <AccountList nodes={data.allNodes} getDataQuery={GET_DATA} />
    </Grid>
  );
};
