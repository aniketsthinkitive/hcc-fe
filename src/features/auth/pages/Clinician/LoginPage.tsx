import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { LoginForm } from '../../components/LoginForm';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../../../assets/images/logo-main.svg?url';
import { GridContainer, GridRow, GridColumn } from '../../../../components/grid';

export const LoginPage: React.FC = () => {
  const theme = useTheme();
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
        minHeight: '100vh',
        backgroundColor: '#ECF2F3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
      }}
    >
      <GridContainer maxWidth="sm">
        <GridRow>
          <GridColumn mobile={4} tablet={8} desktop={12}>
            {/* Logo */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
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
                borderRadius: 3,
                boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.04)',
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
                  Login To Your Account
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
  );
};

export default LoginPage;
