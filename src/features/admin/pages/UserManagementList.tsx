import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Switch,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterAlt as FilterIcon,
} from '@mui/icons-material';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomInput from '../../../components/custom-input/custom-input';
import {
  heading,
  tableCellCss,
  primaryTextCss,
  tableContainerCss,
} from '../../../components/common-table/widgets/common-table-widgets';
import TableSkeleton from '../../../components/common-table/TableSkeleton';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'Lane Devon',
    username: 'lane_123',
    role: 'Clinician',
    userEmail: 'nathan.roberts@example.com',
    alertEmail: 'nathan.alerts@example.com',
    phoneNumber: '(239) 555-0108',
    office: 'Main',
    status: false,
    organization: 'All',
  },
  {
    id: 2,
    name: 'Fisher Cody',
    username: 'codyguy',
    role: 'Superuser',
    userEmail: 'tanya.hill@example.com',
    alertEmail: 'tanya.alerts@example.com',
    phoneNumber: '(629) 555-0129',
    office: 'Main',
    status: true,
    organization: 'All',
  },
  {
    id: 3,
    name: 'Cooper Jane',
    username: 'jane@456',
    role: 'Administrator',
    userEmail: 'debbie.baker@example.com',
    alertEmail: 'debbie.alerts@example.com',
    phoneNumber: '(308) 555-0121',
    office: 'Main',
    status: false,
    organization: 'All',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    username: 'sarah.j',
    role: 'Receptionist',
    userEmail: 'sarah.johnson@example.com',
    alertEmail: 'sarah.alerts@example.com',
    phoneNumber: '(555) 123-4567',
    office: 'Branch A',
    status: true,
    organization: 'Healthcare Corp',
  },
  {
    id: 5,
    name: 'Michael Chen',
    username: 'm.chen',
    role: 'Admin',
    userEmail: 'michael.chen@example.com',
    alertEmail: 'michael.alerts@example.com',
    phoneNumber: '(555) 987-6543',
    office: 'Main',
    status: true,
    organization: 'All',
  },
];

// Table headers for skeleton loader
const tableHeaders = [
  { id: 'name', label: 'Name', width: '15%' },
  { id: 'username', label: 'Username', width: '12%' },
  { id: 'role', label: 'Role/Preset', width: '12%' },
  { id: 'userEmail', label: 'User Email', width: '18%' },
  { id: 'alertEmail', label: 'Alert Email', width: '18%' },
  { id: 'office', label: 'Office', width: '10%' },
  { id: 'status', label: 'Status', width: '8%' },
  { id: 'organization', label: 'Organization', width: '10%' },
  { id: 'actions', label: 'Action', width: '7%' },
];

