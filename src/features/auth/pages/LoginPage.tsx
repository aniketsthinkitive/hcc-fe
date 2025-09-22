import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';
import logo from '../../../assets/images/logo-main.svg?url';
import LoginSlideshow from '../components/LoginSlideshow';
import { GridContainer, GridRow, GridColumn } from '../../../components/grid';



export const LoginPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated, user, getRedirectPathForCurrentUser } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getRedirectPathForCurrentUser();
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, getRedirectPathForCurrentUser]);

  const handleLoginSuccess = () => {
    // The useEffect above will handle the redirect
    // This is just a callback for any additional logic
  };

  if (isAuthenticated) {
    return null; // Prevent flash of login page while redirecting
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden',
      }}
    >
      {/* Marketing Section - Left Column */}
      {!isMobile && (
        <Box
          sx={{
            flex: '0 0 50%',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <LoginSlideshow />
        </Box>
      )}

      {/* Login Section - Right Column */}
      <Box
        sx={{
          flex: { xs: '1', md: '0 0 50%' },
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: theme.spacing(2), md: theme.spacing(4) },
          height: { xs: '100vh', md: '100vh' },
          overflow: 'auto',
        }}
      >
        <GridContainer maxWidth="sm">
          <GridRow>
            <GridColumn mobile={4} tablet={8} desktop={12}>
              {/* Logo */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Box
                  component="img"
                  src={logo}
                  alt="5280 Human Care Center Logo"
                  sx={{
                    width: { xs: 180, sm: 200, md: 230 },
                    height: 'auto',
                    maxWidth: '100%',
                  }}
                />
              </Box>

              {/* Login Card */}
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  maxWidth: 480,
                  margin: '0 auto',
                  padding: theme.spacing(3),
                  borderRadius: 1,
                  boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.08)',
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    gap: 1,
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'left',
                      color: 'black',
                      mb: 1,
                    }}
                  >
                    Sign In To Your Account
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'left',
                      color: theme.palette.text.secondary,
                      maxWidth: 300,
                    }}
                  >
                  Use your new credentials to access provider account
                  </Typography>
                </Box>

                {/* Login Form */}
                <LoginForm onSuccess={handleLoginSuccess} />
              </Paper>
            </GridColumn>
          </GridRow>
        </GridContainer>
      </Box>
    </Box>
  );
};

export default LoginPage;
