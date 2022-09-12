import React, { createContext, useContext } from "react";
import SankeyDiagram from "./diagram/SankeyDiagram.react";
import AccountList from "./account_list/AccountList.react";
import { gql, useQuery } from "@apollo/client";
import { Grid, Typography } from "@mui/material";
import EdgeList from "./edge_list/EdgeList.react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";
import { UserContext } from "./App.react";

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
      taxes
      isTaxable
      sourcePercentage
      sourceAmount
      sourceRemainingBalance
    }
  }
`;

const DataQueryContext = createContext();

export default ({}) => {
  // const navigate = useNavigate();
  // if (!localStorage.getItem(AUTH_TOKEN)) {
  //   navigate("/login");
  // }
  const user = useContext(UserContext).user;
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error!</p>;
  }

  return (
    <DataQueryContext.Provider value={GET_DATA}>
      <Typography variant="subtitle1">
        User: {user.firstName} {user.lastName}
      </Typography>
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
          <AccountList nodes={data.allNodes} />
        </Grid>
        <Grid item>
          <EdgeList data={data} />
        </Grid>
      </Grid>
    </DataQueryContext.Provider>
  );
};

export { DataQueryContext };
