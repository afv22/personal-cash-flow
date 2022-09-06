import React from "react";
import { Delete } from "@mui/icons-material";
import { gql, useMutation } from "@apollo/client";
import { GridActionsCellItem } from "@mui/x-data-grid";

const DELETE_EDGE = gql`
  mutation DeleteEdge($id: ID!) {
    deleteEdge(id: $id) {
      edge {
        id
      }
    }
  }
`;

export default ({ params, getDataQuery }) => {
  const [deleteEdge, _] = useMutation(DELETE_EDGE, {
    refetchQueries: [{ query: getDataQuery }, "GetData"],
  });

  const onClick = () => {
    return deleteEdge({
      variables: {
        id: params.row.id,
      },
    });
  };

  return (
    <GridActionsCellItem icon={<Delete />} onClick={onClick} label="Delete" />
  );
};
