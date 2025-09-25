import React, { useState, useEffect } from 'react';
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
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  heading,
  tableCellCss,
  primaryTextCss,
  tableContainerCss,
} from '../../../components/common-table/widgets/common-table-widgets';
import TableSkeleton from '../../../components/common-table/TableSkeleton';

interface ReferralData {
  id: string;
  referralId: string;
  clientName: string;
  referringProvider: string;
  referralDate: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  serviceType: string;
  phoneNumber: string;
  email: string;
}

interface ReferralTableProps {
  data?: ReferralData[];
  loading?: boolean;
  onStatusChange?: (referralId: string, newStatus: string) => void;
  onEdit?: (referralId: string) => void;
  onView?: (referralId: string) => void;
}

const tableHeaders = [
  { id: "clientName", label: "Client Name", width: "150px" },
  { id: "Referring User", label: "Referring User", width: "180px" },
  { id: "referralDate", label: "Referral Date", width: "130px" },
  { id: "serviceType", label: "Service Type", width: "180px" },
  { id: "priority", label: "Priority", width: "100px" },
  { id: "status", label: "Status", width: "120px" },
  { id: "actions", label: "Action", width: "80px" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return { bg: '#FEF3C7', color: '#D97706' }; // Yellow
    case 'approved':
      return { bg: '#D1FAE5', color: '#059669' }; // Green
    case 'in_progress':
      return { bg: '#DBEAFE', color: '#2563EB' }; // Blue
    case 'completed':
      return { bg: '#E5E7EB', color: '#374151' }; // Gray
    case 'rejected':
      return { bg: '#FEE2E2', color: '#DC2626' }; // Red
    default:
      return { bg: '#F3F4F6', color: '#6B7280' };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return { bg: '#FEE2E2', color: '#DC2626' }; // Red
    case 'medium':
      return { bg: '#FEF3C7', color: '#D97706' }; // Yellow
    case 'low':
      return { bg: '#D1FAE5', color: '#059669' }; // Green
    default:
      return { bg: '#F3F4F6', color: '#6B7280' };
  }
};

const ReferralTable: React.FC<ReferralTableProps> = ({
  data = [],
  loading = false,
  onStatusChange,
  onEdit,
  onView,
}) => {
  const [tableData, setTableData] = useState<ReferralData[]>(data);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReferralId, setSelectedReferralId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      setTableData(data);
    }
  }, [data, loading]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, referralId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedReferralId(referralId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReferralId(null);
  };

  const handleEdit = () => {
    if (selectedReferralId) {
      onEdit?.(selectedReferralId);
    }
    handleMenuClose();
  };

  const handleView = () => {
    if (selectedReferralId) {
      onView?.(selectedReferralId);
    }
    handleMenuClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
        <Table aria-label="referral table" sx={tableCellCss}>
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
                    No referral data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((row) => {
                const statusColors = getStatusColor(row.status);
                const priorityColors = getPriorityColor(row.priority);
                
                return (
                  <TableRow key={row.id}>
                    {/* Referral ID Column */}
                    <TableCell sx={heading} align="left">
                      <Typography sx={primaryTextCss}>
                        {row.referralId}
                      </Typography>
                    </TableCell>

                    {/* Client Name Column */}
                    <TableCell sx={heading} align="left">
                      <Typography sx={primaryTextCss}>
                        {row.clientName}
                      </Typography>
                    </TableCell>

                    {/* Referring Provider Column */}
                    <TableCell sx={heading} align="left">
                      <Typography sx={primaryTextCss}>
                        {row.referringProvider}
                      </Typography>
                    </TableCell>

                    {/* Referral Date Column */}
                    <TableCell sx={heading} align="left">
                      <Typography sx={primaryTextCss}>
                        {formatDate(row.referralDate)}
                      </Typography>
                    </TableCell>

                    {/* Service Type Column */}
                    <TableCell sx={heading} align="left">
                      <Typography sx={primaryTextCss}>
                        {row.serviceType}
                      </Typography>
                    </TableCell>

                    {/* Priority Column */}
                    <TableCell sx={heading} align="left">
                      <Chip
                        label={row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
                        size="small"
                        sx={{
                          backgroundColor: priorityColors.bg,
                          color: priorityColors.color,
                          fontSize: '12px',
                          fontWeight: 500,
                          height: '24px',
                          borderRadius: '12px',
                          textTransform: 'capitalize',
                        }}
                      />
                    </TableCell>

                    {/* Status Column */}
                    <TableCell sx={heading} align="left">
                      <Chip
                        label={row.status.replace('_', ' ').charAt(0).toUpperCase() + row.status.replace('_', ' ').slice(1)}
                        size="small"
                        sx={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.color,
                          fontSize: '12px',
                          fontWeight: 500,
                          height: '24px',
                          borderRadius: '12px',
                          textTransform: 'capitalize',
                        }}
                      />
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
                );
              })
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
          onClick={handleView}
          sx={{
            padding: '10px 14px',
            gap: '8px',
            '&:hover': {
              backgroundColor: 'rgba(67, 147, 34, 0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '18px' }}>
            <VisibilityIcon 
              sx={{ 
                width: 18, 
                height: 18, 
                color: '#2C2D2C' // Neutral/80
              }} 
            />
          </ListItemIcon>
          <ListItemText
            primary="View"
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
      </Menu>
    </Paper>
  );
};

export default ReferralTable;
