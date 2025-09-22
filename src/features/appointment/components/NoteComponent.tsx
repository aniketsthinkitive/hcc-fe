import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const NoteComponent: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          Note :
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#424342",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          • You will receive login credentials after booking
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#424342",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          • Complete all forms in the patient portal
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#424342",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          • Forms must be completed before your appointment
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#424342",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          • Previously completed forms don't need to be redone
        </Typography>
      </Box>
    </Paper>
  );
};

export default NoteComponent;
