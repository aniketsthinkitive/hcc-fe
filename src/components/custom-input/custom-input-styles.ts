export const errorStyle = {
  color: "#CA1C1C", // Error Red from Figma
  fontSize: "12px",
  marginTop: "4px",
  fontFamily:
    '"Inter", "Geist", "Helvetica Neue", "Roboto", "Arial", sans-serif',
  fontWeight: 400,
  lineHeight: "1.2",
};

export const customInputStyles = {
  textFieldRoot: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px 12px", // Reduced vertical padding from 16px to 8px
    gap: "8px",
    width: "100%",
    minHeight: "36px", // Reduced from 48px to make it smaller
    background: "#FFFFFF",
    border: "1px solid #DDE0DD", // Neutral/10 from Figma
    boxShadow: "none", // Removed shadow to match Figma
    borderRadius: "6px",
    fontFamily:
      '"Inter", "Geist", "Helvetica Neue", "Roboto", "Arial", sans-serif',
    "&:hover": {
      borderColor: "#CDD0CD", // Neutral/20 from Figma
    },
    "&:focus-within": {
      borderColor: "#439322", // Primary Green from Figma
      boxShadow: "none",
    },
    "&.disabled": {
      backgroundColor: "#F2F2F2", // Neutral/5 from Figma
      borderColor: "#DDE0DD", // Neutral/10 from Figma
      cursor: "not-allowed",
    },
  },
  textFieldInput: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily:
      '"Inter", "Geist", "Helvetica Neue", "Roboto", "Arial", sans-serif',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px", // Increased from 14px to match Figma
    lineHeight: "1.5", // 150% line height
    color: "#2C2D2C", // Neutral/80 from Figma
    "&::placeholder": {
      color: "#A9ACA9", // Neutral/40 from Figma
      fontFamily:
        '"Inter", "Geist", "Helvetica Neue", "Roboto", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "1.5",
    },
    "&.disabled": {
      color: "#A9ACA9", // Neutral/40 from Figma
      cursor: "not-allowed",
    },
  },
  textFieldError: {
    borderColor: "#CA1C1C", // Error Red from Figma
    "&:focus-within": {
      borderColor: "#CA1C1C", // Error Red from Figma
      boxShadow: "none",
    },
  },
  iconStyle: {
    width: "20px", // Increased from 18px to match Figma
    height: "20px",
    color: "#2C2D2C", // Neutral/80 from Figma
    flexShrink: 0,
  },
  // Additional styles for different states
  textFieldFocus: {
    borderColor: "#439322", // Primary Green from Figma
    "& input": {
      color: "#439322", // Primary Green text when focused
    },
  },
  textFieldDisabled: {
    backgroundColor: "#F2F2F2", // Neutral/5 from Figma
    borderColor: "#DDE0DD", // Neutral/10 from Figma
    cursor: "not-allowed",
    "& input": {
      color: "#A9ACA9", // Neutral/40 from Figma
      cursor: "not-allowed",
    },
    "& .iconStyle": {
      color: "#A9ACA9", // Neutral/40 from Figma
    },
  },
};
