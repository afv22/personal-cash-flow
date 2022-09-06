import React from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { gql, useMutation } from "@apollo/client";

const DELETE_NODE = gql`
  mutation DeleteNode($id: ID!) {
    deleteNode(id: $id) {
      node {
        id
      }
    }
  }
`;

export default ({ params, getDataQuery }) => {
  const [deleteNode, _] = useMutation(DELETE_NODE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const onClick = () => {
    return deleteNode({
      variables: {
        id: params.row.id,
      },
    });
  };

  return (
    <IconButton onClick={onClick}>
      <Delete />
    </IconButton>
  );
};
