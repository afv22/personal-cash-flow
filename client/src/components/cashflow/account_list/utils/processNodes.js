import React from "react";
import DeleteNodeButton from "../DeleteNodeButton.react";

const getRows = (nodes) => {
  return nodes.map((node) => {
    return {
      id: node.id,
      name: node.name,
      initialValue: node.initialValue,
    };
  });
};

const getColumns = () => {
  return [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "name", headerName: "Account name", width: 180, editable: true },
    {
      field: "initialValue",
      headerName: "Initial Value",
      width: 120,
      editable: true,
    },
    {
      field: "delete",
      type: "actions",
      width: 60,
      getActions: (params) => [<DeleteNodeButton params={params} />],
    },
  ];
};

export { getRows, getColumns };
