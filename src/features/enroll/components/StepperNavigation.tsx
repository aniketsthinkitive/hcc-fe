import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface StepperNavigationProps {
  onBack: () => void;
  onNext: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
}

const StepperNavigation: React.FC<StepperNavigationProps> = ({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  nextButtonText = "Proceed",
  backButtonText = "Go Back",
  isNextDisabled = false,
  isBackDisabled = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 4,
        gap: 2,
      }}
    >
      {showBack && (
        <Button
          variant="outlined"
          onClick={onBack}
          disabled={isBackDisabled}
          startIcon={<ArrowBackIcon />}
          sx={{
            borderColor: "#C5C9C5",
            color: "#000000",
            "&:hover": {
              borderColor: "#C5C9C5",
              backgroundColor: "#F5F5F5",
              color: "#000000", // ✅ keep text black on hover
              "& .MuiSvgIcon-root": {
                color: "#000000", // ✅ keep icon black on hover
              },
            },
            "&:disabled": {
              borderColor: "#ccc",
              color: "#ccc",
              "& .MuiSvgIcon-root": {
                color: "#ccc",
              },
            },
          }}
        >
          {backButtonText}
        </Button>
      )}

      {showNext && (
        <Button
          variant="contained"
          onClick={onNext}
          disabled={isNextDisabled}
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: "#428D34",
            "&:hover": {
              backgroundColor: "#3a7a2e",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
              color: "#fff",
            },
          }}
        >
          {nextButtonText}
        </Button>
      )}
    </Box>
  );
};

export default StepperNavigation;
