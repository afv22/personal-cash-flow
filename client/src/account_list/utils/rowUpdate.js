const processRowUpdate = async (newRow, updateNode) => {
  console.log(newRow);
  const response = await updateNode({
    variables: {
      id: newRow.id,
      name: newRow.name,
      initialValue: newRow.initialValue,
    },
  });
  console.log(response);
  return response.data.updateNode.node;
};

const onProcessRowUpdateError = (error) => {
  console.error(error);
};

export { processRowUpdate, onProcessRowUpdateError };
