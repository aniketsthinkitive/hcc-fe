export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'text'
  | 'icon'
  | 'floating'
  | 'black';

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
  const baseFontFamily = '"Helvetica Neue", "Inter", "Geist", "Roboto", "Arial", sans-serif';
  
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
      fontSize: '14px',
      padding: '10px 16px',
      height: '38px',
      borderRadius: '6px',
      iconSize: '18px',
      minWidth: '100px',
    },
    lg: {
      fontSize: '16px',
      padding: '12px 20px',
      height: '44px',
      borderRadius: '6px',
      iconSize: '20px',
      minWidth: '120px',
    },
  };

  const config = sizeConfig[size];

  // Base button styles
  const baseButton: React.CSSProperties = {
    fontFamily: baseFontFamily,
    fontSize: config.fontSize,
    fontWeight: 500,
    lineHeight: '1.15',
    letterSpacing: '0%',
    textTransform: 'none',
    borderRadius: config.borderRadius,
    height: config.height,
    width: fullWidth ? '100%' : 'auto',
    minWidth: fullWidth ? '100%' : 'auto',
    maxWidth: fullWidth ? '100%' : '167px',
    padding: config.padding,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    borderWidth: '0',
    borderStyle: 'none',
    borderColor: 'transparent',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
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
      backgroundColor: '#FBFFF7',
      color: '#439322',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#439322',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#F0F8E8',
        borderColor: '#3a7f1e',
        color: '#439322',
        transform: 'translateY(-1px)',
      },
      '&:focus': {
        backgroundColor: '#FBFFF7',
        borderColor: '#439322',
        color: '#439322',
        boxShadow: '0 0 0 3px rgba(67, 147, 34, 0.1)',
      },
      '&:active': {
        backgroundColor: '#E8F5E0',
        color: '#439322',
        transform: 'translateY(0)',
      },
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: '#439322',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#439322',
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
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#CCCCCC',
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
      borderWidth: '0',
      borderStyle: 'none',
      borderColor: 'transparent',
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
      borderWidth: '0',
      borderStyle: 'none',
      borderColor: 'transparent',
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
      borderWidth: '0',
      borderStyle: 'none',
      borderColor: 'transparent',
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
    black: {
      backgroundColor: 'transparent',
      color: '#2C2D2C',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#DDE0DD',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#F5F5F5',
        borderColor: '#DDE0DD',
        color: '#2C2D2C',
        transform: 'translateY(-1px)',
      },
      '&:focus': {
        backgroundColor: 'transparent',
        borderColor: '#DDE0DD',
        color: '#2C2D2C',
        boxShadow: '0 0 0 3px rgba(44, 45, 44, 0.1)',
      },
      '&:active': {
        backgroundColor: '#E8E8E8',
        color: '#2C2D2C',
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
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#E0E0E0',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
    text: {
      fontFamily: baseFontFamily,
      fontSize: config.fontSize,
      fontWeight: 500,
      lineHeight: '1.15',
      letterSpacing: '0%',
      color: 'inherit',
    },
    textDisabled: {
      color: '#CCCCCC',
    },
    icon: {
      fontSize: config.iconSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'inherit',
      border: 'none',
      borderRadius: '0',
      outline: 'none',
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
