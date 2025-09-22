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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  
  AccountCircle,
  Logout,
  Settings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import logo from '../../assets/images/logo.svg?url';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import refferalicon from '../../assets/icons/stethoscope_arrow.png'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
 
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';  
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Below 1024px
  const isTablet = useMediaQuery(theme.breakpoints.down('lg')); // Below 1440px
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [navMenuAnchor, setNavMenuAnchor] = useState<null | HTMLElement>(null);

  // Navigation items configuration - Updated for counseling system
  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <DashboardOutlinedIcon />, roleAccess: ['admin', 'counselor', 'patient'] },
    { label: 'Scheduling', path: '/admin/scheduling', icon: <CalendarMonthOutlinedIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Clients', path: '/admin/clients', icon: <PersonOutlinedIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Groups', path: '/admin/groups', icon: <Groups2OutlinedIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Treatments', path: '/admin/treatments', icon: <HealthAndSafetyOutlinedIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Billing', path: '/admin/billing', icon: <AttachMoneyOutlinedIcon />, roleAccess: ['admin', 'counselor', 'patient'] },
    { label: 'Referral', path: '/admin/referral', icon: <img src={refferalicon} alt="Referral" style={{width: '18px', height: '18px'}} />, roleAccess: ['admin', 'counselor'] },
    { label: 'Reports', path: '/admin/reports', icon: <BarChartOutlinedIcon />, roleAccess: ['admin'] },
    { label: 'Forms', path: '/admin/forms', icon: <DescriptionOutlinedIcon />, roleAccess: ['admin', 'counselor'] },
    { label: 'Admin', path: '/admin/settings', icon: <SettingsOutlinedIcon />, roleAccess: ['admin'] },
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

  const handleNavMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenuAnchor(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setNavMenuAnchor(null);
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
          backgroundColor: '#FFFFFF',
          color: '#2C2D2C',
          boxShadow: 'none',
          borderBottom: '1px solid #E7E9EB',
          height: '62px',
        }}
      >
        <Toolbar sx={{ 
          minHeight: '62px !important', 
          padding: '8px 16px', // Top: 8px, Right: 16px, Bottom: 8px, Left: 16px
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
        }}>
          {/* Left side - Mobile menu and Logo */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, // 8px
            flexShrink: 0,
            marginRight: 3, // 24px gap between logo and menu items
          }}>
            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  color: theme.palette.text.primary,
                  p: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <MenuIcon sx={{ fontSize: { xs: '20px', sm: '24px' } }} />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              component="img"
              src={logo}
              alt="5280 Human Care Center Logo"
              sx={{
                width: { xs: 30, sm: 35 },
                height: { xs: 40, sm: 46 },
                maxWidth: '100%',
                
              }}
            />
          </Box>

          {/* Navigation Tabs - Takes full remaining width */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flex: 1,
              gap: 0,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}>
              {filteredNavItems.slice(0, isTablet ? 5 : filteredNavItems.length).map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: isActiveRoute(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                    fontFamily: 'Helvetica Neue',
                    fontWeight: 400,
                    fontSize: { xs: '14px', sm: '15px', md: '16px' },
                    textTransform: 'none',
                    px: { xs: 1.5, sm: 2 }, // 12px, 16px
                    py: 1.5, // 12px
                    borderRadius: '8px 8px 0 0',
                    backgroundColor: isActiveRoute(item.path) ? '#EFFFE3' : theme.palette.background.paper,
                    borderBottom: isActiveRoute(item.path) ? `2px solid ${theme.palette.primary.dark}` : '2px solid transparent',
                    minHeight: { xs: '40px', sm: '46px' },
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                      backgroundColor: isActiveRoute(item.path) ? '#EFFFE3' : 'rgba(0, 0, 0, 0.04)',
                      color: isActiveRoute(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                    },
                    '& .MuiButton-startIcon': {
                      marginRight: { xs: '6px', sm: '8px' },
                      marginLeft: 0,
                      '& svg': {
                        fontSize: { xs: '16px', sm: '18px' },
                        width: { xs: '16px', sm: '18px' },
                        height: { xs: '16px', sm: '18px' },
                      }
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {isTablet && filteredNavItems.length > 5 && (
                <Button
                  onClick={handleNavMenuOpen}
                  sx={{
                    color: theme.palette.text.primary,
                    fontFamily: 'Helvetica Neue',
                    fontWeight: 400,
                    fontSize: { xs: '14px', sm: '15px', md: '16px' },
                    textTransform: 'none',
                    px: { xs: 1.5, sm: 2 },
                    py: 1.5,
                    borderRadius: '8px 8px 0 0',
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: '2px solid transparent',
                    minHeight: { xs: '40px', sm: '46px' },
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  More
                </Button>
              )}
            </Box>
          )}

          {/* Right side - Actions */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, sm: 1 }, // 4px, 8px
            flexShrink: 0 
          }}>
            {/* Search button */}
            <IconButton 
              aria-label="search"
              sx={{ 
                color: theme.palette.text.primary,
                width: { xs: '28px', sm: '32px' },
                height: { xs: '28px', sm: '32px' },
                borderRadius: theme.shape.borderRadius,
                padding: 1, // 8px
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <SearchIcon sx={{ 
                fontSize: { xs: '18px', sm: '18px' }, 
                width: { xs: '18px', sm: '18px' }, 
                height: { xs: '18px', sm: '18px' } 
              }} />
            </IconButton>

            {/* Notifications button */}
            <IconButton 
              aria-label="notifications"
              sx={{ 
                color: theme.palette.text.primary,
                width: { xs: '30px', sm: '30px' },
                height: { xs: '30px', sm: '30px' },
                borderRadius: theme.shape.borderRadius,
                padding: 1, // 8px
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <NotificationsIcon sx={{ 
                fontSize: { xs: '18px', sm: '18px' }, 
                width: { xs: '18px', sm: '18px' }, 
                height: { xs: '18px', sm: '18px' } 
              }} />
            </IconButton>

            {/* User menu */}
            <Box 
              onClick={handleUserMenuOpen}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, // 8px
                ml: { xs: 1, sm: 1.5 }, // 8px, 12px
                cursor: 'pointer',
                borderRadius: theme.shape.borderRadius,
                padding: 0.5, // 4px
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <Avatar sx={{ 
                width: { xs: '20px', sm: '24px' }, 
                height: { xs: '20px', sm: '24px' }, 
                bgcolor: theme.palette.primary.main,
                fontSize: { xs: '10px', sm: '12px' },
                fontWeight: 500,
              }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ 
                  fontSize: { xs: '15px', sm: '14px', md: '15px' },
                  color: '#2C2D2C',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography sx={{ 
                  fontSize: { xs: '15px', sm: '14px' },
                  color: '#2C2D2C',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  textTransform: 'capitalize',
                }}>
                  {user?.role || 'Admin'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
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
        disableAutoFocusItem
        disableEnforceFocus
        disableRestoreFocus
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

      {/* Navigation More Menu */}
      <Menu
        anchorEl={navMenuAnchor}
        open={Boolean(navMenuAnchor)}
        onClose={handleNavMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
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
        disableAutoFocusItem
        disableEnforceFocus
        disableRestoreFocus
      >
        {filteredNavItems.slice(6).map((item) => (
          <MenuItem 
            key={item.path}
            onClick={() => { 
              handleNavigation(item.path); 
              handleNavMenuClose(); 
            }}
            sx={{ 
              py: 1.5, 
              px: 3,
              '&:hover': {
                backgroundColor: theme.palette.primary.light + '20',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <Typography sx={{ 
              fontSize: theme.typography.body2.fontSize, 
              color: theme.palette.text.primary, 
              fontWeight: theme.typography.fontWeightRegular 
            }}>{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
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
        <Box sx={{ p: 2 }}>
          {/* Logo in drawer */}
          <Box
            component="img"
            src={logo}
            alt="5280 Human Care Center Logo"
            sx={{
              width: 35,
              height: 46,
              mb: 3,
            }}
          />
          
          {/* Navigation items */}
          <List>
            {filteredNavItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={isActiveRoute(item.path)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: '#EFFFE3',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: '#EFFFE3',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40,
                    color: isActiveRoute(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '14px',
                      fontWeight: isActiveRoute(item.path) ? 500 : 400,
                      color: isActiveRoute(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

    </>
  );
};

export default CommonNavbar;
