import React, { useState, useMemo } from 'react';
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
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Popover,
  Portal,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Select,
  FormControl,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  FilterAltOutlined as FilterIcon,
  Search as SearchIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import {
  heading,
  tableCellCss,
  primaryTextCss,
  tableContainerCss,
} from '../../../components/common-table/widgets/common-table-widgets';
import TableSkeleton from '../../../components/common-table/TableSkeleton';
import Paginator from '../../../components/pagination/pagination';
import CustomFilterSort, { type FilterField } from '../../../components/custom-filter-sort/custom-filter-sort';
import AddNewUserDrawer from '../components/AddNewUserDrawer';
import EditNewUserDrawer from '../components/EditNewUserDrawer';
import ConfirmationPopUp from '../../../components/confirmation-pop-up/confirmation-pop-up';
import CommonSnackbar from '../../../components/common-snackbar/common-snackbar';
import { type UserFormData } from '../components/AddNewUser';
import { type UserData } from '../components/EditNewUser';

// Type definitions for better type safety
interface SnackbarState {
  isOpen: boolean;
  message: string;
  status: 'success' | 'error';
}


// Mock user data
const mockUsers: UserData[] = [
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
    namePrefix: 'Dr.',
    firstName: 'Lane',
    lastName: 'Devon',
    title: 'Doctor',
    phoneNumbers: [
      { number: '(239) 555-0108', extension: '123', use: 'office' }
    ],
    lastLoginAttempt: '03/21/2025 11:00 AM',
    passwordDaysLeft: 12,
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
    namePrefix: 'Mr.',
    firstName: 'Fisher',
    lastName: 'Cody',
    title: 'Manager',
    phoneNumbers: [
      { number: '(629) 555-0129', extension: '456', use: 'private' }
    ],
    lastLoginAttempt: '03/20/2025 09:30 AM',
    passwordDaysLeft: 8,
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
    namePrefix: 'Ms.',
    firstName: 'Cooper',
    lastName: 'Jane',
    title: 'Administrator',
    phoneNumbers: [
      { number: '(308) 555-0121', extension: '789', use: 'office' }
    ],
    lastLoginAttempt: '03/19/2025 14:15 PM',
    passwordDaysLeft: 15,
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
    namePrefix: 'Ms.',
    firstName: 'Sarah',
    lastName: 'Johnson',
    title: 'Receptionist',
    phoneNumbers: [
      { number: '(555) 123-4567', extension: '101', use: 'office' }
    ],
    lastLoginAttempt: '03/21/2025 08:45 AM',
    passwordDaysLeft: 5,
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
    namePrefix: 'Mr.',
    firstName: 'Michael',
    lastName: 'Chen',
    title: 'System Admin',
    phoneNumbers: [
      { number: '(555) 987-6543', extension: '202', use: 'private' }
    ],
    lastLoginAttempt: '03/21/2025 16:20 PM',
    passwordDaysLeft: 20,
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

// Filter fields for user management
const filterFields: FilterField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter name',
  },
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter username',
  },
  {
    id: 'role',
    label: 'Role/Preset',
    type: 'select',
    placeholder: 'Select role',
    options: [
      { value: 'Clinician', label: 'Clinician' },
      { value: 'Superuser', label: 'Superuser' },
      { value: 'Administrator', label: 'Administrator' },
      { value: 'Receptionist', label: 'Receptionist' },
      { value: 'Admin', label: 'Admin' },
    ],
  },
  {
    id: 'userEmail',
    label: 'User Email',
    type: 'text',
    placeholder: 'Enter email',
  },
  {
    id: 'office',
    label: 'Office',
    type: 'select',
    placeholder: 'Select office',
    options: [
      { value: 'Main', label: 'Main' },
      { value: 'Branch A', label: 'Branch A' },
      { value: 'Branch B', label: 'Branch B' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Select status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    id: 'organization',
    label: 'Organization',
    type: 'select',
    placeholder: 'Select organization',
    options: [
      { value: 'All', label: 'All' },
      { value: 'Healthcare Corp', label: 'Healthcare Corp' },
    ],
  },
];

/**
 * UserManagementList Component
 * 
 * A comprehensive user management interface that provides:
 * - User listing with pagination
 * - Search and filtering capabilities
 * - Archive/unarchive functionality
 * - Status management (Active/Inactive)
 * - User creation and editing
 * - Confirmation dialogs for critical actions
 * 
 * @returns {JSX.Element} The UserManagementList component
 */
const UserManagementList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Below 1024px
  
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For future loading state implementation
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [archiveFilter, setArchiveFilter] = useState<'all' | 'archived' | 'unarchived'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeFilterField, setActiveFilterField] = useState<string>('');
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({});
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<UserData | null>(null);
  const [actionAnchorEl, setActionAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedUserForAction, setSelectedUserForAction] = useState<UserData | null>(null);
  const [showArchiveConfirmation, setShowArchiveConfirmation] = useState(false);
  const [userToArchive, setUserToArchive] = useState<UserData | null>(null);
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [userToChangeStatus, setUserToChangeStatus] = useState<UserData | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isOpen: false,
    message: '',
    status: 'success'
  });

  /**
   * Handles status toggle for a user
   * @param userId - The ID of the user to toggle status for
   */
  const handleStatusToggle = (userId: number) => {
    const userToToggle = users.find(user => user.id === userId);
    if (userToToggle) {
      setUserToChangeStatus(userToToggle);
      setShowStatusConfirmation(true);
    }
  };


  /**
   * Handles action button click to show dropdown menu
   * @param event - Mouse event from the action button
   * @param user - The user data for the selected row
   */
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>, user: UserData) => {
    setActionAnchorEl(event.currentTarget);
    setSelectedUserForAction(user);
  };

  /**
   * Handles closing the action dropdown menu
   */
  const handleActionClose = () => {
    try {
      setActionAnchorEl(null);
      setSelectedUserForAction(null);
    } catch (error) {
      console.error('Error closing action menu:', error);
    }
  };

  /**
   * Handles editing a user
   * @param user - The user data to edit
   */
  const handleEditUser = (user: UserData) => {
    try {
      setSelectedUserForEdit(user);
      setIsEditUserOpen(true);
      handleActionClose();
    } catch (error) {
      console.error('Error opening edit user:', error);
    }
  };

  /**
   * Handles archiving a user
   * @param user - The user data to archive
   */
  const handleArchiveUser = (user: UserData) => {
    try {
      setUserToArchive(user);
      setShowArchiveConfirmation(true);
      handleActionClose();
    } catch (error) {
      console.error('Error opening archive confirmation:', error);
    }
  };

  /**
   * Handles opening the add new user drawer
   */
  const handleAddNewUser = () => {
    try {
      setIsAddUserOpen(true);
    } catch (error) {
      console.error('Error opening add user drawer:', error);
    }
  };

  /**
   * Handles closing the add new user drawer
   */
  const handleCloseAddUser = () => {
    try {
      setIsAddUserOpen(false);
    } catch (error) {
      console.error('Error closing add user drawer:', error);
    }
  };

  const handleSubmitNewUser = async (_data: UserFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to create the user
      // await api.post('/users', data);
      
      // For now, we'll just close the drawer
      setIsAddUserOpen(false);
      
      // Show success message
      setSnackbar({
        isOpen: true,
        message: 'User created successfully!',
        status: 'success'
      });
    } catch (error) {
      // Show error message
      setSnackbar({
        isOpen: true,
        message: 'Failed to create user. Please try again.',
        status: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles closing the edit user drawer
   */
  const handleCloseEditUser = () => {
    try {
      setIsEditUserOpen(false);
      setSelectedUserForEdit(null);
    } catch (error) {
      console.error('Error closing edit user drawer:', error);
    }
  };

  const handleSubmitEditUser = async (_data: UserFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to update the user
      // await api.put(`/users/${selectedUserForEdit?.id}`, data);
      
      // For now, we'll just close the drawer
      setIsEditUserOpen(false);
      setSelectedUserForEdit(null);
      
      // Show success message
      setSnackbar({
        isOpen: true,
        message: 'User updated successfully!',
        status: 'success'
      });
    } catch (error) {
      // Show error message
      setSnackbar({
        isOpen: true,
        message: 'Failed to update user. Please try again.',
        status: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmArchive = async () => {
    if (!userToArchive) return;

    setIsSubmitting(true);

    try {
      const isCurrentlyArchived = userToArchive.isArchived;
      const newArchiveStatus = !isCurrentlyArchived;

      // Here you would typically make an API call to archive/unarchive the user
      // await api.patch(`/users/${userToArchive.id}`, { isArchived: newArchiveStatus });
      
      // For now, we'll update the local state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userToArchive.id ? { ...user, isArchived: newArchiveStatus } : user
        )
      );

      // Show success message
      setSnackbar({
        isOpen: true,
        message: `User "${userToArchive.name}" has been ${newArchiveStatus ? 'archived' : 'unarchived'} successfully!`,
        status: 'success'
      });

      // Close confirmation popup
      setShowArchiveConfirmation(false);
      setUserToArchive(null);
    } catch (error) {
      // Show error message
      setSnackbar({
        isOpen: true,
        message: `Failed to ${userToArchive.isArchived ? 'unarchive' : 'archive'} user. Please try again.`,
        status: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles canceling archive operation
   */
  const handleCancelArchive = () => {
    try {
      setShowArchiveConfirmation(false);
      setUserToArchive(null);
    } catch (error) {
      console.error('Error canceling archive:', error);
    }
  };

  const handleConfirmStatusChange = async () => {
    if (!userToChangeStatus) return;

    setIsSubmitting(true);

    try {
      const newStatus = !userToChangeStatus.status;

      // Here you would typically make an API call to update the user status
      // await api.patch(`/users/${userToChangeStatus.id}`, { status: newStatus });
      
      // For now, we'll update the local state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userToChangeStatus.id ? { ...user, status: newStatus } : user
        )
      );

      // Show success message
      setSnackbar({
        isOpen: true,
        message: `User "${userToChangeStatus.name}" status has been changed to ${newStatus ? 'Active' : 'Inactive'} successfully!`,
        status: 'success'
      });

      // Close confirmation popup
      setShowStatusConfirmation(false);
      setUserToChangeStatus(null);
    } catch (error) {
      // Show error message
      setSnackbar({
        isOpen: true,
        message: `Failed to update user status. Please try again.`,
        status: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles canceling status change operation
   */
  const handleCancelStatusChange = () => {
    try {
      setShowStatusConfirmation(false);
      setUserToChangeStatus(null);
    } catch (error) {
      console.error('Error canceling status change:', error);
    }
  };

  /**
   * Handles closing the snackbar
   */
  const handleSnackbarClose = () => {
    try {
      setSnackbar(prev => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error('Error closing snackbar:', error);
    }
  };

  /**
   * Filters users based on search term, archive filter, and applied filters
   * @returns Filtered array of users
   */
  const filteredUsers = useMemo(() => {
    try {
      let filtered = users;

      // Apply archive filter
      if (archiveFilter === 'archived') {
        filtered = filtered.filter(user => user.isArchived === true);
      } else if (archiveFilter === 'unarchived') {
        filtered = filtered.filter(user => user.isArchived !== true);
      }
      // If archiveFilter === 'all', show all users

      // Apply search term filter
      if (searchTerm && searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(user =>
          (user.name?.toLowerCase().includes(searchLower)) ||
          (user.username?.toLowerCase().includes(searchLower)) ||
          (user.role?.toLowerCase().includes(searchLower)) ||
          (user.userEmail?.toLowerCase().includes(searchLower)) ||
          (user.alertEmail?.toLowerCase().includes(searchLower)) ||
          (user.office?.toLowerCase().includes(searchLower)) ||
          (user.organization?.toLowerCase().includes(searchLower))
        );
      }

      // Apply additional filters
      Object.entries(appliedFilters).forEach(([filterKey, filterValue]) => {
        if (filterValue && filterValue.trim()) {
          filtered = filtered.filter(user => {
            try {
              switch (filterKey) {
                case 'name':
                  return user.name?.toLowerCase().includes(filterValue.toLowerCase());
                case 'username':
                  return user.username?.toLowerCase().includes(filterValue.toLowerCase());
                case 'role':
                  return user.role === filterValue;
                case 'userEmail':
                  return user.userEmail?.toLowerCase().includes(filterValue.toLowerCase());
                case 'office':
                  return user.office === filterValue;
                case 'status':
                  const isActive = filterValue === 'active';
                  return user.status === isActive;
                case 'organization':
                  return user.organization === filterValue;
                default:
                  return true;
              }
            } catch (error) {
              console.error(`Error filtering by ${filterKey}:`, error);
              return true; // Include user if filter fails
            }
          });
        }
      });

      return filtered;
    } catch (error) {
      console.error('Error filtering users:', error);
      return users; // Return all users if filtering fails
    }
  }, [users, searchTerm, archiveFilter, appliedFilters]);

  /**
   * Paginates the filtered users data
   * @returns Paginated array of users
   */
  const paginatedUsers = useMemo(() => {
    try {
      const startIndex = currentPage * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      return filteredUsers.slice(startIndex, endIndex);
    } catch (error) {
      console.error('Error paginating users:', error);
      return [];
    }
  }, [filteredUsers, currentPage, recordsPerPage]);

  // Calculate pagination values with error handling
  const totalPages = useMemo(() => {
    try {
      return Math.max(1, Math.ceil(filteredUsers.length / recordsPerPage));
    } catch (error) {
      console.error('Error calculating total pages:', error);
      return 1;
    }
  }, [filteredUsers.length, recordsPerPage]);

  /**
   * Handles page change with validation
   * @param _event - Unused event parameter
   * @param page - The new page number
   */
  const handlePageChange = (_event: React.ChangeEvent<unknown> | null, page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  /**
   * Handles records per page change with validation
   * @param newRecordsPerPage - The new number of records per page
   */
  const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
    if (newRecordsPerPage > 0) {
      setRecordsPerPage(newRecordsPerPage);
      setCurrentPage(0); // Reset to first page when changing records per page
    }
  };

  /**
   * Handles archive filter change with validation
   * @param value - The new archive filter value
   */
  const handleArchiveFilterChange = (value: 'all' | 'archived' | 'unarchived') => {
    const validValues: Array<'all' | 'archived' | 'unarchived'> = ['all', 'archived', 'unarchived'];
    if (validValues.includes(value)) {
      setArchiveFilter(value);
      setCurrentPage(0); // Reset to first page when changing filter
    }
  };

  /**
   * Handles filter button click with validation
   * @param event - Mouse event from the filter button
   */
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setFilterAnchorEl(event.currentTarget);
      setIsFilterOpen(true);
      if (!activeFilterField && filterFields.length > 0) {
        setActiveFilterField(filterFields[0].id);
      }
    } catch (error) {
      console.error('Error opening filter:', error);
    }
  };

  /**
   * Handles filter field change with validation
   * @param fieldId - The ID of the selected filter field
   */
  const handleFilterFieldChange = (fieldId: string) => {
    const validFieldIds = filterFields.map(field => field.id);
    if (validFieldIds.includes(fieldId)) {
      setActiveFilterField(fieldId);
    }
  };

  const handleFilterValueChange = (_fieldId: string, _value: string) => {
    // This will be handled by the CustomFilterSort component internally
  };

  /**
   * Handles applying filters with validation
   * @param filters - Object containing filter key-value pairs
   */
  const handleApplyFilters = (filters: Record<string, string>) => {
    try {
      setAppliedFilters(filters);
      setCurrentPage(0); // Reset to first page when applying filters
      setIsFilterOpen(false);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  /**
   * Handles clearing all filters
   */
  const handleClearAllFilters = () => {
    try {
      setAppliedFilters({});
      setCurrentPage(0); // Reset to first page when clearing filters
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  /**
   * Handles canceling filter operations
   */
  const handleCancelFilters = () => {
    try {
      setIsFilterOpen(false);
      setFilterAnchorEl(null);
    } catch (error) {
      console.error('Error canceling filters:', error);
    }
  };

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '93vh', // Use full viewport height
        backgroundColor: '#F6F6F6', // Background/BG 1 from Figma
        overflow: 'hidden', // Prevent page-level scrolling
      }}
    >
      {/* Header with title and New User button */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: { xs: '12px 16px', sm: '16px 16px 12px' },
          backgroundColor: '#FAFAFA',
          width: '100%',
          boxSizing: 'border-box',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
          flexShrink: 0, // Prevent shrinking
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

      {/* Divider line */}
      <Box
        sx={{
          height: '1px',
          backgroundColor: '#E7E9EB', // Border/02 from Figma
          flexShrink: 0, // Prevent shrinking
        }}
      />

      {/* Search and Filter Section */}
      <Box sx={{ flexShrink: 0 }}> {/* Prevent shrinking */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            padding: '16px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E5E8',
          }}
        >
          {/* Left side - Empty for now */}
          <Box sx={{ flex: 1 }} />

          {/* Right side - Search and Filter Elements */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px', // Gap between elements
            }}
          >
            {/* Archive Filter Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={archiveFilter}
                onChange={(e) => handleArchiveFilterChange(e.target.value as 'all' | 'archived' | 'unarchived')}
                displayEmpty
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  border: '1px solid #CDD0CD', // Neutral/20
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Shadow/xs
                  '&:hover': {
                    borderColor: '#A9ACA9', // Neutral/40
                  },
                  '&.Mui-focused': {
                    borderColor: '#439322', // Primary color
                    boxShadow: '0px 0px 0px 3px rgba(67, 147, 34, 0.1)',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none', // Remove default border
                  },
                  '& .MuiSelect-select': {
                    padding: '8px 10px',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '1.6',
                    color: '#424342', // Neutral/70
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  },
                }}
                IconComponent={KeyboardArrowDownIcon}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="unarchived">Unarchived</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>

            {/* Filter Button */}
            <IconButton
              onClick={handleFilterClick}
              sx={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #C5C9C5', // Neutral/30
                borderRadius: '6px',
                padding: '10px',
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Shadow/xs
                '&:hover': {
                  backgroundColor: '#F9FAF9', // Neutral/1
                  borderColor: '#A9ACA9', // Neutral/40
                },
              }}
            >
              <FilterIcon 
                sx={{ 
                  width: 18, 
                  height: 18, 
                  color: '#2C2D2C' // Neutral/80
                }} 
              />
            </IconButton>

            {/* Search Section */}
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                width: '320px',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF',
                  borderRadius: '6px',
                  border: '1px solid #CDD0CD', // Neutral/20
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Shadow/xs
                  '&:hover': {
                    borderColor: '#A9ACA9', // Neutral/40
                  },
                  '&.Mui-focused': {
                    borderColor: '#439322', // Primary color
                    boxShadow: '0px 0px 0px 3px rgba(67, 147, 34, 0.1)',
                  },
                  '& fieldset': {
                    border: 'none', // Remove default border
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '8px 10px',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#A9ACA9', // Neutral/40 for placeholder
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  '&::placeholder': {
                    color: '#A9ACA9', // Neutral/40
                    opacity: 1,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon 
                      sx={{ 
                        width: 18, 
                        height: 18, 
                        color: '#757775' // Neutral/60
                      }} 
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Table with Fixed Pagination */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0, // Allow flex child to shrink below content size
        }}
      >
        {/* Users Table */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            height: "100%",
            position: "relative",
            overflow: "hidden", // Prevent container from scrolling
          }}
        >
          {/* Table Container - Only this part scrolls */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              minHeight: 0, // Allow flex child to shrink
            }}
          >
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
                        top: 0,
                        backgroundColor: '#F6F6F6',
                        zIndex: 3,
                        
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
                          position: 'sticky',
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
                        position: 'sticky',
                        left: 0,
                        top: 0,
                        backgroundColor: '#F6F6F6',
                        zIndex: 3,
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
                  {paginatedUsers.map((user) => (
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
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 6px',
                              backgroundColor: '#F9FAF9',
                              borderRadius: '40px',
                              cursor: 'pointer',
                            }}
                            onClick={() => handleStatusToggle(user.id)}
                          >
                            <Box
                              sx={{
                                width: '36px',
                                height: '20px',
                                backgroundColor: user.status ? '#439322' : '#DDE0DD',
                                borderRadius: '12px',
                                padding: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                justifyContent: user.status ? 'flex-end' : 'flex-start',
                              }}
                            >
                              <Box
                                sx={{
                                  width: '16px',
                                  height: '16px',
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: '50%',
                                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
                                }}
                              />
                            </Box>
                            <Typography sx={{
                              fontSize: { xs: '13px', sm: '14px' },
                              color: '#424342',
                              fontFamily: '"Helvetica Neue", Arial, sans-serif',
                              fontWeight: 400,
                              lineHeight: '1.2',
                            }}>
                              {user.status ? 'Active' : 'Inactive'}
                            </Typography>
                          </Box>
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
                        }}>
                          <IconButton
                            onClick={(e) => handleActionClick(e, user)}
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
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
              </TableContainer>
            </Paper>
          </Box>

          {/* Fixed Pagination at Bottom */}
          {!isLoading && filteredUsers.length > 0 && (
            <Box
              sx={{
                position: "static",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#FFFFFF",
                borderTop: "1px solid #E7E9EB", // Border/02
                borderRadius: "0px 0px 10px 10px",
                zIndex: 1000,
                boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.1)", // Add shadow for better visibility
                marginTop: "-8px", // Move the pagination box up by 8px
              }}
            >
              <Paginator
                page={currentPage}
                totalPages={totalPages}
                totalRecord={filteredUsers.length}
                onPageChange={handlePageChange}
                onRecordsPerPageChange={handleRecordsPerPageChange}
                defaultSize={recordsPerPage}
              />
            </Box>
          )}
        </Box>
      </Box>


      {/* Action Dropdown Menu */}
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionClose}
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
          onClick={() => selectedUserForAction && handleEditUser(selectedUserForAction)}
          sx={{
            padding: '10px 14px',
            gap: '8px',
            '&:hover': {
              backgroundColor: 'rgba(67, 147, 34, 0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '18px' }}>
            <EditOutlinedIcon 
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
          onClick={() => selectedUserForAction && handleArchiveUser(selectedUserForAction)}
          sx={{
            padding: '10px 14px',
            gap: '8px',
            '&:hover': {
              backgroundColor: 'rgba(67, 147, 34, 0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '18px' }}>
            <ArchiveOutlinedIcon 
              sx={{ 
                width: 18, 
                height: 18, 
                color: '#2C2D2C' // Neutral/80
              }} 
            />
          </ListItemIcon>
          <ListItemText
            primary={selectedUserForAction?.isArchived ? "Unarchive" : "Archive"}
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

      {/* Filter Popover */}
      <Popover
        open={isFilterOpen}
        anchorEl={filterAnchorEl}
        onClose={handleCancelFilters}
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
            mt: 1,
            borderRadius: '8px',
            boxShadow: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
            border: '1px solid #DDE0DD',
            overflow: 'hidden',
          },
        }}
      >
        <CustomFilterSort
          type="filter"
          size="md"
          filterFields={filterFields}
          activeFilterField={activeFilterField}
          onFilterFieldChange={handleFilterFieldChange}
          onFilterValueChange={handleFilterValueChange}
          onClearAll={handleClearAllFilters}
          onApply={handleApplyFilters}
          onCancel={handleCancelFilters}
        />
      </Popover>

    </Box>

    {/* Add New User Drawer - Rendered in Portal to ensure proper z-index */}
    <Portal>
      <AddNewUserDrawer
        open={isAddUserOpen}
        onSubmit={handleSubmitNewUser}
        onClose={handleCloseAddUser}
      />
    </Portal>

    {/* Edit User Drawer - Rendered in Portal to ensure proper z-index */}
    <Portal>
      {selectedUserForEdit && (
        <EditNewUserDrawer
          open={isEditUserOpen}
          userData={selectedUserForEdit}
          onSubmit={handleSubmitEditUser}
          onClose={handleCloseEditUser}
        />
      )}
    </Portal>

    {/* Confirmation Popup for Archive/Unarchive */}
    <ConfirmationPopUp
      open={showArchiveConfirmation}
      onClose={handleCancelArchive}
      onConfirm={handleConfirmArchive}
      message={userToArchive ? `Are you sure you want to ${userToArchive.isArchived ? 'unarchive' : 'archive'} user "${userToArchive.name}"? ${userToArchive.isArchived ? 'This will restore the user and make them active again.' : 'This action can be undone later.'}` : ''}
      sx={{ zIndex: 9999 }}
    />

    {/* Confirmation Popup for Status Change */}
    <ConfirmationPopUp
      open={showStatusConfirmation}
      onClose={handleCancelStatusChange}
      onConfirm={handleConfirmStatusChange}
      message={userToChangeStatus ? `Are you sure you want to change user "${userToChangeStatus.name}" status from ${userToChangeStatus.status ? 'Active' : 'Inactive'} to ${!userToChangeStatus.status ? 'Active' : 'Inactive'}?` : ''}
      sx={{ zIndex: 9999 }}
    />

    {/* Common Snackbar */}
    <CommonSnackbar
      isOpen={snackbar.isOpen}
      message={snackbar.message}
      status={snackbar.status}
      onClose={handleSnackbarClose}
      position="bottom-right"
      autoClose={true}
      autoCloseDelay={5000}
    />
    </>
  );
};

export default UserManagementList;
