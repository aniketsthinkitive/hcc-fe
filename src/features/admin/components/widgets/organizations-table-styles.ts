import type { SxProps, Theme } from '@mui/material/styles';

// Table container styles
export const tableContainerCss: SxProps<Theme> = {
  maxHeight: 'calc(100vh - 300px)',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#F2F2F2',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#C5C9C5',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: '#A9ACA9',
    },
  },
};

// Table cell styles
export const tableCellCss: SxProps<Theme> = {
  borderBottom: '1px solid #E7E9EB',
  padding: '12px 16px',
  '&:last-child': {
    paddingRight: '16px',
  },
};

// Table header styles
export const heading: SxProps<Theme> = {
  backgroundColor: '#F9FAF9',
  borderBottom: '1px solid #E7E9EB',
  padding: '12px 16px',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '1.2',
  color: '#2C2D2C',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};

// Text styles
export const primaryTextCss: SxProps<Theme> = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '1.4',
  color: '#2C2D2C',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};

export const secondaryTextCss: SxProps<Theme> = {
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '1.4',
  color: '#989998',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};

// Toggle switch styles
export const toggleSwitchCss: SxProps<Theme> = {
  '& .MuiSwitch-switchBase': {
    padding: '4px',
    '&.Mui-checked': {
      color: '#439322',
      '& + .MuiSwitch-track': {
        backgroundColor: '#439322',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#C5C9C5',
    opacity: 1,
    borderRadius: '12px',
  },
  '& .MuiSwitch-thumb': {
    width: '16px',
    height: '16px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
};

// Action menu styles
export const actionMenuButtonCss: SxProps<Theme> = {
  minWidth: 'auto',
  padding: '4px',
  color: '#989998',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: '#2C2D2C',
  },
};

export const actionMenuItemCss: SxProps<Theme> = {
  fontSize: '14px',
  fontWeight: 400,
  color: '#2C2D2C',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(67, 147, 34, 0.04)',
  },
};

// Number alignment styles
export const numberTextCss: SxProps<Theme> = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '1.4',
  color: '#2C2D2C',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  textAlign: 'right',
};

// Status indicator styles
export const statusIndicatorCss: SxProps<Theme> = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '1.4',
  color: '#2C2D2C',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  textAlign: 'center',
};

// Empty state styles
export const emptyStateCss: SxProps<Theme> = {
  padding: '40px 0',
  color: '#989998',
  fontSize: '14px',
  textAlign: 'center',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};
