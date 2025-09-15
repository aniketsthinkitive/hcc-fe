import React from "react";
import { Box, Typography } from "@mui/material";
import { customLabelStyles } from "./custom-label-styles";

interface CustomFormLabelProps {
  label: string | React.ReactNode;
  isRequired?: boolean;
  style?: React.CSSProperties;
}

const CustomLabel = React.memo<CustomFormLabelProps>(({ label, isRequired, style }) => {
  return (
    <Box mb={1} sx={style}>
      <Typography
        variant="body1"
        sx={{
          letterSpacing: "inherit",
        }}
      >
        {label}
        {isRequired && <span style={customLabelStyles.required}>*</span>}
      </Typography>
    </Box>
  );
});

CustomLabel.displayName = "CustomLabel";

export default CustomLabel;
