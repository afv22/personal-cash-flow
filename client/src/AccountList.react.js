import React from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import Icon from "@mui/icons-material/BlurOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { gql, useMutation, useQuery } from "@apollo/client";
import CreateNodeForm from "./CreateNodeForm.react";

const DELETE_NODE = gql`
  mutation DeleteNode($nodeID: ID!) {
    deleteNode(id: $nodeID) {
      node {
        id
      }
    }
  }
`;

export default ({ nodes, getDataQuery }) => {
  const [deleteNode, { loading, error }] = useMutation(DELETE_NODE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const handleDelete = (nodeID) => {
    deleteNode({ variables: { nodeID: nodeID } });
  };

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error!</p>;
  }

  return (
    <Grid sx={[{ width: "300px" }]}>
      <Typography variant="h4" align="center">
        Accounts
      </Typography>
      <Divider />
      <List>
        {nodes.map((account) => (
          <ListItem key={account.id}>
            <ListItemAvatar>
              <Avatar>
                <Icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={account.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(account.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <CreateNodeForm getDataQuery={getDataQuery} />
    </Grid>
  );
};
