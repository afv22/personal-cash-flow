const processRowUpdate = async (newRow, updateNode) => {
  const response = await updateNode({
    variables: {
      id: newRow.id,
      name: newRow.name,
      initialValue: newRow.initialValue,
    },
  });
  return response.data.updateNode.node;
};

const onProcessRowUpdateError = (error) => {
  console.error(error);
};

export { processRowUpdate, onProcessRowUpdateError };
