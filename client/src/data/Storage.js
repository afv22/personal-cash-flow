import Edges from "./edges.json";
import Nodes from "./nodes.json";
import { Node, Edge } from "./DataType";

const fetchNodes = (uid) => {
  return Object.entries(Nodes).map((entry) => {
    const [nodeID, node] = entry;
    return new Node(nodeID, node.label, uid, node.initialValue);
  });
};

const fetchEdges = (uid) => {
  return Object.entries(Edges).map((entry) => {
    const [edgeID, edge] = entry;
    return new Edge(
      parseInt(edgeID),
      edge.sourceId,
      edge.targetId,
      edge.isPercentage,
      edge.amount
    );
  });
};

export { fetchEdges, fetchNodes };
