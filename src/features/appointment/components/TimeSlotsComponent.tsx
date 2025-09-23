import React from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import theme from "../../../constant/styles/theme";

interface TimeSlotsComponentProps {
  selectedTime?: string | null;
  onTimeSelect?: (time: string | null) => void;
  hasError?: boolean;
  errorMessage?: string;
}

const TimeSlotsComponent: React.FC<TimeSlotsComponentProps> = ({
  selectedTime = null,
  onTimeSelect,
  hasError = false,
  errorMessage,
}) => {
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const handleSlotClick = (slot: string) => {
    const newValue = selectedTime === slot ? null : slot;
    onTimeSelect?.(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        p: 3,
        height: "100%",
        border: hasError ? "1px solid #d32f2f" : "1px solid #E7E9EB",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            // color: '#2C2D2C',
            fontSize: "16px",
            // mb: 1
          }}
        >
          Available Time Slot :
        </Typography>
        {/* <Typography 
          variant="body2" 
          sx={{ 
            color: '#666666',
            fontSize: '14px'
          }}
        >
          Select your preferred appointment time
        </Typography> */}
      </Box>

      <Box
        sx={{
          maxHeight: "300px", // Show approximately 3 rows of slots
          overflowY: "auto",
          overflowX: "hidden",
          pr: 1, // Add padding for scrollbar
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "3px",
            "&:hover": {
              backgroundColor: "#a8a8a8",
            },
          },
        }}
      >
        <Grid container spacing={1.5}>
          {timeSlots.map((slot, index) => (
            <Grid size={6} key={`${slot}-${index}`}>
              <Button
                variant={selectedTime === slot ? "contained" : "outlined"}
                onClick={() => handleSlotClick(slot)}
                sx={{
                  width: "100%",
                  minHeight: "50px",
                  py: 1,
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: 2,
                  backgroundColor:
                    selectedTime === slot
                      ? theme.palette.primary.main
                      : "transparent",
                  borderColor: selectedTime === slot ? "#EFFFE3" : "#E7E9EB",
                  color: selectedTime === slot ? "#FFFFFF" : "#2C2D2C",
                  "&:hover": {
                    backgroundColor:
                      selectedTime === slot
                        ? theme.palette.primary.main
                        : "#E3E3E3",
                    color: selectedTime === slot ? "#FFFFFF" : "#000000",
                    borderColor: selectedTime === slot ? "#EFFFE3" : "#C5C9C5",
                  },
                }}
              >
                {slot}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {hasError && errorMessage && (
        <Typography
          variant="body2"
          sx={{
            color: "#d32f2f",
            fontSize: "12px",
            mt: 1,
            ml: 1,
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Paper>
  );
};

export default TimeSlotsComponent;
