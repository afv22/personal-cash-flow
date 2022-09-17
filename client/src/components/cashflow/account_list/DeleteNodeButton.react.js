import React from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { gql, useMutation } from "@apollo/client";
import { GET_DATA } from "components/cashflow/CashFlow.react";

const DELETE_NODE = gql`
  mutation DeleteNode($id: ID!) {
    deleteNode(id: $id) {
      success
    }
  }
`;

export default ({ params }) => {
  const [deleteNode, _] = useMutation(DELETE_NODE, {
    refetchQueries: [{ query: GET_DATA }, "GetData"],
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
