import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  useTheme,
  Tooltip,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import CustomInput from "../../../components/custom-input/custom-input";
import DatePickerField from "../../../components/date-picker-field/date-picker-field";
import StepperNavigation from "./StepperNavigation";
import { Dayjs } from "dayjs";
import CustomLabel from "../../../components/custom-label/custom-label";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Dayjs | null;
}

interface ContactInformationProps {
  contactInfo: ContactInfo;
  onFieldChange: (
    field: keyof ContactInfo,
    value: string | Dayjs | null,
  ) => void;
  onBack: () => void;
  onNext: () => void;
  errors?: Partial<Record<keyof ContactInfo, string>>;
  isCertified: boolean;
  onCertificationChange: (certified: boolean) => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  contactInfo,
  onFieldChange,
  onBack,
  onNext,
  errors = {},
  isCertified,
  onCertificationChange,
}) => {
  const theme = useTheme();
  const handleInputChange =
    (field: keyof ContactInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange(field, e.target.value);
    };

  const handleDateChange = (date: Dayjs | null) => {
    onFieldChange("dateOfBirth", date);
  };

  const isFormValid = () => {
    const isValid =
      contactInfo.firstName &&
      contactInfo.lastName &&
      contactInfo.email &&
      contactInfo.phone &&
      contactInfo.dateOfBirth !== null &&
      isCertified &&
      !Object.values(errors).some((error) => error);

    // Debug logging
    console.log("Form validation check:", {
      firstName: contactInfo.firstName,
      lastName: contactInfo.lastName,
      email: contactInfo.email,
      phone: contactInfo.phone,
      dateOfBirth: contactInfo.dateOfBirth,
      isCertified,
      errors,
      isValid,
    });

    return isValid;
  };

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
          maxWidth: 800, // Increased width
          width: "100%",
          borderRadius: theme.spacing(1.5), // Using theme border radius
          boxShadow: theme.shadows[3], // Using theme shadow
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent sx={{ p: theme.spacing(4) }}>
          {/* Header */}
          <Box sx={{ mb: theme.spacing(4) }}>
            {/* Icon */}
            <Box
              sx={{
                width: 40, // Decreased icon size
                height: 40, // Decreased icon size
                borderRadius: "50%",
                background:
                  "linear-gradient(134.42deg, #84B8FB -11.79%, #0067ED 110.72%)", // Blue gradient as per Figma
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: theme.spacing(2),
              }}
            >
              <CallIcon
                sx={{
                  color: "white",
                  fontSize: "1.5rem", // Decreased icon size
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500, // Medium as per Figma
                color: theme.palette.text.primary,
                mb: theme.spacing(0.5),
                fontSize: "22px", // Decreased font size
                lineHeight: "120%", // 120% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                textAlign: "left", // Left aligned
              }}
            >
              Contact Information
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "16px", // Decreased font size
                fontWeight: 400, // Regular as per Figma
                lineHeight: "160%", // 160% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                textAlign: "left", // Left aligned
              }}
            >
              The information you provide on this form will be used to create
              your client portal and will be used to send you important
              information regarding your services. Please make sure to
              capitalize, check your spelling, and use your FIRST and LAST name
              as it appears on your drivers license/ID.
            </Typography>
          </Box>

          {/* Divider line after header */}
          <Box
            sx={{
              width: "calc(100% + 64px)", // Override MUI padding
              marginLeft: "-32px",
              height: "1px",
              backgroundColor: theme.palette.divider,
              mb: theme.spacing(3),
            }}
          />

          {/* Form Fields */}
          <Box sx={{ mb: theme.spacing(4) }}>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}
            >
              {/* First Name */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  First Name{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <CustomInput
                  name="firstName"
                  placeholder="eg. John"
                  value={contactInfo.firstName}
                  onChange={handleInputChange("firstName")}
                  hasError={!!errors.firstName}
                  errorMessage={errors.firstName}
                  required
                />
              </Box>

              {/* Last Name */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  Last Name{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <CustomInput
                  name="lastName"
                  placeholder="eg. Doe"
                  value={contactInfo.lastName}
                  onChange={handleInputChange("lastName")}
                  hasError={!!errors.lastName}
                  errorMessage={errors.lastName}
                  required
                />
              </Box>

              {/* Email */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  Email{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <Box sx={{ position: "relative" }}>
                  <CustomInput
                    name="email"
                    placeholder="eg. johndoe@example.com"
                    value={contactInfo.email}
                    onChange={handleInputChange("email")}
                    hasError={!!errors.email}
                    errorMessage={errors.email}
                    isEmail
                    required
                    icon={
                      <EmailIcon
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "1.2rem",
                        }}
                      />
                    }
                  />
                  <Tooltip title="We'll use this email to send you important updates about your services">
                    <InfoIcon
                      sx={{
                        position: "absolute",
                        right: theme.spacing(2),
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: theme.palette.text.secondary,
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>

              {/* Phone Number */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  Phone Number{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <Box sx={{ position: "relative" }}>
                  <CustomInput
                    name="phone"
                    placeholder="eg. (302) 555-0107"
                    value={contactInfo.phone}
                    onChange={handleInputChange("phone")}
                    hasError={!!errors.phone}
                    errorMessage={errors.phone}
                    format="phone"
                    required
                  />
                  <Tooltip title="We'll use this number to contact you about appointments and services">
                    <InfoIcon
                      sx={{
                        position: "absolute",
                        right: theme.spacing(2),
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: theme.palette.text.secondary,
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>

              {/* Date of Birth */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                {/* <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: '12px', // Decreased font size
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                  }}
                >
                  Date of Birth <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography> */}
                <CustomLabel label="Date of Birth" isRequired={true} />
                <Box sx={{ width: "49%" }}>
                  <DatePickerField
                    name="dateOfBirth"
                    value={contactInfo.dateOfBirth}
                    onChange={handleDateChange}
                    hasError={!!errors.dateOfBirth}
                    errorMessage={errors.dateOfBirth}
                    label="MM/DD/YYYY"
                    format="MM/DD/YYYY"
                    disableFuture={true}
                    bgWhite={true}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Certification Checkbox */}
          <Box sx={{ mb: theme.spacing(4) }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCertified}
                  onChange={(e) => onCertificationChange(e.target.checked)}
                  sx={{
                    color: theme.palette.primary.main,
                    "&.Mui-checked": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "16px", // Decreased font size
                    fontWeight: 400, // Regular as per Figma
                    lineHeight: "160%", // 160% as per Figma
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  I certify that I, {contactInfo.firstName}{" "}
                  {contactInfo.lastName}, am the person who will be
                  completing/providing the information for the remainder of this
                  intake AND that I am the person seeking to enroll in services
                  with 5280 Human Care Center.
                </Typography>
              }
              sx={{ alignItems: "flex-start" }}
            />
          </Box>

          {/* Divider line after form inputs */}
          <Box
            sx={{
              width: "calc(100% + 64px)", // Override MUI padding
              marginLeft: "-32px",
              height: "1px",
              backgroundColor: theme.palette.divider,
              mb: theme.spacing(3),
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
            isNextDisabled={!isFormValid()}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactInformation;
