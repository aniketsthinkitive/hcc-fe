import { Box, Typography, Paper, Button } from '@mui/material';
import { Paginator } from '../../../components/pagination';
import EnhancedTableTemplate from '../../../components/common-table/enhanced-table-template';
import SnackbarExample from '../../../components/common-snackbar/snackbar-example';
import ConfirmationPopUp from '../../../components/confirmation-pop-up/confirmation-pop-up';
import React from 'react';

const DashboardPage = () => {
  const [open , setOpen ] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
        setOpen(false);
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#F9FAF9", minHeight: "100vh" }}>
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: 2,
            color: "#439322",
            fontWeight: 600,
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 3,
            color: "#757775",
          }}
        >
          Welcome to the Human Care Center dashboard. Below is the enhanced
          table component with all table logic consolidated in one file.
        </Typography>
      </Paper>

      {/* Enhanced Table Component */}
      <EnhancedTableTemplate />
      <SnackbarExample />
      <Button variant="outlined" onClick={handleClick}>
        Open Model
      </Button>

      <ConfirmationPopUp
        open={open}
        onClose={handleClose}
        onConfirm={() => {}}
        message={"Do you really want to change this status ?"}
      />

      {/* Pagination */}
      <Paper sx={{ padding: 2, marginTop: 3 }}>
        <Paginator
          page={3}
          totalPages={100}
          totalRecord={1000}
          onPageChange={() => {}}
          onRecordsPerPageChange={() => {}}
          defaultSize={10}
        />
      </Paper>
    </Box>
  );
};

export default DashboardPage