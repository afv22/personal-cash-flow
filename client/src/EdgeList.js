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
import { gql, useMutation } from "@apollo/client";

const DELETE_EDGE = gql`
  mutation DeleteEdge($edgeID: ID!) {
    deleteEdge(id: $edgeID) {
      edge {
        id
      }
    }
  }
`;

export default ({ edges, getDataQuery }) => {
  return (
    <Grid sx={[{ width: "300px" }]}>
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
            <ListItemText primary={edge.id} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
