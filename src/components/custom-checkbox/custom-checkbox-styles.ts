import { styled } from '@mui/material/styles';
import { Box, FormControlLabel } from '@mui/material';

// Color tokens from Figma design
const colors = {
  primary: {
    main: '#439322', // Primary/70 (Main)
    light: '#EFFFE3', // Primary/10
    dark: '#184709', // Primary/90
  },
  neutral: {
    1: '#F9FAF9', // Neutral/1
    5: '#F2F2F2', // Neutral/5
    40: '#A9ACA9', // Neutral/40
    60: '#757775', // Neutral/60
    80: '#2C2D2C', // Neutral/80
  },
  white: '#FFFFFF',
};

// Size variants
const sizes = {
  sm: {
    checkbox: 16,
    borderRadius: 4,
    iconSize: 12,
    strokeWidth: 1.67,
  },
  md: {
    checkbox: 20,
    borderRadius: 6,
    iconSize: 14,
    strokeWidth: 2,
  },
};

// Base checkbox container
export const CheckboxContainer = styled(Box)<{
  size: 'sm' | 'md';
  checked: boolean;
  disabled: boolean;
  focused: boolean;
  hovered: boolean;
}>(({ size, checked, disabled, focused, hovered }) => {
  const sizeConfig = sizes[size];
  
  let backgroundColor = colors.white;
  let borderColor = colors.neutral[40];
  let boxShadow = 'none';
  
  if (disabled) {
    backgroundColor = colors.neutral[1];
    borderColor = colors.neutral[5];
  } else if (checked) {
    backgroundColor = colors.primary.light;
    borderColor = colors.primary.main;
  } else if (hovered) {
    backgroundColor = colors.primary.light;
    borderColor = colors.primary.dark;
  }
  
  if (focused) {
    boxShadow = `0px 0px 0px 4px rgba(251, 255, 247, 1)`;
  }
  
  return {
    width: sizeConfig.checkbox,
    height: sizeConfig.checkbox,
    borderRadius: sizeConfig.borderRadius,
    border: `1px solid ${borderColor}`,
    backgroundColor,
    boxShadow,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
  };
});

// Check icon
export const CheckIcon = styled('svg')<{
  size: 'sm' | 'md';
  checked: boolean;
  disabled: boolean;
}>(({ size, checked, disabled }) => {
  const sizeConfig = sizes[size];
  
  let strokeColor = colors.primary.main;
  if (disabled) {
    strokeColor = colors.neutral[5];
  }
  
  return {
    width: sizeConfig.iconSize,
    height: sizeConfig.iconSize,
    stroke: strokeColor,
    strokeWidth: sizeConfig.strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
    opacity: checked ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out',
  };
});

// Minus icon for indeterminate state
export const MinusIcon = styled('svg')<{
  size: 'sm' | 'md';
  checked: boolean;
  disabled: boolean;
}>(({ size, checked, disabled }) => {
  const sizeConfig = sizes[size];
  
  let strokeColor = colors.primary.main;
  if (disabled) {
    strokeColor = colors.neutral[5];
  }
  
  return {
    width: sizeConfig.iconSize,
    height: sizeConfig.iconSize,
    stroke: strokeColor,
    strokeWidth: sizeConfig.strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
    opacity: checked ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out',
  };
});

// Custom FormControlLabel
export const CustomFormControlLabel = styled(FormControlLabel)<{
  size: 'sm' | 'md';
  disabled: boolean;
}>(({ size, disabled }) => {
  const gap = size === 'sm' ? 8 : 12;
  
  return {
    margin: 0,
    alignItems: 'flex-start',
    gap: gap,
    '& .MuiFormControlLabel-label': {
      fontSize: size === 'sm' ? '14px' : '16px',
      lineHeight: size === 'sm' ? 1.6 : 1.6,
      color: disabled ? colors.neutral[40] : colors.neutral[80],
      margin: 0,
      paddingTop: size === 'sm' ? '2px' : '0px',
    },
  };
});

// Supporting text container
export const SupportingTextContainer = styled(Box)<{
  size: 'sm' | 'md';
  disabled: boolean;
}>(({ size, disabled }) => {
  return {
    fontSize: size === 'sm' ? '14px' : '16px',
    lineHeight: size === 'sm' ? 1.6 : 1.6,
    color: disabled ? colors.neutral[40] : colors.neutral[60],
    marginTop: size === 'sm' ? '2px' : '2px',
  };
});

// Main container for checkbox with text
export const CheckboxWithTextContainer = styled(Box)<{
  size: 'sm' | 'md';
}>(({ size }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: size === 'sm' ? '2px' : '2px',
  };
});
