import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import { Phone, Email, ArrowForward } from "@mui/icons-material";
import NoteComponent from "../components/NoteComponent";
import TimeSlotsComponent from "../components/TimeSlotsComponent";
import DateMonth from "../../../components/date-month/date-month";
import theme from "../../../constant/styles/theme";

const IntakeAppointmentPage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5} justifyContent="center">
          <Grid
            size={{ xs: 12, lg: 10, xl: 8 }}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E7E9EB",
                borderRadius: 3,
                overflow: "hidden",
                width: "100%",
              }}
            >
              {/* Header Section */}
              <Box
                sx={{
                  p: 3,
                  borderBottom: "1px solid #E7E9EB",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* Left side - Icon and Title */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(134deg, rgba(132, 184, 251, 1) 0%, rgba(0, 103, 237, 1) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Phone sx={{ color: "white", fontSize: 25 }} />
                    </Box>

                    <Box mt={2}>
                      <Typography variant="h4">
                        Book Intake Appointment
                      </Typography>
                      <Typography variant="body2">
                        Please select date first and time slot for that day
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Right side - Patient Info Card */}
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    minWidth: "fit-content",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 84,
                      height: 84,
                      border: "1.5px solid #CDCFD2",
                    }}
                    src="/api/placeholder/84/84"
                  />

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "18px",
                        color: "#2C2D2C",
                        mb: 1,
                      }}
                    >
                      Cameron Williamson
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Email sx={{ color: "#989998", fontSize: 18 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#2C2D2C",
                            fontSize: "14px",
                          }}
                        >
                          deanna.curtis@example.com
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Phone sx={{ color: "#989998", fontSize: 18 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#2C2D2C",
                            fontSize: "14px",
                          }}
                        >
                          (225) 555-0118
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Box>

              {/* Main Content */}
              <Box sx={{ p: 3, minHeight: "500px" }}>
                <Grid container spacing={3}>
                  {/* Left Column - Note */}
                  <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                    <NoteComponent />
                  </Grid>

                  {/* Middle Column - Calendar */}
                  <Grid size={{ xs: 12, md: 4, lg: 5 }}>
                    <DateMonth onChange={() => {}} disablePast />
                  </Grid>

                  {/* Right Column - Time Slots */}
                  <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                    <TimeSlotsComponent />
                  </Grid>
                </Grid>
              </Box>

              {/* Footer Actions */}
              <Box
                sx={{
                  p: 3,
                  borderTop: "1px solid #E7E9EB",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#FFFFFF",
                    "&:disabled": {
                      backgroundColor: "#DDE0DD",
                      color: "#A9ACA9",
                    },
                  }}
                >
                  Proceed With Payment
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default IntakeAppointmentPage;