const UserManagementList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Below 1024px
  
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);

  const handleStatusToggle = (userId: number) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: !user.status } : user
      )
    );
  };

  const handleEditUser = (userId: number) => {
    // Edit logic would go here
    console.log('Edit user:', userId);
  };

  const handleDeleteUser = (userId: number) => {
    // Delete logic would go here
    console.log('Delete user:', userId);
  };

  const handleAddNewUser = () => {
    // Add new user logic would go here
    console.log('Add new user');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.alertEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.office.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: '#F9FAF9', minHeight: '100vh' }}>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: { xs: '12px 16px', sm: '16px 16px 12px' },
          backgroundColor: '#FAFAFA',
          width: '100%',
          boxSizing: 'border-box',
          borderBottom: '1px solid #E2E5E8',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: { xs: '18px', sm: '20px' },
            lineHeight: 1.2,
            color: '#2C2D2C',
            textAlign: { xs: 'center', sm: 'left' },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          User Management
        </Typography>
        <CustomButton
          variant="primary"
          size={isMobile ? "sm" : "md"}
          icon={<AddIcon />}
          iconPosition="left"
          onClick={handleAddNewUser}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            minWidth: { xs: 'auto', sm: '140px' },
          } as any}
        >
          Add New User
        </CustomButton>
      </Box>

      {/* Search and Filter Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          padding: { xs: '16px', sm: '16px' },
          backgroundColor: '#FFFFFF',
          width: '100%',
          boxSizing: 'border-box',
          borderBottom: '1px solid #E2E5E8',
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: '16px', sm: '20px' }, 
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '100%', sm: 'auto' },
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px',
            width: { xs: '100%', sm: '320px' },
          }}>
            <CustomInput
              placeholder="Search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              hasStartSearchIcon={true}
            />
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px',
            width: { xs: '100%', sm: 'auto' },
          }}>
            <CustomButton
              variant="secondary"
              size={isMobile ? "sm" : "md"}
              icon={<FilterIcon />}
              iconPosition="left"
              sx={{
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : '100px',
              }}
            >
              Filter
            </CustomButton>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 0 }}>
        {/* Users Table */}
        <Paper sx={{ 
          overflow: 'hidden', 
          boxShadow: 'none', 
          border: 'none',
          width: '100%',
        }}>
          <TableContainer 
            sx={{ 
              ...tableContainerCss, 
              border: 'none',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c1c1c1',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#a8a8a8',
                },
              },
            }}
          >
            {isLoading ? (
              <TableSkeleton 
                headers={tableHeaders}
                rowCount={5}
                hasCheckbox={false}
                hasAvatar={false}
                hasActions={true}
              />
            ) : (
              <Table 
                stickyHeader 
                aria-label="users table" 
                sx={{
                  ...tableCellCss,
                  minWidth: { xs: '1000px', sm: 'auto' },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      key="name"
                      sx={{
                        ...heading,
                        width: { xs: '150px', sm: '15%' },
                        minWidth: { xs: '150px', sm: '15%' },
                        position: 'sticky',
                        left: 0,
                        backgroundColor: '#FFFFFF',
                        zIndex: 1,
                      }}
                      align="left"
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell
                      key="username"
                      align="left"
                      sx={{
                        ...heading,
                        width: { xs: '120px', sm: '12%' },
                        minWidth: { xs: '120px', sm: '12%' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        Username
                      </Typography>
                    </TableCell>
                    <TableCell
                      key="role"
                      align="left"
                      sx={{
                        ...heading,
                        width: { xs: '120px', sm: '12%' },
                        minWidth: { xs: '120px', sm: '12%' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        Role/Preset
                      </Typography>
                    </TableCell>
                    <TableCell
                      key="userEmail"
                      align="left"
                      sx={{
                        ...heading,
                        width: { xs: '180px', sm: '18%' },
                        minWidth: { xs: '180px', sm: '18%' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        User Email
                      </Typography>
                    </TableCell>
                    <TableCell
                      key="alertEmail"
                      align="left"
                      sx={{
                        ...heading,
                        width: { xs: '180px', sm: '18%' },
                        minWidth: { xs: '180px', sm: '18%' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        Alert Email
                      </Typography>
                    </TableCell>
                    <TableCell
                      key="office"
                      align="left"
                      sx={{
                        ...heading,
                        width: { xs: '100px', sm: '10%' },
                        minWidth: { xs: '100px', sm: '10%' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        Office
                      </Typography>
                    </TableCell>
                    <TableCell
                      key="status"
                      align="center"
                      sx={{
                        ...heading,
                        width: { xs: '80px', sm: '8%' },
                        minWidth: { xs: '80px', sm: '8%' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell
                      key="organization"
                      align="left"
                      sx={{
                        ...heading,
                        width: { xs: '100px', sm: '10%' },
                        minWidth: { xs: '100px', sm: '10%' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        Organization
                      </Typography>
                    </TableCell>
                    <TableCell
                      key="actions"
                      align="center"
                      sx={{
                        ...heading,
                        width: { xs: '70px', sm: '7%' },
                        minWidth: { xs: '70px', sm: '7%' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '11px', sm: '12px' },
                          fontWeight: 500,
                          lineHeight: '1.2',
                          color: '#757775',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        Action
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell 
                        sx={{
                          ...heading,
                          position: 'sticky',
                          left: 0,
                          backgroundColor: '#FFFFFF',
                          zIndex: 1,
                        }} 
                        align="left"
                      >
                        <Typography sx={{
                          ...primaryTextCss,
                          fontSize: { xs: '13px', sm: '14px' },
                          fontWeight: 500,
                          color: '#439322',
                        }}>
                          {user.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={heading}>
                        <Typography sx={{
                          ...primaryTextCss,
                          fontSize: { xs: '13px', sm: '14px' },
                        }}>
                          {user.username}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={heading}>
                        <Typography sx={{
                          ...primaryTextCss,
                          fontSize: { xs: '13px', sm: '14px' },
                        }}>
                          {user.role}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={heading}>
                        <Typography sx={{
                          ...primaryTextCss,
                          fontSize: { xs: '13px', sm: '14px' },
                        }}>
                          {user.userEmail}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={heading}>
                        <Typography sx={{
                          ...primaryTextCss,
                          fontSize: { xs: '13px', sm: '14px' },
                        }}>
                          {user.alertEmail}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" sx={heading}>
                        <Typography sx={{
                          ...primaryTextCss,
                          fontSize: { xs: '13px', sm: '14px' },
                        }}>
                          {user.office}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={heading}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          gap: 1,
                        }}>
                          <Switch
                            checked={user.status}
                            onChange={() => handleStatusToggle(user.id)}
                            size="small"
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#439322',
                                '& + .MuiSwitch-track': {
                                  backgroundColor: '#439322',
                                },
                              },
                            }}
                          />
                          <Typography sx={{
                            fontSize: { xs: '12px', sm: '13px' },
                            color: '#424342',
                            fontFamily: '"Helvetica Neue", Arial, sans-serif',
                          }}>
                            {user.status ? 'Active' : 'Inactive'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left" sx={heading}>
                        <Typography sx={{
                          ...primaryTextCss,
                          fontSize: { xs: '13px', sm: '14px' },
                        }}>
                          {user.organization}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={heading}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          gap: 1,
                        }}>
                          <Tooltip title="Edit User">
                            <IconButton
                              size="small"
                              onClick={() => handleEditUser(user.id)}
                              sx={{
                                padding: '4px',
                                borderRadius: '6px',
                                '&:hover': {
                                  backgroundColor: '#f5f5f5',
                                },
                              }}
                            >
                              <EditIcon sx={{ fontSize: 16, color: '#424342' }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteUser(user.id)}
                              sx={{
                                padding: '4px',
                                borderRadius: '6px',
                                '&:hover': {
                                  backgroundColor: '#f5f5f5',
                                },
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: 16, color: '#424342' }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Paper>

        {/* Pagination Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: { xs: '12px 8px 12px 16px', sm: '12px 8px 12px 16px' },
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E7E9EB',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '11px', sm: '12px' },
              color: '#424342',
              fontFamily: '"Inter", Arial, sans-serif',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
            }}>
              <Typography
                sx={{
                  fontSize: { xs: '11px', sm: '12px' },
                  color: '#424342',
                  fontFamily: '"Inter", Arial, sans-serif',
                }}
              >
                Rows per page:
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '11px', sm: '12px' },
                  color: '#424342',
                  fontFamily: '"Inter", Arial, sans-serif',
                  fontWeight: 500,
                }}
              >
                05
              </Typography>
            </Box>
            {/* Pagination controls would go here */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
            }}>
              {/* Previous/Next buttons would be implemented here */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagementList;
