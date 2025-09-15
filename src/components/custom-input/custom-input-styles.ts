//import { border } from "@mui/system";

export const errorStyle = {
  color: `red`,
  // paddingLeft: `50px`,
};

export const customInputStyles = {
  textFieldRoot: {
    padding: "6px, 8px, 6px, 8px",
    borderRadius: "4px",
    // boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    border: '1px solid #ccc',
  },
  textFieldInput: {
    color: "#333333",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "130%",
    letterSpacing: "0.12px",

    "&::placeholder": {
      fontSize: "10px",
      fontStyle: "inter sans-serif",
      fontWeight: "400",
      padding: "2.5px",
    },
  },
  textFieldActive: {
    // border: `12px solid #333333`,
  },
  textFieldError: {
    border: `1px solid red`,
  },

};

