import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../assets/images/logo.svg?url';

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'horizontal' | 'vertical';
}

const Logo: React.FC<LogoProps> = ({ 
  showText = false, 
  size = 'medium',
  variant = 'horizontal'
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: 35, height: 46 };
      case 'large':
        return { width: 70, height: 92 };
      default:
        return { width: 52, height: 69 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return '14px';
      case 'large':
        return '24px';
      default:
        return '18px';
    }
  };

  const logoSize = getSize();
  const textSize = getTextSize();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: variant === 'vertical' ? 'column' : 'row',
        gap: variant === 'vertical' ? 1 : 2,
      }}
    >
      {/* Logo SVG */}
      <Box
        component="img"
        src={logo}
        alt="5280 Human Care Center Logo"
        sx={{
          width: logoSize.width,
          height: logoSize.height,
        }}
      />
      
      {/* Logo text */}
      {showText && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            color: '#2C2D2C',
            fontSize: textSize,
            lineHeight: 1.2,
            textAlign: variant === 'vertical' ? 'center' : 'left',
            fontFamily: '"Helvetica Neue", "Roboto", "Arial", sans-serif',
          }}
        >
          5280 Human Care Center
        </Typography>
      )}
    </Box>
  );
};

export default Logo;

