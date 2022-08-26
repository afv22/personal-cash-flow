import React, { useEffect, useState } from "react";
import SankeyDiagram from "./SankeyDiagram.react";
import { fetchEdges, fetchNodes } from "./data/Storage";

export default (props) => {
  const [userID, setUserID] = useState(1);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  useEffect(() => {
    setNodes(fetchNodes(userID));
    setEdges(fetchEdges(userID));
  }, []);
  return <SankeyDiagram nodes={nodes} edges={edges} />;
};
