//import { Controller, useForm, FormProvider } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { customLabelStyles } from "./custom-label-styles";

interface CustomFormLabelProps {
  label: string | React.ReactNode;
  isRequired?: boolean;
  style?:React.CSSProperties;
}

function CustomLabel(props: CustomFormLabelProps) {
  const { label, isRequired, style } = props;

  return (
    <Box mb={1} sx={{ ...style }}>
      <Typography
        sx={{
          //fontWeight: 500,
          letterSpacing: "inherit"
        }}
        variant="body1"
      >
        {label}
        {isRequired && <span style={customLabelStyles.required}>*</span>}
      </Typography>
    </Box>
  );
}

CustomLabel.propTypes = {
  label: PropTypes.string,
};

export default CustomLabel;
