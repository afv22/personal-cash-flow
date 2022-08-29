import React, { useEffect } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mui/icons-material/BlurOn";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import CreateEdgeFormReact from "./CreateEdgeForm.react";

const EDGE_LIST_DELETE_EDGE = gql`
  mutation EdgeListDeleteEdge($edgeID: ID!) {
    deleteEdge(id: $edgeID) {
      edge {
        id
      }
    }
  }
`;

const EDGE_LIST_GET_ACCOUNT_NAMES = gql`
  query EdgeListGetAccountNames($nodeIds: [Int!]!) {
    nodes(nodeIds: $nodeIds) {
      id
      name
    }
  }
`;

export default ({ edges, getDataQuery }) => {
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

  const [deleteEdge, _] = useMutation(EDGE_LIST_DELETE_EDGE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const handleDelete = (edgeID) => {
    deleteEdge({ variables: { edgeID: edgeID } });
  };

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
  } else {
    data.nodes.map((node) => (accountNames[node.id] = node.name));
  }

  return (
    <Grid sx={[{ width: "400px" }]}>
      <Typography variant="h4" align="center">
        Edges
      </Typography>
      <Divider />
      <List>
        {edges.map((edge) => (
          <ListItem key={edge.id}>
            <ListItemAvatar>
              <Avatar>
                <Icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={accountNames[edge.sourceId]} />
            <ListItemText
              primary={accountNames[edge.targetId]}
              edge="end"
              style={{ display: "flex", justifyContent: "flex-end" }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => {}}>
                <DeleteIcon onClick={() => handleDelete(edge.id)} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <CreateEdgeFormReact getDataQuery={getDataQuery} />
    </Grid>
  );
};
