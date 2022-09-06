import React from "react";
import DeleteEdgeButton from "./../DeleteEdgeButton.react";

const edgeTypes = ["Percentage", "Amount", "Balance"];

const getColumns = (getDataQuery) => {
  return [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "source",
      headerName: "Source",
      width: 180,
      editable: false,
      valueGetter: (params) => params.row.source,
    },
    {
      field: "target",
      headerName: "Target",
      width: 180,
      editable: false,
      valueGetter: (params) => params.row.source,
    },
    {
      field: "type",
      headerName: "Type",
      editable: true,
      width: 120,
      type: "singleSelect",
      valueOptions: edgeTypes,
    },
    {
      field: "value",
      headerName: "Value",
      editable: true,
      valueGetter: (params) => params.row.value,
    },
    {
      field: "isTaxable",
      headerName: "Is Taxable",
      editable: true,
      type: "boolean",
    },
    {
      field: "delete",
      type: "actions",
      width: 60,
      getActions: (params) => [
        <DeleteEdgeButton params={params} getDataQuery={getDataQuery} />,
      ],
    },
  ];
};

const getRows = (edges) => {
  return edges.map((edge) => {
    var rowData = {
      id: edge.id,
      source: edge.sourceId,
      target: edge.targetId,
      isTaxable: edge.isTaxable,
    };

    if (edge.sourcePercentage) {
      rowData.type = edgeTypes[0];
      rowData.value = edge.sourcePercentage;
    } else if (edge.sourceAmount) {
      rowData.type = edgeTypes[1];
      rowData.value = edge.sourceAmount;
    } else {
      rowData.type = edgeTypes[2];
      rowData.value = "N/A";
    }

    return rowData;
  });
};

export { getColumns, getRows };
