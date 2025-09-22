import React, { useState } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import theme from "../../../constant/styles/theme";

const TimeSlotsComponent: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

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

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        p: 3,
        height: "100%",
        border: "1px solid #E7E9EB",
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
                variant={selectedSlot === slot ? "contained" : "outlined"}
                onClick={() => setSelectedSlot(slot)}
                sx={{
                  width: "100%",
                  minHeight: "50px",
                  py: 1,
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: 2,
                  backgroundColor:
                    selectedSlot === slot
                      ? theme.palette.primary.main
                      : "transparent",
                  borderColor: selectedSlot === slot ? "#EFFFE3" : "#E7E9EB",
                  color: selectedSlot === slot ? "#FFFFFF" : "#2C2D2C",
                  "&:hover": {
                    backgroundColor:
                      selectedSlot === slot
                        ? theme.palette.primary.main
                        : "#E3E3E3",
                    color: selectedSlot === slot ? "#FFFFFF" : "#000000",
                    borderColor: selectedSlot === slot ? "#EFFFE3" : "#C5C9C5",
                  },
                }}
              >
                {slot}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default TimeSlotsComponent;
