import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default ({
  rows,
  columns,
  processRowUpdate,
  onProcessRowUpdateError,
  buttonTitle,
  Modal,
}) => {
  const pageSizes = [10, 20, 50];
  const [modalOpen, setModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(pageSizes[1]);

  return (
    <Box sx={{ height: 500, width: 800 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={pageSizes}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
      />
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        {buttonTitle}
      </Button>
      <Modal open={modalOpen} setOpen={setModalOpen} />
    </Box>
  );
};
