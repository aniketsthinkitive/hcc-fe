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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  SaveOutlined as SaveIcon,
} from '@mui/icons-material';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomSelect from '../../../components/custom-select/custom-select';
import CustomCheckbox from '../../../components/custom-checkbox/custom-checkbox';
import {
  heading,
  tableCellCss,
  primaryTextCss,
  tableContainerCss,
} from '../../../components/common-table/widgets/common-table-widgets';
import TableSkeleton from '../../../components/common-table/TableSkeleton';

// Mock data for roles and permissions
const roleTypes = [
  { value: 'admin', label: 'Admin' },
  { value: 'clinician', label: 'Clinician' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'super-user', label: 'Super User' },
];

const roles = [
  { value: 'super-admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'user', label: 'User' },
];

const features = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'roles-permissions', name: 'Roles & Permissions' },
  { id: 'form-builder', name: 'Form Builder' },
  { id: 'membership-plan', name: 'Membership Plan' },
  { id: 'coverage-plan', name: 'Coverage Plan' },
];

const permissions = ['All', 'View', 'Create', 'Update', 'Delete'];

// Table headers for skeleton loader
const tableHeaders = [
  { id: 'features', label: 'Features', width: '50%' },
  { id: 'all', label: 'All', width: '10%' },
  { id: 'view', label: 'View', width: '10%' },
  { id: 'create', label: 'Create', width: '10%' },
  { id: 'update', label: 'Update', width: '10%' },
  { id: 'delete', label: 'Delete', width: '10%' },
];

// Types
interface Permission {
  all: boolean;
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface Permissions {
  [featureId: string]: Permission;
}

interface RolePermissions {
  [roleId: string]: Permissions;
}

// Mock permission data
const mockPermissions: RolePermissions = {
  'super-admin': {
    'dashboard': { all: true, view: true, create: true, update: true, delete: true },
    'roles-permissions': { all: true, view: true, create: true, update: true, delete: true },
    'form-builder': { all: true, view: true, create: true, update: true, delete: true },
    'membership-plan': { all: true, view: true, create: true, update: true, delete: true },
    'coverage-plan': { all: true, view: true, create: true, update: true, delete: true },
  },
  'admin': {
    'dashboard': { all: true, view: true, create: true, update: false, delete: false },
    'roles-permissions': { all: true, view: true, create: true, update: false, delete: true },
    'form-builder': { all: true, view: true, create: true, update: true, delete: true },
    'membership-plan': { all: true, view: true, create: true, update: true, delete: true },
    'coverage-plan': { all: true, view: true, create: true, update: true, delete: true },
  },
};

const RolesPermissionsList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Below 1024px
  // const isTablet = useMediaQuery(theme.breakpoints.down('lg')); // Below 1440px
  
  const [selectedRoleType, setSelectedRoleType] = useState<string>('admin');
  const [selectedRole, setSelectedRole] = useState<string>('super-admin');
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [changesCount, setChangesCount] = useState(0);
  const [isLoading] = useState(false);
  const [originalPermissions, setOriginalPermissions] = useState<Record<string, Permission>>({});
  
  // New role form state
  const [newRoleType, setNewRoleType] = useState<string>('');
  const [newRoleName, setNewRoleName] = useState<string>('');

  // Current permissions state
  const [currentPermissions, setCurrentPermissions] = useState<Permissions>(mockPermissions[selectedRole] || {});

  const handleRoleTypeChange = (e: any) => {
    setSelectedRoleType(e.target.value);
  };

  const handleRoleChange = (e: any) => {
    setSelectedRole(e.target.value);
    setCurrentPermissions(mockPermissions[e.target.value] || {});
  };

