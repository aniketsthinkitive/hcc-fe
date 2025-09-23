import React from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import AddHomeIcon from "@mui/icons-material/AddHome";
import CustomInput from "../../../components/custom-input/custom-input";
import CustomSelect from "../../../components/custom-select/custom-select";
import StepperNavigation from "../components/StepperNavigation";

interface MailingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  county: string;
  zipCode: string;
}

interface MailingAddressProps {
  mailingAddress: MailingAddress;
  onFieldChange: (field: keyof MailingAddress, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  errors?: Partial<Record<keyof MailingAddress, string>>;
}

const MailingAddress: React.FC<MailingAddressProps> = ({
  mailingAddress,
  onFieldChange,
  onBack,
  onNext,
  errors = {},
}) => {
  const theme = useTheme();
  const handleInputChange =
    (field: keyof MailingAddress) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange(field, e.target.value);
    };

  const handleSelectChange =
    (field: keyof MailingAddress) => (e: SelectChangeEvent<string>) => {
      onFieldChange(field, e.target.value);
    };

  const isFormValid = () => {
    return (
      mailingAddress.addressLine1 &&
      mailingAddress.city &&
      mailingAddress.state &&
      mailingAddress.county &&
      mailingAddress.zipCode &&
      !Object.values(errors).some((error) => error)
    );
  };

  // Sample states and counties - in real app, these would come from API
  const states = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    // Add more states as needed
  ];

  const counties = [
    { value: "Adams County", label: "Adams County" },
    { value: "Arapahoe County", label: "Arapahoe County" },
    { value: "Boulder County", label: "Boulder County" },
    { value: "Denver County", label: "Denver County" },
    { value: "Jefferson County", label: "Jefferson County" },
    { value: "Larimer County", label: "Larimer County" },
    { value: "Weld County", label: "Weld County" },
    // Add more counties as needed
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
          maxWidth: 800, // Increased width to match ContactInformation
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
                width: 40, // Decreased icon size to match ContactInformation
                height: 40, // Decreased icon size to match ContactInformation
                borderRadius: "50%",
                background:
                  "linear-gradient(134.42deg, #84B8FB -11.79%, #0067ED 110.72%)", // Blue gradient as per Figma
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: theme.spacing(2),
              }}
            >
              <AddHomeIcon
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
                mb: theme.spacing(0.5), // Reduced margin to match ContactInformation
                fontSize: "22px", // Decreased font size to match ContactInformation
                lineHeight: "120%", // 120% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                textAlign: "left", // Left aligned
              }}
            >
              Mailing Address
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "16px", // Increased font size to match ContactInformation
                fontWeight: 400, // Regular as per Figma
                lineHeight: "160%", // 160% as per Figma
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                textAlign: "left", // Left aligned
              }}
            >
              Please enter your mailing address. This is the address where we
              will mail your REQUIRED curriculum.
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
              {/* Address Line 1 */}
              <Box sx={{ flex: "1 1 100%" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size to match ContactInformation
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  Address Line 1{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <CustomInput
                  name="addressLine1"
                  placeholder="Enter Address Line 1"
                  value={mailingAddress.addressLine1}
                  onChange={handleInputChange("addressLine1")}
                  hasError={!!errors.addressLine1}
                  errorMessage={errors.addressLine1}
                  required
                />
              </Box>

              {/* Address Line 2 */}
              <Box sx={{ flex: "1 1 100%" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size to match ContactInformation
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  Address Line 2
                </Typography>
                <CustomInput
                  name="addressLine2"
                  placeholder="Enter Address Line 2"
                  value={mailingAddress.addressLine2}
                  onChange={handleInputChange("addressLine2")}
                  hasError={!!errors.addressLine2}
                  errorMessage={errors.addressLine2}
                />
              </Box>

              {/* City */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size to match ContactInformation
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  City{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <CustomInput
                  name="city"
                  placeholder="Enter City"
                  value={mailingAddress.city}
                  onChange={handleInputChange("city")}
                  hasError={!!errors.city}
                  errorMessage={errors.city}
                  required
                />
              </Box>

              {/* State */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size to match ContactInformation
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  State{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <CustomSelect
                  name="state"
                  placeholder="Select State"
                  value={mailingAddress.state}
                  items={states}
                  onChange={handleSelectChange("state")}
                  hasError={!!errors.state}
                  errorMessage={errors.state}
                  bgWhite={true}
                />
              </Box>

              {/* County */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size to match ContactInformation
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  County{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <CustomSelect
                  name="county"
                  placeholder="Select County"
                  value={mailingAddress.county}
                  items={counties}
                  onChange={handleSelectChange("county")}
                  hasError={!!errors.county}
                  errorMessage={errors.county}
                  bgWhite={true}
                />
              </Box>

              {/* Zip Code */}
              <Box sx={{ flex: "1 1 calc(50% - 8px)", minWidth: "200px" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    mb: theme.spacing(1),
                    fontSize: "12px", // Decreased font size to match ContactInformation
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  Zip/Post Code{" "}
                  <span style={{ color: theme.palette.error.main }}>*</span>
                </Typography>
                <CustomInput
                  name="zipCode"
                  placeholder="Enter Zip/Post Code"
                  value={mailingAddress.zipCode}
                  onChange={handleInputChange("zipCode")}
                  hasError={!!errors.zipCode}
                  errorMessage={errors.zipCode}
                  isNumeric
                  maxLength={10}
                  required
                />
              </Box>
            </Box>
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

export default MailingAddress;
