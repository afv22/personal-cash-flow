import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { gql, useMutation } from "@apollo/client";
import { DataQueryContext } from "components/cashflow/CashFlowApp.react";

const DELETE_NODE = gql`
  mutation DeleteNode($id: ID!) {
    deleteNode(id: $id) {
      success
    }
  }
`;

export default ({ params }) => {
  const refreshData = useContext(DataQueryContext);
  const [deleteNode, _] = useMutation(DELETE_NODE, {
    refetchQueries: [{ query: refreshData }, "GetData"],
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