  const handlePermissionChange = (featureId: string, permission: string, checked: boolean) => {
    setCurrentPermissions(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        [permission]: checked,
      }
    }));
    setChangesCount(prev => prev + 1);
  };

  const handleSelectAll = (featureId: string, checked: boolean) => {
    setCurrentPermissions(prev => ({
      ...prev,
      [featureId]: {
        all: checked,
        view: checked,
        create: checked,
        update: checked,
        delete: checked,
      }
    }));
    setChangesCount(prev => prev + 1);
  };

  const handleSaveChanges = () => {
    // Save logic would go here
    setChangesCount(0);
    setIsEditMode(false);
  };

  const handleCancelChanges = () => {
    // Restore the original permissions state
    setCurrentPermissions({ ...originalPermissions });
    setChangesCount(0);
    setIsEditMode(false);
  };

  const handleCreateNewRole = () => {
    // Create role logic would go here
    setIsNewRoleModalOpen(false);
    setNewRoleType('');
    setNewRoleName('');
  };

  const renderPermissionCell = (featureId: string, permission: string) => {
    const hasPermission = currentPermissions[featureId]?.[permission as keyof Permission] || false;
    
    if (isEditMode) {
      return (
        <CustomCheckbox
          checked={hasPermission}
          onChange={(checked) => handlePermissionChange(featureId, permission, checked)}
          size="md"
        />
      );
    }

    return hasPermission ? (
      <CheckIcon sx={{ color: '#10842B', fontSize: 20 }} />
    ) : (
      <CloseIcon sx={{ color: '#CA1C1C', fontSize: 20 }} />
    );
  };

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
          Roles and Permission
        </Typography>
        <CustomButton
          variant="primary"
          size={isMobile ? "sm" : "md"}
          icon={<AddIcon />}
          iconPosition="left"
          onClick={() => setIsNewRoleModalOpen(true)}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            minWidth: { xs: 'auto', sm: '120px' },
          } as any}
        >
          New Role
        </CustomButton>
      </Box>

      {/* Controls Section - No gap from header, with borders */}
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
        {isEditMode ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            justifyContent: { xs: 'center', sm: 'flex-start' },
            width: { xs: '100%', sm: 'auto' },
          }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                backgroundColor: '#DBEAFF',
                borderRadius: '12px',
                border: '1px solid #B3D9FF',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#0066CC',
                  lineHeight: 1.2,
                }}
              >
                {changesCount} Changes
              </Typography>
            </Box>
            <Tooltip title="Changes made to permissions">
              <IconButton size="small" sx={{ padding: '2px' }}>
                <InfoIcon sx={{ fontSize: 14, color: '#0066CC' }} />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
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
              width: { xs: '100%', sm: 'auto' },
            }}>
              <Typography
                sx={{
                  fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#2C2D2C',
                  whiteSpace: 'nowrap',
                }}
              >
                Role Type:
              </Typography>
              <Box sx={{ 
                width: { xs: '100%', sm: '200px' },
                minWidth: { xs: 'auto', sm: '200px' },
              }}>
                <CustomSelect
                  placeholder="Select"
                  name="role-type"
                  value={selectedRoleType}
                  items={roleTypes}
                  onChange={handleRoleTypeChange}
                />
              </Box>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '8px',
              width: { xs: '100%', sm: 'auto' },
            }}>
              <Typography
                sx={{
                  fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#2C2D2C',
                  whiteSpace: 'nowrap',
                }}
              >
                Role:
              </Typography>
              <Box sx={{ 
                width: { xs: '100%', sm: '200px' },
                minWidth: { xs: 'auto', sm: '200px' },
              }}>
                <CustomSelect
                  placeholder="Select"
                  name="role"
                  value={selectedRole}
                  items={roles}
                  onChange={handleRoleChange}
                />
              </Box>
            </Box>
          </Box>
        )}
        {isEditMode ? (
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 }, 
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
          }}>
            <CustomButton
              variant="black"
              size={isMobile ? "sm" : "md"}
              onClick={() => {
                features.forEach(feature => {
                  handleSelectAll(feature.id, true);
                });
              }}
              sx={{
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : '100px',
              }}
            >
              Select All
            </CustomButton>
            <CustomButton
              variant="black"
              size={isMobile ? "sm" : "md"}
              icon={<CloseIcon />}
              iconPosition="left"
              onClick={handleCancelChanges}
              sx={{
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : '100px',
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant="secondary"
              size={isMobile ? "sm" : "md"}
              icon={<SaveIcon />}
              iconPosition="left"
              onClick={handleSaveChanges}
              disabled={changesCount === 0}
              sx={{
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : '120px',
              }}
            >
              Save Changes
            </CustomButton>
          </Box>
        ) : (
          <Box sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-end' },
            width: { xs: '100%', sm: 'auto' },
          }}>
            <CustomButton
              variant="secondary"
              size={isMobile ? "sm" : "md"}
              icon={<EditIcon />}
              iconPosition="left"
              onClick={() => {
                // Save the current permissions state as original
                setOriginalPermissions({ ...currentPermissions });
                setIsEditMode(true);
                setChangesCount(0);
              }}
              sx={{
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : '140px',
              }}
            >
              Edit Permissions
            </CustomButton>
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 0 }}>

      {/* Permissions Table */}
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
              hasActions={false}
            />
          ) : (
            <Table 
              stickyHeader 
              aria-label="permissions table" 
              sx={{
                ...tableCellCss,
                minWidth: { xs: '600px', sm: 'auto' },
              }}
            >
              <TableHead>
              <TableRow>
                <TableCell
                  key="features"
                  sx={{
                    ...heading,
                    width: { xs: '200px', sm: '50%' },
                    minWidth: { xs: '200px', sm: '50%' },
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
                      color: '#757775', // Neutral/60
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    Features
                  </Typography>
                </TableCell>
                {permissions.map((permission) => (
                  <TableCell
                    key={permission}
                    align="center"
                    sx={{
                      ...heading,
                      width: { xs: '80px', sm: '10%' },
                      minWidth: { xs: '80px', sm: '10%' },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '11px', sm: '12px' },
                        fontWeight: 500,
                        lineHeight: '1.2',
                        color: '#757775', // Neutral/60
                        fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      }}
                    >
                      {permission}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.id}>
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
                    }}>
                      {feature.name}
                    </Typography>
                  </TableCell>
                  {permissions.map((permission) => (
                    <TableCell
                      key={permission}
                      align="center"
                      sx={heading}
                    >
                      {renderPermissionCell(feature.id, permission.toLowerCase())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>


      {/* New Role Modal */}
      <Dialog
        open={isNewRoleModalOpen}
        onClose={() => setIsNewRoleModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: '8px', sm: '12px' },
            backgroundColor: '#FFFFFF',
            minHeight: { xs: '350px', sm: '400px' },
            maxWidth: { xs: '95vw', sm: '480px' },
            width: { xs: '95vw', sm: '100%' },
            margin: { xs: '16px', sm: '32px' },
            boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: { xs: '16px 16px 12px 16px', sm: '24px 24px 16px 24px' },
            borderBottom: '1px solid #E2E5E8',
            backgroundColor: '#FFFFFF',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
              fontWeight: 600,
              fontSize: { xs: '18px', sm: '20px' },
              lineHeight: 1.2,
              color: '#2C2D2C',
              gap: 2,
            }}
          >
            Add New Role
          </Typography>
          <IconButton 
            onClick={() => setIsNewRoleModalOpen(false)}
            sx={{
              padding: { xs: '4px', sm: '8px' },
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ 
          padding: { xs: '12px 16px', sm: '16px' },
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: { xs: 2, sm: 3 }, 
            paddingTop: { xs: '4px', sm: '8px' },
          }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: { xs: '13px', sm: '14px' },
                  lineHeight: 1.6,
                  color: '#757775',
                  mb: { xs: 1, sm: 1.5 },
                }}
              >
                Role Type
              </Typography>
              <CustomSelect
                placeholder="Select"
                name="new-role-type"
                value={newRoleType}
                items={roleTypes}
                onChange={(e) => setNewRoleType(e.target.value)}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: { xs: '13px', sm: '14px' },
                  lineHeight: 1.6,
                  color: '#757775',
                  mb: { xs: 1, sm: 1.5 },
                }}
              >
                Role
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Role"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CDD0CD',
                    height: { xs: '40px', sm: '44px' },
                    '&:hover': {
                      borderColor: '#439322',
                    },
                    '&.Mui-focused': {
                      borderColor: '#439322',
                    },
                  },
                  '& .MuiInputBase-input': {
                    padding: { xs: '6px 8px', sm: '8px 10px' },
                    fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
                    fontSize: { xs: '13px', sm: '14px' },
                    color: '#2C2D2C',
                    height: { xs: '40px', sm: '44px' },
                    '&::placeholder': {
                      color: '#A9ACA9',
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: { xs: '12px 16px 16px 16px', sm: '16px 24px 24px 24px' },
            borderTop: '1px solid #E2E5E8',
            justifyContent: 'flex-end',
            gap: { xs: 1, sm: 2 },
            backgroundColor: '#FFFFFF',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <CustomButton
            variant="secondary"
            size={isMobile ? "md" : "lg"}
            onClick={() => setIsNewRoleModalOpen(false)}
            sx={{
              width: isMobile ? '100%' : 'auto',
              order: isMobile ? 2 : 1,
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant="primary"
            size={isMobile ? "md" : "lg"}
            onClick={handleCreateNewRole}
            disabled={!newRoleType || !newRoleName}
            sx={{
              width: isMobile ? '100%' : 'auto',
              order: isMobile ? 1 : 2,
            }}
          >
            Create
          </CustomButton>
        </DialogActions>
      </Dialog>
      </Box>
    </Box>
  );
};

export default RolesPermissionsList;
