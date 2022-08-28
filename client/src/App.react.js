import React, { useEffect, useState } from "react";
import SankeyDiagram from "./SankeyDiagram.react";
import { fetchEdges, fetchNodes } from "./data/Storage";
import { useQuery, gql } from "@apollo/client";

export default (props) => {
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
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error!</p>;
  } else {
    return <SankeyDiagram data={data} />;
  }
};
