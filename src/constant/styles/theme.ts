import { createTheme } from '@mui/material/styles';

// Colors from Figma design
const colors = {
  primary: {
    main: '#439322', // Green from Figma
    light: '#55B02A',
    dark: '#357A1A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#757775', // Gray from Figma
    light: '#9E9E9E',
    dark: '#424242',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#B51C1C', // Red from Figma
    light: '#E53E3E',
    dark: '#8B0000',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFA726',
    light: '#FFB74D',
    dark: '#F57C00',
    contrastText: '#000000',
  },
  info: {
    main: '#29B6F6',
    light: '#4FC3F7',
    dark: '#0288D1',
    contrastText: '#000000',
  },
  success: {
    main: '#439322',
    light: '#55B02A',
    dark: '#357A1A',
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F7FA', // Light gray background from Figma
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757775', // Secondary gray from Figma
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  text: {
    primary: '#2C2D2C', // Dark text from Figma
    secondary: '#757775', // Secondary gray from Figma
    disabled: '#A9ACA9', // Placeholder text from Figma
  },
  background: {
    default: '#F5F7FA', // Light gray background from Figma
    paper: '#FFFFFF',
  },
  divider: '#CDD0CD', // Border color from Figma
};

// Typography from Figma design
const typography = {
  fontFamily: '"Helvetica Neue", "Roboto", "Arial", sans-serif',
  h1: {
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.text.primary,
  },
  h2: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.text.primary,
  },
  h3: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.text.primary,
  },
  h4: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.text.primary,
  },
  h5: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.text.primary,
  },
  h6: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.text.primary,
  },
  body1: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0.4%',
    color: colors.text.secondary,
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.6,
    color: colors.text.secondary,
  },
  button: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 1.25,
    textTransform: 'none' as const,
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.2,
    color: colors.text.secondary,
  },
  overline: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.6,
    textTransform: 'uppercase' as const,
    color: colors.text.secondary,
  },
};

// Create the theme
export const theme = createTheme({
  palette: colors,
  typography,
  shape: {
    borderRadius: 6, // From Figma design
  },
  spacing: 8, // 8px base spacing unit
  components: {
    // Button overrides
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          '&:hover': {
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.1)',
          },
        },
        contained: {
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
          border: `1px solid ${colors.primary.main}`,
          '&:hover': {
            backgroundColor: colors.primary.dark,
            borderColor: colors.primary.dark,
          },
          '&:disabled': {
            backgroundColor: colors.grey[300],
            color: colors.grey[500],
            borderColor: colors.grey[300],
          },
        },
        outlined: {
          borderColor: colors.primary.main,
          color: colors.primary.main,
          '&:hover': {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
          },
        },
        text: {
          color: colors.primary.main,
          '&:hover': {
            backgroundColor: 'rgba(67, 147, 34, 0.04)',
          },
        },
        sizeLarge: {
          padding: '10px 18px',
          fontSize: '16px',
          lineHeight: 1.25,
        },
        sizeMedium: {
          padding: '8px 16px',
          fontSize: '14px',
          lineHeight: 1.15,
        },
        sizeSmall: {
          padding: '6px 12px',
          fontSize: '12px',
          lineHeight: 1.2,
        },
      },
    },
    
    // TextField overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: colors.background.paper,
            border: `1px solid ${colors.divider}`,
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            '&:hover': {
              borderColor: colors.primary.main,
            },
            '&.Mui-focused': {
              borderColor: colors.primary.main,
              boxShadow: `0px 0px 0px 1px ${colors.primary.main}`,
            },
            '&.Mui-error': {
              borderColor: colors.error.main,
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.6,
            color: colors.text.secondary,
            '&.Mui-focused': {
              color: colors.primary.main,
            },
            '&.Mui-error': {
              color: colors.error.main,
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '14px',
            lineHeight: 1.6,
            color: colors.text.primary,
            '&::placeholder': {
              color: colors.text.disabled,
              opacity: 1,
            },
          },
          '& .MuiFormHelperText-root': {
            fontSize: '12px',
            lineHeight: 1.2,
            marginTop: 4,
            '&.Mui-error': {
              color: colors.error.main,
            },
          },
        },
      },
    },
    
    // Checkbox overrides
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          '&.Mui-checked': {
            color: colors.primary.main,
          },
          '&.Mui-disabled': {
            color: colors.grey[400],
          },
        },
        sizeSmall: {
          width: 16,
          height: 16,
        },
      },
    },
    
    // FormControlLabel overrides
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
          '& .MuiFormControlLabel-label': {
            fontSize: '14px',
            lineHeight: 1.6,
            color: colors.text.primary,
            marginLeft: 8,
          },
        },
      },
    },
    
    // Paper overrides
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
        },
        elevation1: {
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.04)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    
    // Link overrides
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.primary.main,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    
    // CircularProgress overrides
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: colors.primary.main,
        },
      },
    },
  },
});

export default theme;