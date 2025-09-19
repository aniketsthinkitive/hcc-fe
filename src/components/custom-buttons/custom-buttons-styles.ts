export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'text'
  | 'icon'
  | 'floating';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonState = 'default' | 'hover' | 'focus' | 'active' | 'disabled';

export interface ButtonStyles {
  button: React.CSSProperties;
  buttonHover: React.CSSProperties;
  buttonFocus: React.CSSProperties;
  buttonActive: React.CSSProperties;
  buttonDisabled: React.CSSProperties;
  text: React.CSSProperties;
  textDisabled: React.CSSProperties;
  icon: React.CSSProperties;
  iconDisabled: React.CSSProperties;
  ripple: React.CSSProperties;
}

export const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean = false
): ButtonStyles => {
  const baseFontFamily = '"Inter", "Geist", "Helvetica Neue", "Roboto", "Arial", sans-serif';
  
  // Size configurations
  const sizeConfig = {
    sm: {
      fontSize: '14px',
      padding: '8px 16px',
      height: '32px',
      borderRadius: '6px',
      iconSize: '16px',
      minWidth: '80px',
    },
    md: {
      fontSize: '16px',
      padding: '12px 24px',
      height: '40px',
      borderRadius: '8px',
      iconSize: '20px',
      minWidth: '100px',
    },
    lg: {
      fontSize: '18px',
      padding: '16px 32px',
      height: '48px',
      borderRadius: '10px',
      iconSize: '24px',
      minWidth: '120px',
    },
  };

  const config = sizeConfig[size];

  // Base button styles
  const baseButton: React.CSSProperties = {
    fontFamily: baseFontFamily,
    fontSize: config.fontSize,
    fontWeight: 600,
    lineHeight: '1.5',
    letterSpacing: '0.25px',
    textTransform: 'none',
    borderRadius: config.borderRadius,
    height: config.height,
    minWidth: fullWidth ? '100%' : config.minWidth,
    padding: config.padding,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  // Variant-specific styles
  const variantStyles = {
    primary: {
      backgroundColor: '#439322',
      color: '#FFFFFF',
      boxShadow: '0 2px 4px rgba(67, 147, 34, 0.2)',
      '&:hover': {
        backgroundColor: '#3a7f1e',
        boxShadow: '0 4px 8px rgba(67, 147, 34, 0.3)',
        transform: 'translateY(-1px)',
      },
      '&:focus': {
        backgroundColor: '#439322',
        boxShadow: '0 0 0 3px rgba(67, 147, 34, 0.3)',
      },
      '&:active': {
        backgroundColor: '#2d5f14',
        transform: 'translateY(0)',
      },
    },
    secondary: {
      backgroundColor: '#F5F5F5',
      color: '#333333',
      border: '1px solid #E0E0E0',
      '&:hover': {
        backgroundColor: '#EEEEEE',
        borderColor: '#D0D0D0',
        transform: 'translateY(-1px)',
      },
      '&:focus': {
        backgroundColor: '#F5F5F5',
        borderColor: '#439322',
        boxShadow: '0 0 0 3px rgba(67, 147, 34, 0.1)',
      },
      '&:active': {
        backgroundColor: '#E8E8E8',
        transform: 'translateY(0)',
      },
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: '#439322',
      border: '1px solid #439322',
      '&:hover': {
        backgroundColor: 'rgba(67, 147, 34, 0.05)',
        transform: 'translateY(-1px)',
      },
      '&:focus': {
        backgroundColor: 'transparent',
        boxShadow: '0 0 0 3px rgba(67, 147, 34, 0.2)',
      },
      '&:active': {
        backgroundColor: 'rgba(67, 147, 34, 0.1)',
        transform: 'translateY(0)',
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#666666',
      border: '1px solid #CCCCCC',
      '&:hover': {
        backgroundColor: '#F9F9F9',
        borderColor: '#999999',
        color: '#333333',
        transform: 'translateY(-1px)',
      },
      '&:focus': {
        backgroundColor: 'transparent',
        borderColor: '#439322',
        color: '#439322',
        boxShadow: '0 0 0 3px rgba(67, 147, 34, 0.1)',
      },
      '&:active': {
        backgroundColor: '#F0F0F0',
        transform: 'translateY(0)',
      },
    },
    text: {
      backgroundColor: 'transparent',
      color: '#439322',
      border: 'none',
      padding: '8px 12px',
      minWidth: 'auto',
      '&:hover': {
        backgroundColor: 'rgba(67, 147, 34, 0.05)',
        transform: 'translateY(-1px)',
      },
      '&:focus': {
        backgroundColor: 'transparent',
        boxShadow: '0 0 0 3px rgba(67, 147, 34, 0.2)',
      },
      '&:active': {
        backgroundColor: 'rgba(67, 147, 34, 0.1)',
        transform: 'translateY(0)',
      },
    },
    icon: {
      backgroundColor: 'transparent',
      color: '#666666',
      border: 'none',
      padding: '8px',
      minWidth: 'auto',
      width: config.height,
      height: config.height,
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        color: '#333333',
        transform: 'translateY(-1px)',
      },
      '&:focus': {
        backgroundColor: 'transparent',
        boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.1)',
      },
      '&:active': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        transform: 'translateY(0)',
      },
    },
    floating: {
      backgroundColor: '#439322',
      color: '#FFFFFF',
      border: 'none',
      padding: '16px',
      minWidth: 'auto',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      boxShadow: '0 4px 12px rgba(67, 147, 34, 0.3)',
      '&:hover': {
        backgroundColor: '#3a7f1e',
        boxShadow: '0 6px 16px rgba(67, 147, 34, 0.4)',
        transform: 'translateY(-2px)',
      },
      '&:focus': {
        backgroundColor: '#439322',
        boxShadow: '0 0 0 3px rgba(67, 147, 34, 0.3)',
      },
      '&:active': {
        backgroundColor: '#2d5f14',
        transform: 'translateY(0)',
      },
    },
  };

  const currentVariant = variantStyles[variant];

  return {
    button: {
      ...baseButton,
      ...currentVariant,
    },
    buttonHover: currentVariant['&:hover'] || {},
    buttonFocus: currentVariant['&:focus'] || {},
    buttonActive: currentVariant['&:active'] || {},
    buttonDisabled: {
      backgroundColor: '#F5F5F5',
      color: '#CCCCCC',
      border: '1px solid #E0E0E0',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#F5F5F5',
        color: '#CCCCCC',
        transform: 'none',
        boxShadow: 'none',
      },
    },
    text: {
      fontFamily: baseFontFamily,
      fontSize: config.fontSize,
      fontWeight: 600,
      lineHeight: '1.5',
      letterSpacing: '0.25px',
    },
    textDisabled: {
      color: '#CCCCCC',
    },
    icon: {
      fontSize: config.iconSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconDisabled: {
      color: '#CCCCCC',
    },
    ripple: {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear',
      pointerEvents: 'none',
    },
  };
};

export const customButtonStyles = {
  '@keyframes ripple': {
    to: {
      transform: 'scale(4)',
      opacity: 0,
    },
  },
};
