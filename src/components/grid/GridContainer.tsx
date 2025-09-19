import React from 'react';
import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { gridStyles } from '../../constant/styles/grid';

interface GridContainerProps extends Omit<BoxProps, 'sx'> {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fluid?: boolean;
  sx?: BoxProps['sx'];
}

const GridContainer: React.FC<GridContainerProps> = ({ 
  children, 
  maxWidth = 'lg',
  fluid = false,
  sx,
  ...props 
}) => {
  const containerStyles = fluid 
    ? { width: '100%', padding: 0 }
    : {
        ...gridStyles.container,
        maxWidth: fluid ? 'none' : undefined,
      };

  return (
    <Box
      sx={{
        ...containerStyles,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default GridContainer;
