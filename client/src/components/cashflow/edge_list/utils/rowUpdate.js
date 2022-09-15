const processRowUpdate = async (newRow, updateEdge) => {
  // Setting the new value to 1 if switching from a balance
  if (
    newRow.value === "N/A" &&
    (newRow.type === "Percentage" || newRow.type === "Amount")
  ) {
    newRow.value = 1;
  }
  const vars = {
    id: newRow.id,
    isTaxable: newRow.isTaxable,
    sourcePercentage: newRow.type === "Percentage" ? newRow.value : 0,
    sourceAmount: newRow.type === "Amount" ? newRow.value : 0,
    sourceRemainingBalance: newRow.type === "Balance",
  };
  const response = await updateEdge({
    variables: vars,
  });
  return response.data.updateEdge.edge;
};

const onProcessRowUpdateError = (error) => {
  console.error(error);
};

export { processRowUpdate, onProcessRowUpdateError };
