import { Box, Typography, Paper } from '@mui/material';
import { Paginator } from '../../../components/pagination';
import EnhancedTableTemplate from '../../../components/common-table/enhanced-table-template';
import SnackbarExample from '../../../components/common-snackbar/snackbar-example';

const DashboardPage = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#F9FAF9', minHeight: '100vh' }}>
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            marginBottom: 2, 
            color: '#439322',
            fontWeight: 600,
          }}
        >
          Dashboard
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            marginBottom: 3,
            color: '#757775',
          }}
        >
          Welcome to the Human Care Center dashboard. Below is the enhanced table component 
          with all table logic consolidated in one file.
        </Typography>
      </Paper>

      {/* Enhanced Table Component */}
      <EnhancedTableTemplate />
      <SnackbarExample />

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