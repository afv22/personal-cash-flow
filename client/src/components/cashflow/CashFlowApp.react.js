import React, { createContext, useContext } from "react";
import SankeyDiagram from "./diagram/SankeyDiagram.react";
import AccountList from "./account_list/AccountList.react";
import { gql, useQuery } from "@apollo/client";
import { Grid, Typography } from "@mui/material";
import EdgeList from "./edge_list/EdgeList.react";
import { AuthContext } from "components/App.react";

const GET_DATA = gql`
  query GetData {
    userNodes {
      id
      name
      initialValue
      netValue
    }
    userEdges {
      id
      sourceId
      targetId
      value
      taxes
      isTaxable
      sourcePercentage
      sourceAmount
      sourceRemainingBalance
    }
  }
`;

const DataQueryContext = createContext();

export default () => {
  const auth = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error!</p>;
  }

  return (
    <DataQueryContext.Provider value={GET_DATA}>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={8}
        paddingBottom={20}
      >
        <Typography variant="h2" marginTop={15}>
          Cash Flow
        </Typography>
        <SankeyDiagram data={data} />
        <Grid item>
          <AccountList nodes={data.userNodes} />
        </Grid>
        <Grid item>
          <EdgeList data={data} />
        </Grid>
      </Grid>
    </DataQueryContext.Provider>
  );
};

export { DataQueryContext };
