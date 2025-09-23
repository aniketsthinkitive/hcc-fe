import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import successIcon from "../../../assets/images/success-icon.gif";
import clinicianAvatar from "../../../assets/images/clinician-avatar.png";
import { useNavigate } from "react-router-dom";
import theme from "../../../constant/styles/theme";

const IntakeAppointmentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate("/admin/dashboard");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E7E9EB",
            borderRadius: 3,
            p: { xs: 3, md: 6 },
            textAlign: "center",
            maxWidth: 750,
            mx: "auto",
          }}
        >
          {/* Success Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3.5,
            }}
          >
            <img
              src={successIcon}
              alt="Success"
              style={{
                width: 80,
                height: 80,
              }}
            />
          </Box>

          {/* Success Message */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">
              Your intake appointment booked successfully
            </Typography>
            <Typography variant="body2" mt={1}>
              Please proceed to explore more
            </Typography>
          </Box>

          {/* Appointment Details */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              mb: 4,
              alignItems: "stretch",
            }}
          >
            {/* Clinician Card */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#EFFFE3",
                borderRadius: "12px",
                p: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                flex: 1,
                minHeight: "120px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "left" }}>
                <Typography
                  sx={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: 1.2,
                    color: "#757775",
                    mb: 0.5,
                  }}
                >
                  Intake Clinician
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: 600,
                    fontSize: "24px",
                    lineHeight: 1.2,
                    color: "#2C2D2C",
                    mb: 1,
                  }}
                >
                  Esther Howard
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: 1.2,
                    color: "#2C2D2C",
                  }}
                >
                  Intake Form Tutorial
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  border: "3px solid #FFFFFF",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                src={clinicianAvatar}
              />
            </Paper>

            {/* Appointment Schedule Card */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#EFF8F3",
                borderRadius: "12px",
                p: 2.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                flex: 1,
                minWidth: "fit-content",
                minHeight: "120px",
                justifyContent: "flex-start",
                textAlign: "left",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Helvetica Neue",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: 1.2,
                  color: "#757775",
                  mb: 0.5,
                }}
              >
                Appointment Scheduled
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Helvetica Neue",
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: 1.2,
                  color: "#2C2D2C",
                  mb: 1,
                }}
              >
                10 Aug 2025, 08:00 AM
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Helvetica Neue",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: 1.2,
                  color: "#757775",
                }}
              >
                60 Minute Appointment
              </Typography>
            </Paper>
          </Box>

          {/* Explore More Button */}
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleExploreMore}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "16px",
              py: 1.5,
              px: 3,
              borderRadius: 2,
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.1)",
              },
            }}
          >
            Explore More
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default IntakeAppointmentSuccessPage;
