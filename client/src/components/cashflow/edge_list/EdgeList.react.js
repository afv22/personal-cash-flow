import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import EdgeModal from "./EdgeModal.react";
import { getColumns, getRows } from "./utils/processEdges";
import { processRowUpdate, onProcessRowUpdateError } from "./utils/rowUpdate";
import DataList from "../DataList.react";
import { DataQueryContext } from "../CashFlowApp.react";

const UPDATE_EDGE = gql`
  mutation UpdateEdge(
    $id: ID!
    $isTaxable: Boolean!
    $sourcePercentage: Float!
    $sourceAmount: Float!
    $sourceRemainingBalance: Boolean!
  ) {
    updateEdge(
      id: $id
      data: {
        isTaxable: $isTaxable
        sourcePercentage: $sourcePercentage
        sourceAmount: $sourceAmount
        sourceRemainingBalance: $sourceRemainingBalance
      }
    ) {
      edge {
        id
        sourceId
        targetId
        isTaxable
        sourcePercentage
        sourceAmount
        sourceRemainingBalance
      }
    }
  }
`;

export default ({ data }) => {
  const refreshData = useContext(DataQueryContext);
  const [updateEdge, _] = useMutation(UPDATE_EDGE, {
    refetchQueries: [{ query: refreshData }, "GetData"],
  });

  return (
    <DataList
      rows={getRows(data)}
      columns={getColumns()}
      processRowUpdate={(newRow) => processRowUpdate(newRow, updateEdge)}
      onProcessRowUpdateError={onProcessRowUpdateError}
      buttonTitle="Add Edge"
      Modal={EdgeModal}
    />
  );
};
