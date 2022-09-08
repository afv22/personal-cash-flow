import React, { useContext } from "react";
import AccountModal from "./AccountModal.react";
import { gql, useMutation } from "@apollo/client";
import { getRows, getColumns } from "./utils/processNodes";
import { processRowUpdate, onProcessRowUpdateError } from "./utils/rowUpdate";
import DataList from "../components/DataList.react";
import { DataQueryContext } from "../CashFlowApp.react";

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
  const refreshData = useContext(DataQueryContext);
  const [updateNode, _] = useMutation(UPDATE_NODE, {
    refetchQueries: [{ query: refreshData }, "GetData"],
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
