import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ListItemIcon,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Group as GroupIcon,
  LocalHospital as TreatmentIcon,
  Payment as BillingIcon,
  Share as ReferralIcon,
  Assessment as ReportsIcon,
  Description as FormsIcon,
  AdminPanelSettings as AdminIcon,
  AccountCircle,
  Logout,
  Settings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import Logo from '../Logo';
import { GridContainer, GridRow, GridColumn } from '../grid';

// Simple navigation item interface
interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roleAccess?: string[];
}

interface CommonNavbarProps {
  onDrawerToggle?: () => void;
}

const CommonNavbar: React.FC<CommonNavbarProps> = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Navigation items configuration - Updated for counseling system
  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon />, roleAccess: ['admin', 'counselor', 'patient'] },
    { label: 'Scheduling', path: '/admin/scheduling', icon: <EventIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Clients', path: '/admin/clients', icon: <PeopleIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Groups', path: '/admin/groups', icon: <GroupIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Treatments', path: '/admin/treatments', icon: <TreatmentIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Billing', path: '/admin/billing', icon: <BillingIcon />, roleAccess: ['admin', 'counselor', 'patient'] },
    { label: 'Referral', path: '/admin/referral', icon: <ReferralIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Reports', path: '/admin/reports', icon: <ReportsIcon />, roleAccess: ['admin'] },
    { label: 'Forms', path: '/admin/forms', icon: <FormsIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Admin', path: '/admin/settings', icon: <AdminIcon />, roleAccess: ['admin'] },
  ];

  // Filter nav items based on user role (simplified for new project)
  const filteredNavItems = navItems.filter(item => 
    !item.roleAccess || item.roleAccess.includes(user?.role || 'admin')
  );

  const handleDrawerToggle = () => {
    if (onDrawerToggle) {
      onDrawerToggle();
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile && onDrawerToggle) {
      onDrawerToggle();
    } else if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleUserMenuClose();
    await logout();
    navigate('/login');
  };

  const isActiveRoute = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };


  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
          height: '64px',
        }}
      >
        <GridContainer fluid>
          <Toolbar sx={{ minHeight: '64px !important', px: 0 }}>
            <GridRow alignItems="center" justifyContent="space-between">
              {/* Left side - Mobile menu and Logo */}
              <GridColumn auto>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* Mobile menu button */}
                  {isMobile && (
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ 
                        mr: 2,
                        color: theme.palette.text.primary,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light + '20',
                        }
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}

                  {/* Logo */}
                  <Logo size="small" />
                </Box>
              </GridColumn>

              {/* Center - Desktop Navigation */}
              {!isMobile && (
                <GridColumn auto>
                  <Box sx={{ display: 'flex', gap: 0 }}>
                    {filteredNavItems.map((item) => (
                      <Button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        startIcon={item.icon}
                        sx={{
                          color: isActiveRoute(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                          fontWeight: theme.typography.fontWeightRegular,
                          fontSize: theme.typography.body2.fontSize,
                          textTransform: 'none',
                          px: 2,
                          py: 1,
                          borderRadius: 0,
                          backgroundColor: isActiveRoute(item.path) ? theme.palette.primary.light + '20' : 'transparent',
                          borderBottom: isActiveRoute(item.path) ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                          minHeight: '46px',
                          position: 'relative',
                          '&:hover': {
                            backgroundColor: isActiveRoute(item.path) ? theme.palette.primary.light + '20' : theme.palette.grey[100],
                            color: isActiveRoute(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                          },
                          '& .MuiButton-startIcon': {
                            marginRight: '6px',
                            '& svg': {
                              fontSize: '18px',
                            }
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Box>
                </GridColumn>
              )}

              {/* Right side - Actions */}
              <GridColumn auto>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {/* Search button */}
                  <IconButton 
                    aria-label="search"
                    sx={{ 
                      color: theme.palette.text.primary,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light + '20',
                      }
                    }}
                  >
                    <SearchIcon />
                  </IconButton>

                  {/* User menu */}
                  <IconButton
                    onClick={handleUserMenuOpen}
                    sx={{ 
                      ml: 1,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light + '20',
                      }
                    }}
                  >
                    <Avatar sx={{ 
                      width: 30, 
                      height: 30, 
                      bgcolor: theme.palette.primary.main,
                      fontSize: '12px',
                      fontWeight: theme.typography.fontWeightMedium,
                    }}>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </Avatar>
                  </IconButton>
                </Box>
              </GridColumn>
            </GridRow>
          </Toolbar>
        </GridContainer>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
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
            minWidth: 200,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[3],
            border: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        <MenuItem disabled sx={{ py: 2, px: 3 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: theme.typography.fontWeightRegular, 
              color: theme.palette.text.primary 
            }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" sx={{ 
              color: theme.palette.text.secondary, 
              fontWeight: theme.typography.fontWeightRegular 
            }}>
              {user?.email}
            </Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ borderColor: theme.palette.divider }} />
        <MenuItem 
          onClick={() => { handleUserMenuClose(); navigate('/admin/profile'); }}
          sx={{ 
            py: 1.5, 
            px: 3,
            '&:hover': {
              backgroundColor: theme.palette.primary.light + '20',
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <AccountCircle fontSize="small" sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <Typography sx={{ 
            fontSize: theme.typography.body2.fontSize, 
            color: theme.palette.text.primary, 
            fontWeight: theme.typography.fontWeightRegular 
          }}>Profile</Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => { handleUserMenuClose(); navigate('/admin/settings'); }}
          sx={{ 
            py: 1.5, 
            px: 3,
            '&:hover': {
              backgroundColor: theme.palette.primary.light + '20',
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Settings fontSize="small" sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <Typography sx={{ 
            fontSize: theme.typography.body2.fontSize, 
            color: theme.palette.text.primary, 
            fontWeight: theme.typography.fontWeightRegular 
          }}>Settings</Typography>
        </MenuItem>
        <Divider sx={{ borderColor: theme.palette.divider }} />
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            py: 1.5, 
            px: 3,
            '&:hover': {
              backgroundColor: theme.palette.error.light + '20',
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Logout fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <Typography sx={{ 
            fontSize: theme.typography.body2.fontSize, 
            color: theme.palette.error.main, 
            fontWeight: theme.typography.fontWeightRegular 
          }}>Logout</Typography>
        </MenuItem>
      </Menu>

    </>
  );
};

export default CommonNavbar;
