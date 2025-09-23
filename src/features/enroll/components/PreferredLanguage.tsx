import React from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logoMain from "../../../assets/images/logo-main.svg";
import treeLogo from "../../../assets/images/tree-logo-1.svg";

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  description: string;
}

interface PreferredLanguageProps {
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onNext: () => void;
}

const PreferredLanguage: React.FC<PreferredLanguageProps> = ({
  selectedLanguage,
  onLanguageSelect,
  onNext,
}) => {
  const theme = useTheme();
  const languageOptions: LanguageOption[] = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
      description: "Continue with English",
    },
    {
      code: "es",
      name: "Espanol",
      nativeName: "Espanol",
      description: "Continuar en español",
    },
  ];

  const handleLanguageClick = (languageCode: string) => {
    onLanguageSelect(languageCode);
    onNext(); // Automatically proceed to next step
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[50], // Using theme color
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 2,
      }}
    >
      {/* Main Content Card */}
      <Card
        sx={{
          maxWidth: 592,
          width: "100%",
          height: "auto", // Fixed height as per Figma
          borderRadius: theme.spacing(1.5), // Using theme spacing for border radius
          boxShadow: theme.shadows[3], // Using theme shadow
          position: "relative",
          zIndex: 1,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* Tree Logo in upper right corner of card */}
        <Box
          component="img"
          src={treeLogo}
          alt="Tree Logo"
          sx={{
            position: "absolute",
            top: 0, // Touches the upper part of the card
            right: 0, // Touches the right part of the card
            width: 200, // Exact width as per Figma
            height: 230, // Exact height as per Figma
            opacity: 0.08, // Exact opacity as per Figma
            zIndex: 2,
          }}
        />
        <CardContent sx={{ p: theme.spacing(4) }}>
          {/* Logo */}
          <Box
            component="img"
            src={logoMain}
            alt="5280 Human Care Center"
            sx={{
              height: 60,
              width: "auto",
              mb: theme.spacing(3),
            }}
          />

          {/* Header */}
          <Box sx={{ mb: 3 }}>
            {" "}
            {/* 24px gap as per Figma */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "14px", // Normal text as per Figma
                mb: theme.spacing(1),
                fontWeight: 400, // Regular as per Figma
                lineHeight: "160%", // 160% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Welcome to
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500, // Medium as per Figma
                color: theme.palette.text.primary,
                mb: theme.spacing(1),
                fontSize: "28px", // 28px as per Figma
                lineHeight: "120%", // 120% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              5280 Human Care Center
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "24px", // 24px as per Figma
                fontWeight: 400, // Regular as per Figma
                lineHeight: "120%", // 120% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Client Intake Portal
            </Typography>
          </Box>

          {/* Instruction Text */}
          <Box sx={{ mb: 3 }}>
            {" "}
            {/* 24px gap as per Figma */}
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                mb: theme.spacing(1),
                fontSize: "14px", // Normal text as per Figma
                fontWeight: 400, // Regular as per Figma
                lineHeight: "160%", // 160% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              We'd love to know your preferred language before moving forward.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "14px", // Normal text as per Figma
                fontWeight: 400, // Regular as per Figma
                lineHeight: "160%", // 160% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Por favor, díganos su idioma preferido
            </Typography>
          </Box>

          {/* Language Options */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {" "}
            {/* 24px gap as per Figma */}
            {languageOptions.map((option) => (
              <Card
                key={option.code}
                onClick={() => handleLanguageClick(option.code)}
                sx={{
                  cursor: "pointer",
                  border:
                    selectedLanguage === option.code
                      ? `2px solid ${theme.palette.primary.main}`
                      : `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  transition: "all 0.2s ease-in-out",
                  backgroundColor: theme.palette.background.paper,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}15`,
                  },
                }}
              >
                <CardContent sx={{ p: theme.spacing(3) }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing(2),
                      }}
                    >
                      {/* Language Code */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500, // Medium as per Figma
                          color: theme.palette.text.primary,
                          fontSize: "14px", // Normal text as per Figma
                          minWidth: 30,
                          fontFamily: "Helvetica Neue, Arial, sans-serif",
                        }}
                      >
                        {option.code.toUpperCase()}
                      </Typography>

                      {/* Language Name */}
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 500, // Medium as per Figma
                            color: theme.palette.text.primary,
                            fontSize: "14px", // Normal text as per Figma
                            mb: theme.spacing(0.5),
                            lineHeight: "160%", // 160% as per Figma
                            fontFamily: "Helvetica Neue, Arial, sans-serif",
                          }}
                        >
                          {option.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "14px", // Normal text as per Figma
                            lineHeight: "160%", // 160% as per Figma
                            fontWeight: 400, // Regular as per Figma
                            fontFamily: "Helvetica Neue, Arial, sans-serif",
                          }}
                        >
                          {option.description}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Arrow Icon */}
                    <ChevronRightIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "1.5rem",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PreferredLanguage;
