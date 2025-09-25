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
  Paper,
  Switch,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import {
  heading,
  tableCellCss,
  primaryTextCss,
  tableContainerCss,
} from '../../../components/common-table/widgets/common-table-widgets';
import TableSkeleton from '../../../components/common-table/TableSkeleton';
import type { OrganizationData } from '../types/organization.types';

// Component props
interface OrganizationsTableProps {
  data: OrganizationData[];
  loading?: boolean;
  onStatusToggle?: (id: string, status: 'active' | 'inactive') => void;
  onEditClick?: (id: string) => void;
  onArchiveClick?: (id: string) => void;
}

const tableHeaders = [
  { id: 'organization', label: 'Organization', width: '200px' },
  { id: 'status', label: 'Status', width: '120px' },
  { id: 'timeZone', label: 'Time Zone', width: '120px' },
  { id: 'usesDST', label: 'Uses DST', width: '100px' },
  { id: 'visibleToAllUsers', label: 'Vis To All Users', width: '140px' },
  { id: 'numActiveClients', label: 'Num Active Clients', width: '140px' },
  { id: 'numTotalClients', label: 'Num Total Clients', width: '140px' },
  { id: 'actions', label: 'Action', width: '80px' },
];

const OrganizationsTable: React.FC<OrganizationsTableProps> = ({
  data = [],
  loading = false,
  onStatusToggle,
  onEditClick,
  onArchiveClick,
}) => {
  const [tableData, setTableData] = useState<OrganizationData[]>(data);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);

  React.useEffect(() => {
    if (!loading) {
      setTableData(data);
    }
  }, [data, loading]);

  const handleStatusToggle = (organizationId: string) => {
    const updatedData = tableData.map(organization => {
      if (organization.id === organizationId) {
        const newStatus = organization.status === 'active' ? 'inactive' : 'active';
        onStatusToggle?.(organizationId, newStatus);
        return { ...organization, status: newStatus };
      }
      return organization;
    });
    setTableData(updatedData);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, organizationId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrganizationId(organizationId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrganizationId(null);
  };

  const handleEdit = () => {
    if (selectedOrganizationId) {
      onEditClick?.(selectedOrganizationId);
    }
    handleMenuClose();
  };

  const handleArchive = () => {
    if (selectedOrganizationId) {
      onArchiveClick?.(selectedOrganizationId);
    }
    handleMenuClose();
  };

  // Show skeleton loader when loading
  if (loading) {
    return (
      <Paper sx={{ overflow: 'hidden' }}>
        <TableSkeleton 
          headers={tableHeaders}
          rowCount={5}
          hasCheckbox={false}
          hasAvatar={false}
          hasActions={true}
        />
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'hidden', height: '100%' }}>
      <TableContainer 
        sx={{ 
          height: '100%',
          '& .MuiTable-root': {
            borderCollapse: 'separate',
            borderSpacing: 0,
          },
          '& .MuiTableHead-root': {
            '& .MuiTableCell-root': {
              backgroundColor: '#F2F2F2', // Neutral/5
              borderBottom: '1px solid #E2E5E8', // Neutral/10
            },
          },
          '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
              '&:hover': {
                backgroundColor: 'rgba(67, 147, 34, 0.02)', // Subtle hover effect
              },
            },
            '& .MuiTableCell-root': {
              borderBottom: '1px solid #F2F2F2', // Neutral/5
            },
          },
        }}
      >
        <Table aria-label="organizations table" sx={tableCellCss}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{
                    ...heading,
                    width: header.width,
                    minWidth: header.width,
                  }}
                  align="left"
                >
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '1.2',
                      color: '#757775', // Neutral/60
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
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  <Typography
                    sx={{
                      padding: '40px 0',
                      color: '#989998', // Neutral/50
                      fontSize: '14px',
                    }}
                  >
                    No organization data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((row) => (
                <TableRow key={row.id}>
                  {/* Organization Column */}
                  <TableCell sx={heading} align="left">
                    <Typography sx={primaryTextCss}>
                      {row.organization}
                    </Typography>
                  </TableCell>

                  {/* Status Column with Toggle Switch */}
                  <TableCell sx={heading} align="left">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 6px',
                        backgroundColor: '#F9FAF9', // Neutral/1
                        borderRadius: '40px',
                        width: 'fit-content',
                      }}
                    >
                      <Switch
                        checked={row.status === 'active'}
                        onChange={() => handleStatusToggle(row.id)}
                        size="small"
                        sx={{
                          width: 36,
                          height: 20,
                          padding: 0,
                          '& .MuiSwitch-switchBase': {
                            padding: '2px',
                            '&.Mui-checked': {
                              transform: 'translateX(16px)',
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
                            width: 16,
                            height: 16,
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
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '1.15',
                          color: '#2C2D2C', // Neutral/80
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        {row.status === 'active' ? 'Active' : 'Inactive'}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Time Zone Column */}
                  <TableCell sx={heading} align="left">
                    <Typography sx={primaryTextCss}>
                      {row.timeZone}
                    </Typography>
                  </TableCell>

                  {/* Uses DST Column */}
                  <TableCell sx={heading} align="left">
                    <Typography sx={primaryTextCss}>
                      {row.usesDST}
                    </Typography>
                  </TableCell>

                  {/* Visible to All Users Column */}
                  <TableCell sx={heading} align="left">
                    <Typography sx={primaryTextCss}>
                      {row.visibleToAllUsers}
                    </Typography>
                  </TableCell>

                  {/* Num Active Clients Column */}
                  <TableCell sx={heading} align="left">
                    <Typography sx={primaryTextCss}>
                      {row.numActiveClients}
                    </Typography>
                  </TableCell>

                  {/* Num Total Clients Column */}
                  <TableCell sx={heading} align="left">
                    <Typography sx={primaryTextCss}>
                      {row.numTotalClients}
                    </Typography>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell sx={heading} align="left">
                    <IconButton
                      onClick={(event) => handleMenuClick(event, row.id)}
                      sx={{
                        padding: '4px',
                        borderRadius: '6px',
                        '&:hover': {
                          backgroundColor: 'rgba(67, 147, 34, 0.04)',
                        },
                      }}
                    >
                      <MoreVertIcon 
                        sx={{ 
                          width: 18, 
                          height: 18, 
                          color: '#2C2D2C' // Neutral/80
                        }} 
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#FFFFFF',
              border: '1px solid #DFE5E2',
              borderRadius: '6px',
              boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
              padding: '4px 0',
              minWidth: '120px',
            },
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            padding: '10px 14px',
            gap: '8px',
            '&:hover': {
              backgroundColor: 'rgba(67, 147, 34, 0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '18px' }}>
            <EditIcon 
              sx={{ 
                width: 18, 
                height: 18, 
                color: '#2C2D2C' // Neutral/80
              }} 
            />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            slotProps={{
              primary: {
                sx: {
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '1.15',
                  color: '#2C2D2C', // Neutral/80
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                },
              },
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={handleArchive}
          sx={{
            padding: '10px 14px',
            gap: '8px',
            '&:hover': {
              backgroundColor: 'rgba(67, 147, 34, 0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '18px' }}>
            <ArchiveIcon 
              sx={{ 
                width: 18, 
                height: 18, 
                color: '#2C2D2C' // Neutral/80
              }} 
            />
          </ListItemIcon>
          <ListItemText
            primary="Archive"
            slotProps={{
              primary: {
                sx: {
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '1.15',
                  color: '#2C2D2C', // Neutral/80
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                },
              },
            }}
          />
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default OrganizationsTable;
