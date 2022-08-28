import React from "react";
import SankeyDiagram from "./SankeyDiagram.react";
import { QueryData } from "./Apollo";
import { Grid } from "@mui/material";

export default (props) => {
  const { loading, error, data } = QueryData();
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error!</p>;
  }

  return (
    <Grid container direction="column" alignItems="center">
      <SankeyDiagram data={data} />
    </Grid>
  );
};
