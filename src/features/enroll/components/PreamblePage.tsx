import React from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import StepperNavigation from "./StepperNavigation";

interface Step {
  id: number;
  description: string;
}

interface PreamblePageProps {
  onBack: () => void;
  onNext: () => void;
}

const PreamblePage: React.FC<PreamblePageProps> = ({ onBack, onNext }) => {
  const theme = useTheme();
  const steps: Step[] = [
    {
      id: 1,
      description:
        "Provide your basic information, contact details, and mailing address.",
    },
    {
      id: 2,
      description: "Set your password & sign in to your client portal",
    },
    {
      id: 3,
      description: "Fill up your intake forms",
    },
    {
      id: 4,
      description: "Book your first appointment & make the payment",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[50], // Using theme color
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      {/* Main Content Card */}
      <Card
        sx={{
          width: 688, // Exact width as per Figma
          height: "auto", // Exact height as per Figma
          borderRadius: theme.spacing(1.5), // Using theme border radius
          boxShadow: theme.shadows[3], // Using theme shadow
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent sx={{ p: theme.spacing(4) }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            {" "}
            {/* 24px gap as per Figma */}
            {/* Icon */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background:
                  "linear-gradient(134.42deg, #84B8FB -11.79%, #0067ED 110.72%)", // Blue gradient as per Figma
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: theme.spacing(2), // 16px spacing
              }}
            >
              <ChecklistRoundedIcon
                sx={{
                  color: "white",
                  fontSize: "1.5rem",
                }}
              />
            </Box>
            {/* Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500, // Medium as per Figma
                color: theme.palette.text.primary,
                mb: theme.spacing(1),
                fontSize: "22px", // 28px as per Figma
                lineHeight: "120%", // 120% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Simple Steps
            </Typography>
            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "14px", // Normal text as per Figma
                fontWeight: 400, // Regular as per Figma
                lineHeight: "160%", // 160% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Follow these simple steps to create your account.
            </Typography>
          </Box>

          {/* Break line after "Follow these..." text */}
          <Box
            sx={{
              width: "calc(100% + 63px)",
              marginLeft: "-32px",
              height: "1px",
              backgroundColor: theme.palette.divider,
              mb: 3, // 24px gap as per Figma
            }}
          />

          {/* Steps List */}
          <Box sx={{ mb: 3 }}>
            {" "}
            {/* 24px gap as per Figma */}
            {steps.map((step) => (
              <Box
                key={step.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(2),
                  mb: theme.spacing(2),
                  p: theme.spacing(2),
                  backgroundColor: theme.palette.grey[50], // Light grey background
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {/* Step Icon */}

                <TaskAltOutlinedIcon
                  sx={{
                    color: "grey",
                    fontSize: "1.2rem",
                  }}
                />

                {/* Step Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "14px", // Smaller font size to fit in one line
                    fontWeight: 400, // Regular as per Figma
                    lineHeight: "160%", // 160% as per Figma
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                    whiteSpace: "nowrap", // Keep text in one line
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Break line after options listing */}
          <Box
            sx={{
              width: "calc(100% + 63px)",
              marginLeft: "-32px",
              height: "1px",
              backgroundColor: theme.palette.divider,
              mb: 3, // 24px gap as per Figma
            }}
          />

          {/* Navigation */}
          <StepperNavigation
            onBack={onBack}
            onNext={onNext}
            showBack={true}
            showNext={true}
            nextButtonText="Proceed"
            backButtonText="Go Back"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PreamblePage;
