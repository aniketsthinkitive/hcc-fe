import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import logo from '../../../../assets/images/logo-main.svg?url';
import { GridContainer, GridRow, GridColumn } from '../../../../components/grid';
import CustomButton from '../../../../components/custom-buttons/custom-buttons';

export const ForgotPassword: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Get email from location state (passed from login page)
  const email = location.state?.email || 'user@example.com';
  
  // Mask email for privacy (show first 3 characters + **** + domain)
  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 3) {
      return `${localPart[0]}*******@${domain}`;
    }
    return `${localPart.substring(0, 3)}*******@${domain}`;
  };

  const maskedEmail = maskEmail(email);

  // Handle resend functionality with rate limiting
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setIsResending(true);
    
    try {
      // TODO: Implement API call to resend password reset email
      console.log('Resending password reset email to:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set cooldown period (60 seconds)
      setResendCooldown(60);
      
      // Start countdown
      const countdown = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/clinician/login');
  };

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
                  width: { xs: 180, sm: 200, md: 250, lg: 280 }, 
                  height: 'auto',
                  maxWidth: '100%',
                }}
              />
            </Box>

            {/* Forgot Password Card */}
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                maxWidth: { xs: 468, sm: 520, md: 580, lg: 640 },  
                margin: '0 auto',
                padding: { xs: '24px 28px', sm: '28px 32px', md: '32px 36px' },  
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
                  gap: 1.5,  
                  mb: 4,
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
                  Forgot Password?
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'left',
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '16px', sm: '17px', md: '18px', lg: '19px' },  
                    lineHeight: 1.2,
                    fontWeight: 400,  
                  }}
                >
                  We have sent link to{' '}
                  <Box component="span" sx={{ fontWeight: 500 ,color: theme.palette.text.primary}}>
                    {maskedEmail}
                  </Box>
                </Typography>
              </Box>

              {/* Content */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4, 
                }}
              >
                {/* Resend Section */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '16px', sm: '17px', md: '18px', lg: '19px' },  
                      lineHeight: 1.15,
                      letterSpacing: '0.8%',
                    }}
                  >
                    Didn't receive the link?
                  </Typography>
                  
                  <Box 
                    component="button"
                    onClick={handleResend}
                    disabled={isResending || resendCooldown > 0}
                    sx={{
                      minWidth: 'auto',
                      padding: '4px 8px',
                      fontSize: { xs: '16px', sm: '17px', md: '18px', lg: '19px' },
                      fontWeight: 600,
                      lineHeight: 1.15,
                      color: '#439322',  
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                      textTransform: 'none',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      outline: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(67, 147, 34, 0.05)',
                      },
                      '&:disabled': {
                        color: theme.palette.text.disabled,
                        cursor: 'not-allowed',
                      },
                    }}
                  >
                    {resendCooldown > 0 
                      ? `Resend in ${resendCooldown}s` 
                      : 'Click to resend'
                    }
                  </Box>
                </Box>

                {/* Back to Login Button */}
                <CustomButton
                  variant="text"
                  size="lg"
                  fullWidth
                  onClick={handleBackToLogin}
                  icon={<ArrowBackIcon />}
                  iconPosition="left"
                  sx={{
                    color: theme.palette.text.primary,
                    border: 'none',  
                    backgroundColor: 'transparent',
                  }}
                >
                  Back To Login
                </CustomButton>
              </Box>
            </Paper>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  );
};

export default ForgotPassword;
