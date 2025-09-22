import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';
import CommonNavbar from '../components/nav-bar/CommonNavbar';

const ProtectedLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top Navigation */}
        <CommonNavbar />
        
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8, // Account for fixed AppBar height
            backgroundColor: '#F8F9FA',
            minHeight: 'calc(100vh - 64px)', // Full height minus AppBar
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default ProtectedLayout;