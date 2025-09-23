import type { SxProps, Theme } from "@mui/material/styles";
import { theme } from "../../constant/styles/theme";

// Main container for the pagination component
export const paginatorContainerStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "12px 16px 12px 16px",
  // borderTop: `1px solid #E7E9EB`,
  borderRadius: "0px 0px 10px 10px",
  backgroundColor: theme.palette.common.white,
  gap: "16px",
};

// Container for pagination controls (rows per page + pagination)
export const paginationControlsStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

// Rows per page container
export const rowsPerPageContainerStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "0px 4px",
  minWidth: "135px",
  width: "auto",
  backgroundColor: theme.palette.common.white,
  borderRadius: "2px",
  flexShrink: 0,
};

// Pagination main container
export const paginationMainStyles: SxProps<Theme> = {
  display: "flex",
  gap: "6px",
  "& .MuiPagination-ul": {
    gap: "6px",
  },
};

// Individual pagination item styles
export const paginationItemStyles: SxProps<Theme> = {
  width: "40px",
  height: "40px",
  minWidth: "40px",
  borderRadius: "100px",
  border: "none",
  margin: 0,
  padding: 0,
  "&.Mui-selected": {
    backgroundColor: "#EFFFE3", // Primary/10 from Figma
    color: "#439322", // Primary/70 from Figma
    fontFamily: "Figtree",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "19.92px",
    letterSpacing: "0.4px",
    "&:hover": {
      backgroundColor: "#EFFFE3",
    },
  },
  "&:not(.Mui-selected)": {
    backgroundColor: "transparent",
    color: "#202120", // Neutral/100 from Figma
    fontFamily: "Figtree",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "19.92px",
    letterSpacing: "0.4px",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
    },
  },
};

// Navigation button styles (Previous/Next)
export const navigationButtonStyles: SxProps<Theme> = {
  width: "40px",
  height: "40px",
  minWidth: "40px",
  borderRadius: "4px",
  border: "none",
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  "&.Mui-disabled": {
    opacity: 0.38,
    backgroundColor: "transparent",
    "& svg": {
      fill: "rgba(77, 79, 77, 0.38)", // Neutral/90 with opacity
    },
  },
  "&:not(.Mui-disabled)": {
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
    },
    "& svg": {
      fill: "#4D4F4D", // Neutral/90 from Figma
    },
  },
};

// Rows per page select styles
export const recordsSelectStyles: SxProps<Theme> = {
  "& .MuiSelect-select": {
    padding: 0,
    border: "none",
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: 500,
    lineHeight: "14.4px",
    color: "#2C2D2C", // Neutral/80 from Figma
    marginTop: "8px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: "#2C2D2C", // Neutral/80 from Figma
    marginTop: "1px",
  },
};

// Rows per page label styles
export const rowsPerPageLabelStyles: SxProps<Theme> = {
  fontSize: "14px",
  fontFamily: "Inter",
  fontWeight: 400,
  lineHeight: "14.4px",
  color: "#2C2D2C", // Neutral/80 from Figma
  whiteSpace: "nowrap",
  flexShrink: 0,
};

// Entries text styles (Showing X to Y of Z entries)
export const entriesTextStyles: SxProps<Theme> = {
  fontSize: "14px",
  fontFamily: "Inter",
  fontWeight: 400,
  lineHeight: "14.4px",
  color: "#2C2D2C", // Neutral/80 from Figma
};
