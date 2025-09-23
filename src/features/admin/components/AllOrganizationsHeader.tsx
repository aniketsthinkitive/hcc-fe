import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Download as DownloadIcon, Add as AddIcon } from '@mui/icons-material';

interface AllOrganizationsHeaderProps {
  onDownloadCSV: () => void;
  onNewOrganization: () => void;
}

const AllOrganizationsHeader: React.FC<AllOrganizationsHeaderProps> = ({
  onDownloadCSV,
  onNewOrganization,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        padding: 0,
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: 1.2,
          color: '#2C2D2C',
          margin: 0,
        }}
      >
        All Organizations
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Download CSV Button */}
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onDownloadCSV}
          sx={{
            borderColor: '#E7E9EB',
            color: '#2C2D2C',
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: 2,
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            '&:hover': {
              borderColor: '#439322',
              backgroundColor: 'rgba(67, 147, 34, 0.04)',
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.1)',
            },
            '& .MuiButton-startIcon': {
              marginRight: '8px',
            },
          }}
        >
          Download CSV
        </Button>

        {/* New Organization Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onNewOrganization}
          sx={{
            backgroundColor: '#439322',
            color: '#FFFFFF',
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: 2,
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            '&:hover': {
              backgroundColor: '#2C6E14',
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.1)',
            },
            '& .MuiButton-startIcon': {
              marginRight: '8px',
            },
          }}
        >
          New Organization
        </Button>
      </Box>
    </Box>
  );
};

export default AllOrganizationsHeader;
