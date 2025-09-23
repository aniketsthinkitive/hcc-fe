import React from 'react';
import { Box, Typography } from '@mui/material';

const ClientPage: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#FAFAFA'
    }}>
      <Typography variant="h4" color="text.secondary">
        Client Detail Page - Coming Soon
      </Typography>
    </Box>
  );
};

export default ClientPage;