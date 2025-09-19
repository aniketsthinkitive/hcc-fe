import React from 'react';
import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { gridStyles, gridBreakpoints } from '../../constant/styles/grid';

interface GridColumnProps extends Omit<BoxProps, 'sx'> {
  children: React.ReactNode;
  // Mobile columns (4 column grid)
  mobile?: 1 | 2 | 3 | 4;
  // Tablet columns (8 column grid)
  tablet?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  // Desktop columns (12 column grid)
  desktop?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  // Offset columns
  mobileOffset?: 0 | 1 | 2 | 3;
  tabletOffset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  desktopOffset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  // Auto sizing
  auto?: boolean;
  // Full width
  fullWidth?: boolean;
  sx?: BoxProps['sx'];
}

const GridColumn: React.FC<GridColumnProps> = ({ 
  children,
  mobile,
  tablet,
  desktop,
  mobileOffset = 0,
  tabletOffset = 0,
  desktopOffset = 0,
  auto = false,
  fullWidth = false,
  sx,
  ...props 
}) => {
  const getColumnStyles = () => {
    const styles: any = { ...gridStyles.column };

    if (fullWidth) {
      return {
        ...styles,
        flex: '0 0 100%',
        maxWidth: '100%',
      };
    }

    if (auto) {
      return {
        ...styles,
        flex: '1 1 0',
        maxWidth: '100%',
      };
    }

    // Mobile styles (4 column grid)
    if (mobile) {
      const width = (mobile / 4) * 100;
      const offset = (mobileOffset / 4) * 100;
      
      styles.flex = `0 0 ${width}%`;
      styles.maxWidth = `${width}%`;
      
      if (mobileOffset > 0) {
        styles.marginLeft = `${offset}%`;
      }
    }

    // Tablet styles (8 column grid)
    if (tablet) {
      const width = (tablet / 8) * 100;
      const offset = (tabletOffset / 8) * 100;
      
      styles[`@media (min-width: ${gridBreakpoints.tablet.xs}px)`] = {
        flex: `0 0 ${width}%`,
        maxWidth: `${width}%`,
        ...(tabletOffset > 0 && { marginLeft: `${offset}%` }),
      };
    }

    // Desktop styles (12 column grid)
    if (desktop) {
      const width = (desktop / 12) * 100;
      const offset = (desktopOffset / 12) * 100;
      
      styles[`@media (min-width: ${gridBreakpoints.desktop.xs}px)`] = {
        flex: `0 0 ${width}%`,
        maxWidth: `${width}%`,
        ...(desktopOffset > 0 && { marginLeft: `${offset}%` }),
      };
    }

    return styles;
  };

  return (
    <Box
      sx={{
        ...getColumnStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default GridColumn;
