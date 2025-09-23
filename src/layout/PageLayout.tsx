import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

interface PageLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  backgroundColor = '#FAFAFA',
  padding = '0 16px'
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const responsivePadding = isSmallMobile ? '0 8px' : isMobile ? '0 12px' : padding;

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor,
      padding: responsivePadding,
    }}>
      {children}
    </Box>
  );
};

export default PageLayout;
