import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Switch,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import type { OrganizationData } from '../types/organization.types';
// Inline styles for the table component
const tableContainerCss = {
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

const tableCellCss = {
  borderBottom: '1px solid #E7E9EB',
  padding: '12px 16px',
  '&:last-child': {
    paddingRight: '16px',
  },
};

const heading = {
  backgroundColor: '#F9FAF9',
  borderBottom: '1px solid #E7E9EB',
  padding: '12px 16px',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '1.2',
  color: '#2C2D2C',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};

const primaryTextCss = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '1.4',
  color: '#2C2D2C',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};

const actionMenuButtonCss = {
  minWidth: 'auto',
  padding: '4px',
  color: '#989998',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: '#2C2D2C',
  },
};

const actionMenuItemCss = {
  fontSize: '14px',
  fontWeight: 400,
  color: '#2C2D2C',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(67, 147, 34, 0.04)',
  },
};

const emptyStateCss = {
  padding: '40px 0',
  color: '#989998',
  fontSize: '14px',
  textAlign: 'center',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};

// Component props
interface OrganizationsTableProps {
  data: OrganizationData[];
  loading?: boolean;
  onStatusToggle?: (id: string, status: 'active' | 'inactive') => void;
  onEditClick?: (id: string) => void;
  onArchiveClick?: (id: string) => void;
}

// Table headers configuration
const tableHeaders = [
  { id: 'organization', label: 'Organization', width: '200px' },
  { id: 'status', label: 'Status', width: '100px' },
  { id: 'timeZone', label: 'Time Zone', width: '120px' },
  { id: 'usesDST', label: 'Uses DST', width: '100px' },
  { id: 'visibleToAllUsers', label: 'Vis To All Users', width: '140px' },
  { id: 'numActiveClients', label: 'Num Active Clients', width: '140px' },
  { id: 'numTotalClients', label: 'Num Total Clients', width: '140px' },
  { id: 'actions', label: 'Action', width: '80px' },
];

const OrganizationsTable: React.FC<OrganizationsTableProps> = ({
  data,
  loading = false,
  onStatusToggle,
  onEditClick,
  onArchiveClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  // Handle status toggle
  const handleStatusToggle = (id: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    onStatusToggle?.(id, newStatus);
  };

  // Handle action menu
  const handleActionMenuOpen = (id: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(prev => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleActionMenuClose = (id: string) => {
    setAnchorEl(prev => ({ ...prev, [id]: null }));
  };

  const handleEditClick = (id: string) => {
    onEditClick?.(id);
    handleActionMenuClose(id);
  };

  const handleArchiveClick = (id: string) => {
    onArchiveClick?.(id);
    handleActionMenuClose(id);
  };

  const tableData = data;

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      overflow: 'auto'
    }}>
      <TableContainer sx={{ 
        ...tableContainerCss, 
        width: '100%', 
        height: '100%',
        maxHeight: { xs: '60vh', sm: '70vh', md: '75vh' }
      }}>
        <Table stickyHeader aria-label="organizations table" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      ...heading,
                      width: header.width,
                      minWidth: { xs: '120px', sm: header.width },
                      fontSize: { xs: '10px', sm: '12px' },
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}
                    align="left"
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '10px', sm: '12px' },
                        fontWeight: 500,
                        lineHeight: '1.2',
                        color: '#757775',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      }}
                    >
                      {header.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={tableHeaders.length} align="center">
                    <Typography sx={emptyStateCss}>
                      Loading...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : tableData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableHeaders.length} align="center">
                    <Typography sx={emptyStateCss}>
                      No organizations found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                tableData.map((row) => (
                  <TableRow key={row.id} hover>
                    {/* Organization */}
                    <TableCell sx={{
                      ...tableCellCss,
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}>
                      <Typography sx={{
                        ...primaryTextCss,
                        fontSize: { xs: '12px', sm: '14px' }
                      }}>
                        {row.organization}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={{
                      ...tableCellCss,
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}>
                      <Switch
                        checked={row.status === 'active'}
                        onChange={() => handleStatusToggle(row.id, row.status)}
                        size="small"
                        sx={{
                          width: { xs: 32, sm: 36 },
                          height: { xs: 18, sm: 20 },
                          padding: 0,
                          '& .MuiSwitch-switchBase': {
                            padding: '2px',
                            '&.Mui-checked': {
                              transform: { xs: 'translateX(14px)', sm: 'translateX(16px)' },
                              '& + .MuiSwitch-track': {
                                backgroundColor: '#439322', // Primary/70 Main
                                opacity: 1,
                              },
                              '& .MuiSwitch-thumb': {
                                backgroundColor: '#FFFFFF',
                              },
                            },
                          },
                          '& .MuiSwitch-thumb': {
                            width: { xs: 14, sm: 16 },
                            height: { xs: 14, sm: 16 },
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
                          },
                          '& .MuiSwitch-track': {
                            backgroundColor: '#DDE0DD', // Neutral/10
                            opacity: 1,
                            borderRadius: 12,
                          },
                        }}
                      />
                    </TableCell>

                    {/* Time Zone */}
                    <TableCell sx={{
                      ...tableCellCss,
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}>
                      <Typography sx={{
                        ...primaryTextCss,
                        fontSize: { xs: '12px', sm: '14px' }
                      }}>
                        {row.timeZone}
                      </Typography>
                    </TableCell>

                    {/* Uses DST */}
                    <TableCell sx={{
                      ...tableCellCss,
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}>
                      <Typography sx={{
                        ...primaryTextCss,
                        fontSize: { xs: '12px', sm: '14px' }
                      }}>
                        {row.usesDST}
                      </Typography>
                    </TableCell>

                    {/* Visible to All Users */}
                    <TableCell sx={{
                      ...tableCellCss,
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}>
                      <Typography sx={{
                        ...primaryTextCss,
                        fontSize: { xs: '12px', sm: '14px' }
                      }}>
                        {row.visibleToAllUsers}
                      </Typography>
                    </TableCell>


                    {/* Num Active Clients */}
                    <TableCell sx={{
                      ...tableCellCss,
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}>
                      <Typography sx={{
                        ...primaryTextCss,
                        fontSize: { xs: '12px', sm: '14px' }
                      }}>
                        {row.numActiveClients}
                      </Typography>
                    </TableCell>

                    {/* Num Total Clients */}
                    <TableCell sx={{
                      ...tableCellCss,
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}>
                      <Typography sx={{
                        ...primaryTextCss,
                        fontSize: { xs: '12px', sm: '14px' }
                      }}>
                        {row.numTotalClients}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={{
                      ...tableCellCss,
                      padding: { xs: '8px 12px', sm: '12px 16px' }
                    }}>
                      <IconButton
                        onClick={(e) => handleActionMenuOpen(row.id, e)}
                        sx={{
                          ...actionMenuButtonCss,
                          padding: { xs: '4px', sm: '4px' },
                          minWidth: { xs: '32px', sm: 'auto' }
                        }}
                        size="small"
                      >
                        <MoreVertIcon sx={{ fontSize: { xs: '16px', sm: '20px' } }} />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl[row.id]}
                        open={Boolean(anchorEl[row.id])}
                        onClose={() => handleActionMenuClose(row.id)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        PaperProps={{
                          sx: {
                            boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
                            border: '1px solid #DFE5E2',
                            borderRadius: '6px',
                            minWidth: '120px',
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => handleEditClick(row.id)}
                          sx={actionMenuItemCss}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleArchiveClick(row.id)}
                          sx={actionMenuItemCss}
                        >
                          Archive
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrganizationsTable;
