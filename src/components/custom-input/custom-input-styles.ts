export const errorStyle = {
  color: '#ef4444',
  fontSize: '12px',
  marginTop: '4px',
  fontFamily: 'Helvetica Neue, Arial, sans-serif',
};

export const customInputStyles = {
  textFieldRoot: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px 10px',
    gap: '8px',
    width: '100%',
    minHeight: '38px',
    background: '#FFFFFF',
    border: '1px solid #CDD0CD',
    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
    borderRadius: '6px',
    '&:hover': {
      borderColor: '#A9ACA9',
    },
    '&:focus-within': {
      borderColor: '#2C2D2C',
      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), 0 0 0 1px #2C2D2C',
    },
  },
  textFieldInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '160%',
    color: '#2C2D2C',
    '&::placeholder': {
      color: '#A9ACA9',
      fontFamily: 'Helvetica Neue, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '160%',
    },
  },
  textFieldError: {
    borderColor: '#ef4444',
    '&:focus-within': {
      borderColor: '#ef4444',
      boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), 0 0 0 1px #ef4444',
    },
  },
  iconStyle: {
    width: '18px',
    height: '18px',
    color: '#2C2D2C',
    flexShrink: 0,
  },
};

