import theme from "../../../constant/styles/theme";

export const customSelectStyles = {
  headerLabel: {
    // fontSize: "0.9rem !important",
    // wordWrap: "break-word",
    // fontStyle: "normal !important",
    // fontWeight: "400 !important",
    // lineHeight: "130% !important",
    // letterSpacing: "0.12px !important",
  },
};

export const selectInputStyle = {
  ".MuiOutlinedInput-notchedOutline":  {
    border: "1px solid #ccc" /* 1px solid light grey border */
  },
  //border: `0px solid ${theme.palette.grey[400]}`,
  height: "40px",
  width: "100%",
  borderRadius: "4px",
  //boxShadow: "0 0 6px 0 rgba(10, 10, 10, 10 )",
  
  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    display: "flex",
    alignItems: "center",
  },
  "&.Mui-error": {
    border: `1px solid ${theme.palette.warning.dark}`,
    padding: "0px!important",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(228, 219, 233, 0.25)",
  },
};

export const someStyle = {
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  border: `1px solid ${theme.palette.grey[400]}`,
  height: "40px !important",
  width: "100%",
  borderRadius: "8px",
  ".Mui-readOnly": {
    borderRadius: "8px",
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: "10px !important",
  },
  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    display: "flex",
    alignItems: "center",
  },
};
