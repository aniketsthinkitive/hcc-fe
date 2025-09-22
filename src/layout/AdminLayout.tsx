import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import CommonNavbar from '../components/nav-bar/CommonNavbar';

const AdminLayout: React.FC = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <CommonNavbar />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8, // Account for fixed AppBar height
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)', // Full height minus AppBar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
