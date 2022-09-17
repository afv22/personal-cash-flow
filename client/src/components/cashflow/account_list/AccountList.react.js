import React from "react";
import AccountModal from "./AccountModal.react";
import { gql, useMutation } from "@apollo/client";
import { getRows, getColumns } from "./utils/processNodes";
import { processRowUpdate, onProcessRowUpdateError } from "./utils/rowUpdate";
import DataList from "../DataList.react";
import { GET_DATA } from "components/cashflow/CashFlow.react";

const UPDATE_NODE = gql`
  mutation UpdateNode($id: ID!, $name: String!, $initialValue: Float!) {
    updateNode(id: $id, data: { name: $name, initialValue: $initialValue }) {
      node {
        id
        name
        initialValue
      }
    }
  }
`;

export default ({ nodes }) => {
  const [updateNode, _] = useMutation(UPDATE_NODE, {
    refetchQueries: [{ query: GET_DATA }, "GetData"],
  });
  return (
    <DataList
      rows={getRows(nodes)}
      columns={getColumns()}
      processRowUpdate={(newRow) => processRowUpdate(newRow, updateNode)}
      onProcessRowUpdateError={onProcessRowUpdateError}
      buttonTitle="Add Node"
      Modal={AccountModal}
    />
  );
};
