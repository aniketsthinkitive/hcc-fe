import React from 'react';
import {
  Menu,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AdminDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

interface AdminMenuItem {
  label: string;
  path: string;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate();

  // Admin menu items based on Figma design
  const adminMenuItems: AdminMenuItem[] = [
    { label: 'Company Information', path: '/admin/company-information' },
    { label: 'Office Information', path: '/admin/office-information' },
    { label: 'All Organizations', path: '/admin/organizations' },
    { label: 'Discharge Reasons', path: '/admin/discharge-reasons' },
    { label: 'Task List for Clients', path: '/admin/task-list-clients' },
    { label: 'Task for Counselor', path: '/admin/task-counselor' },
    { label: 'Roles & Permissions', path: '/admin/roles-permissions' },
    { label: 'User Information', path: '/admin/user-information' },
  ];

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 200,
          borderRadius: '6px',
          boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
          border: '1px solid #DFE5E2',
          backgroundColor: '#FFFFFF',
          padding: '4px 0px',
        }
      }}
      disableAutoFocusItem
      disableEnforceFocus
      disableRestoreFocus
    >
      {adminMenuItems.map((item) => (
        <MenuItem
          key={item.path}
          onClick={() => handleMenuItemClick(item.path)}
          sx={{
            padding: '10px 14px',
            minHeight: 'auto',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            '& .MuiMenuItem-root': {
              padding: '10px 14px',
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: 1.15,
                letterSpacing: '0.8%',
                color: '#2C2D2C',
                textAlign: 'left',
                fontStyle: 'normal',
                // Force override any Material-UI defaults
                '&.MuiTypography-root': {
                  fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif !important',
                  fontWeight: '400 !important',
                  fontSize: '16px !important',
                  lineHeight: '1.15 !important',
                  letterSpacing: '0.8% !important',
                }
              }}
            >
              {item.label}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AdminDropdown;
