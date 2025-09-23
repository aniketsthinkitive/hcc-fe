import { useState } from 'react';
import { Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import CustomTable from '../../../../components/custom-table/CustomTable';
import type { TableColumn, TableConfig } from '../../../../components/custom-table';
import type { ClientData, ClientTableProps } from './types';
import StatusBadge from '../StatusBadge/StatusBadge';
import { formatCurrency, formatDate, formatPhone } from '../../../../components/custom-table/CustomTable.styles';

export const ClientTable: React.FC<ClientTableProps> = ({
  data,
  loading = false,
  onRowClick,
  onEdit,
  onDelete,
  className = '',
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, client: ClientData) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  const handleEdit = () => {
    if (selectedClient && onEdit) {
      onEdit(selectedClient);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedClient && onDelete) {
      onDelete(selectedClient);
    }
    handleMenuClose();
  };

  // Define table columns with responsive visibility
  const columns: TableColumn<ClientData>[] = [
    {
      key: 'clientId',
      title: 'Client ID',
      width: '100px',
      sortable: true,
      fixed: 'left',
      render: (value: string, row: ClientData) => (
        <span 
          style={{ 
            color: '#2C2D2C', 
            cursor: 'pointer',
            textDecoration: 'none',
            fontSize: '14px',
            lineHeight: '1.15',
            fontWeight: 400,
          }}
          onClick={() => onRowClick?.(row)}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'name',
      title: 'Client Name',
      width: '250px', // Increased width to match Figma design
      sortable: true,
      fixed: 'left',
      render: (_, row: ClientData) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar
            src={row.avatar}
            alt={row.name}
            sx={{ 
              width: 32, 
              height: 32, 
              fontSize: '14px', 
              bgcolor: '#E7E9EB', 
              color: '#424342',
              borderRadius: '50%'
            }}
          >
            {row.name.charAt(0).toUpperCase()}
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ 
              fontWeight: 500, 
              color: '#439322', 
              fontSize: '14px',
              lineHeight: '1.2'
            }}>
              {row.name}
            </span>
            <span style={{ 
              color: '#989998', 
              fontSize: '12px',
              lineHeight: '1.2'
            }}>
              {row.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'code',
      title: 'Code',
      width: '80px',
      sortable: true,
      className: 'hide-on-mobile', // Hide on mobile
    },
    {
      key: 'treatment',
      title: 'Treatment',
      width: '280px', // Increased width to match Figma design
      sortable: true,
      render: (value: string) => (
        <span style={{ 
          maxWidth: '240px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap',
          display: 'block'
        }}>
          {value}
        </span>
      ),
    },
    {
      key: 'balanceDue',
      title: 'Balance Due',
      width: '100px',
      sortable: true,
      render: (value: number) => formatCurrency(value),
      className: 'hide-on-mobile', // Hide on mobile
    },
    {
      key: 'group',
      title: 'Group',
      width: '100px',
      sortable: true,
      className: 'hide-on-tablet', // Hide on tablet and mobile
    },
    {
      key: 'phoneNumber',
      title: 'Phone Number',
      width: '120px',
      sortable: true,
      render: (value: string) => formatPhone(value),
      className: 'hide-on-mobile', // Hide on mobile
    },
    {
      key: 'dob',
      title: 'DOB',
      width: '100px',
      sortable: true,
      render: (value: string) => formatDate(value),
      className: 'hide-on-mobile', // Hide on mobile
    },
    {
      key: 'sex',
      title: 'Sex',
      width: '80px',
      sortable: true,
      className: 'hide-on-tablet', // Hide on tablet and mobile
    },
    {
      key: 'status',
      title: 'Status',
      width: '120px',
      sortable: true,
      render: (value: string) => (
        <StatusBadge
          status={value as any}
          showDropdown={true}
          onClick={() => {
            // Handle status change
          }}
        />
      ),
    },
    {
      key: 'mlDoc',
      title: 'ML/DOC',
      width: '100px',
      sortable: true,
      className: 'hide-on-tablet', // Hide on tablet and mobile
    },
    {
      key: 'assignedOffice',
      title: 'Assigned Office',
      width: '120px',
      sortable: true,
      className: 'hide-on-mobile', // Hide on mobile
    },
    {
      key: 'primaryOrg',
      title: 'Primary Org',
      width: '100px',
      sortable: true,
      className: 'hide-on-tablet', // Hide on tablet and mobile
    },
    {
      key: 'action',
      title: 'Action',
      width: '80px',
      sortable: false,
      fixed: 'right',
      render: (_, row: ClientData) => (
        <IconButton
          size="small"
          onClick={(e) => handleMenuOpen(e, row)}
          sx={{
            padding: '4px',
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: '#F9FAF9',
            },
          }}
        >
          <MoreVert sx={{ fontSize: '18px', color: '#2C2D2C' }} />
        </IconButton>
      ),
    },
  ];

  // Table configuration
  const tableConfig: TableConfig = {
    showCheckbox: true,
    showActions: false, // We have our own action column
    showPagination: true,
    pageSize: 5,
    showRowsPerPage: true,
    stickyHeader: true,
    hoverable: true,
  };

  return (
    <Box className={className}>
      {/* Custom Table */}
      <CustomTable
        data={data}
        columns={columns}
        config={tableConfig}
        loading={loading}
        onRowClick={(row) => onRowClick?.(row)}
        onRowSelect={() => {
          // Handle row selection if needed
        }}
        emptyMessage="No clients found"
        className="client-table"
      />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '8px',
            border: '1px solid #E7E9EB',
          }
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ClientTable;
