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
  Paper,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import Paginator from '../../../components/pagination/pagination';
import type { OrganizationData } from '../types/organization.types';
import {
  tableContainerCss,
  tableCellCss,
  heading,
  primaryTextCss,
  numberTextCss,
  statusIndicatorCss,
  toggleSwitchCss,
  actionMenuButtonCss,
  actionMenuItemCss,
  emptyStateCss,
} from './widgets/organizations-table-styles';

// Component props
interface OrganizationsTableProps {
  data: OrganizationData[];
  loading?: boolean;
  onStatusToggle?: (id: string, status: 'active' | 'inactive') => void;
  onActionClick?: (action: string, id: string) => void;
  pagination?: {
    page: number;
    totalPages: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
    onRecordsPerPageChange: (size: number) => void;
  };
}

// Table headers configuration
const tableHeaders = [
  { id: 'organization', label: 'Organization', width: '200px' },
  { id: 'status', label: 'Status', width: '100px' },
  { id: 'timeZone', label: 'Time Zone', width: '120px' },
  { id: 'usesDST', label: 'Uses DST', width: '100px' },
  { id: 'visibleToAllUsers', label: 'Vis To All Users', width: '140px' },
  { id: 'defaultPrimaryDrugTest', label: 'Default Primary Drug Test', width: '180px' },
  { id: 'defaultAlternateDrugTest', label: 'Default Alternate Drug Test', width: '180px' },
  { id: 'numActiveClients', label: 'Num Active Clients', width: '140px' },
  { id: 'numTotalClients', label: 'Num Total Clients', width: '140px' },
  { id: 'actions', label: 'Action', width: '80px' },
];

const OrganizationsTable: React.FC<OrganizationsTableProps> = ({
  data,
  loading = false,
  onStatusToggle,
  onActionClick,
  pagination,
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

  const handleActionClick = (action: string, id: string) => {
    onActionClick?.(action, id);
    handleActionMenuClose(id);
  };

  // Mock data for demonstration
  const mockData: OrganizationData[] = [
    {
      id: '1',
      organization: '10th JD El Paso',
      status: 'active',
      timeZone: 'Mountain',
      usesDST: 'Y',
      visibleToAllUsers: 'N',
      defaultPrimaryDrugTest: '-',
      defaultAlternateDrugTest: '-',
      numActiveClients: 100,
      numTotalClients: 100,
    },
    {
      id: '2',
      organization: '11th JD',
      status: 'inactive',
      timeZone: 'Hawaii',
      usesDST: 'N',
      visibleToAllUsers: 'Y',
      defaultPrimaryDrugTest: '-',
      defaultAlternateDrugTest: '-',
      numActiveClients: 73,
      numTotalClients: 73,
    },
    {
      id: '3',
      organization: '12th JD',
      status: 'active',
      timeZone: 'Mountain',
      usesDST: 'Y',
      visibleToAllUsers: 'N',
      defaultPrimaryDrugTest: '-',
      defaultAlternateDrugTest: '-',
      numActiveClients: 89,
      numTotalClients: 89,
    },
  ];

  const tableData = data.length > 0 ? data : mockData;

  return (
    <Box>
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer sx={tableContainerCss}>
          <Table stickyHeader aria-label="organizations table">
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
                    align={header.id.includes('Num') ? 'right' : 'left'}
                  >
                    <Typography
                      sx={{
                        fontSize: '12px',
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
                    <TableCell sx={tableCellCss}>
                      <Typography sx={primaryTextCss}>
                        {row.organization}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={tableCellCss}>
                      <Switch
                        checked={row.status === 'active'}
                        onChange={() => handleStatusToggle(row.id, row.status)}
                        sx={toggleSwitchCss}
                        size="small"
                      />
                    </TableCell>

                    {/* Time Zone */}
                    <TableCell sx={tableCellCss}>
                      <Typography sx={primaryTextCss}>
                        {row.timeZone}
                      </Typography>
                    </TableCell>

                    {/* Uses DST */}
                    <TableCell sx={tableCellCss} align="center">
                      <Typography sx={statusIndicatorCss}>
                        {row.usesDST}
                      </Typography>
                    </TableCell>

                    {/* Visible to All Users */}
                    <TableCell sx={tableCellCss} align="center">
                      <Typography sx={statusIndicatorCss}>
                        {row.visibleToAllUsers}
                      </Typography>
                    </TableCell>

                    {/* Default Primary Drug Test */}
                    <TableCell sx={tableCellCss}>
                      <Typography sx={primaryTextCss}>
                        {row.defaultPrimaryDrugTest}
                      </Typography>
                    </TableCell>

                    {/* Default Alternate Drug Test */}
                    <TableCell sx={tableCellCss}>
                      <Typography sx={primaryTextCss}>
                        {row.defaultAlternateDrugTest}
                      </Typography>
                    </TableCell>

                    {/* Num Active Clients */}
                    <TableCell sx={tableCellCss} align="right">
                      <Typography sx={numberTextCss}>
                        {row.numActiveClients}
                      </Typography>
                    </TableCell>

                    {/* Num Total Clients */}
                    <TableCell sx={tableCellCss} align="right">
                      <Typography sx={numberTextCss}>
                        {row.numTotalClients}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={tableCellCss}>
                      <IconButton
                        onClick={(e) => handleActionMenuOpen(row.id, e)}
                        sx={actionMenuButtonCss}
                        size="small"
                      >
                        <MoreVertIcon />
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
                          onClick={() => handleActionClick('edit', row.id)}
                          sx={actionMenuItemCss}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleActionClick('duplicate', row.id)}
                          sx={actionMenuItemCss}
                        >
                          Duplicate
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleActionClick('delete', row.id)}
                          sx={actionMenuItemCss}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      {pagination && (
        <Box sx={{ mt: 2 }}>
          <Paginator
            page={pagination.page}
            totalPages={pagination.totalPages}
            totalRecord={pagination.totalRecords}
            onPageChange={(_, page) => pagination.onPageChange(page)}
            onRecordsPerPageChange={pagination.onRecordsPerPageChange}
            defaultSize={13}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrganizationsTable;
