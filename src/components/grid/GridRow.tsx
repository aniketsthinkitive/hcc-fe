import React from 'react';
import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { gridStyles } from '../../constant/styles/grid';

interface GridRowProps extends Omit<BoxProps, 'sx'> {
  children: React.ReactNode;
  noGutters?: boolean;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  sx?: BoxProps['sx'];
}

const GridRow: React.FC<GridRowProps> = ({ 
  children, 
  noGutters = false,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  sx,
  ...props 
}) => {
  const rowStyles = noGutters 
    ? {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 0,
        '& > *': {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }
    : gridStyles.row;

  return (
    <Box
      sx={{
        ...rowStyles,
        alignItems,
        justifyContent,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default GridRow;
