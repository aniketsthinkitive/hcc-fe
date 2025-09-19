import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
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
} from '@mui/icons-material';
import CommonNavbar from '../components/nav-bar/CommonNavbar';
import Logo from '../components/Logo';
import { useAuth } from '../features/auth/hooks/useAuth';

// Navigation item interface
interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roleAccess?: string[];
}

const AdminLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Navigation items configuration
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

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => 
    !item.roleAccess || item.roleAccess.includes(user?.role || 'admin')
  );

  // Auto-open mobile drawer when navigating to admin routes
  useEffect(() => {
    if (isMobile && location.pathname.startsWith('/admin')) {
      setMobileOpen(true);
    }
  }, [location.pathname, isMobile]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ 
        p: theme.spacing(3), 
        display: 'flex', 
        alignItems: 'center', 
        borderBottom: `1px solid ${theme.palette.divider}` 
      }}>
        <Logo />
      </Box>
      <List sx={{ p: 1 }}>
        {filteredNavItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={isActiveRoute(item.path)}
              sx={{
                borderRadius: theme.shape.borderRadius,
                mx: 1,
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light + '20',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '20',
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: isActiveRoute(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                minWidth: 40,
                '& svg': {
                  fontSize: '18px',
                }
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{ 
                  color: isActiveRoute(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                  '& .MuiListItemText-primary': {
                    fontWeight: theme.typography.fontWeightRegular,
                    fontSize: theme.typography.body2.fontSize,
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <CommonNavbar onDrawerToggle={handleDrawerToggle} />
      
      {/* Desktop Sidebar Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
              pt: 8, // Account for fixed AppBar height
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8, // Account for fixed AppBar height
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)', // Full height minus AppBar
          ml: { xs: 0, md: 0 }, // No left margin since we have permanent drawer
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
