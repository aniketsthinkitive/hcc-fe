import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CompanyInformation } from '../types/company.types';

interface CompanyInformationContentProps {
  companyInfo: CompanyInformation;
}

const CompanyInformationContent: React.FC<CompanyInformationContentProps> = ({ companyInfo }) => {
  const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Box sx={{ marginBottom: 3 }}>
      {title && (
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1A1A1A',
            marginBottom: 2,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {title}
        </Typography>
      )}
      <Paper
        elevation={0}
        sx={{
          // backgroundColor: '#FFFFFF',
          paddingX: 2,
          borderRadius: '8px',
          paddingY: 1,
          border: '1px solid #E7E9EB',
        }}
      >
        {children}
      </Paper>
    </Box>
  );

  const InfoField: React.FC<{ label: string; value: string | boolean | number }> = ({ label, value }) => (
    <Box sx={{ marginBottom: 2 }}>
      <Typography
        variant="body2"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#666666',
          marginBottom: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: '1rem',
          color: '#1A1A1A',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (value || '-')}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        paddingX: { xs: 2, sm: 3, md: 12, lg: 12 },
        backgroundColor: "#F6F6F6",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      {/* Company Information Section */}
      <InfoSection title="">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField label="Company Name" value={companyInfo.companyName} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Company URL"
              value={companyInfo.contact.website || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Support Email"
              value={companyInfo.contact.email}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Referral Email"
              value={companyInfo.referral.email}
            />
          </Grid>
        </Grid>
      </InfoSection>

      {/* Contacts Section */}
      <InfoSection title="Contacts">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Company Phone"
              value={companyInfo.contact.phoneNumber}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Company FAX"
              value={companyInfo.contact.faxNumber || ""}
            />
          </Grid>
        </Grid>
      </InfoSection>

      {/* Address Details Section */}
      <InfoSection title="Address Details dd">
        <Grid container spacing={3}>
          {/* Company Address */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1A1A1A",
                marginBottom: 2,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Company Address
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }}>
                <InfoField
                  label="Address Line 1"
                  value={companyInfo.address.addressLine1}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 8, lg: 8 }}>
                <InfoField
                  label="Address Line 2"
                  value={companyInfo.address.addressLine1}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }}>
                <InfoField label="City" value={companyInfo.address.city} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }}>
                <InfoField label="State" value={companyInfo.address.state} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }}>
                <InfoField label="Zip" value={companyInfo.address.zipCode} />
              </Grid>
            </Grid>
          </Grid>

          {/* Company Payment Address */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#1A1A1A",
                marginBottom: 2,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Company Payment Address
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }}>
                <InfoField
                  label="Address Line 1"
                  value={companyInfo.address.addressLine1}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 8, lg: 8 }}>
                <InfoField
                  label="Address Line 2"
                  value={companyInfo.address.addressLine1}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }}>
                <InfoField
                  label="City"
                  value={companyInfo.paymentAddress.city}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }}>
                <InfoField
                  label="State"
                  value={companyInfo.paymentAddress.state}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }}>
                <InfoField
                  label="Zip"
                  value={companyInfo.paymentAddress.zipCode}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </InfoSection>

      {/* Additional Information Section */}
      <InfoSection title="Additional Information">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Company NPI Number"
              value={companyInfo.business.npiNumber || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Company Taxonomy Code"
              value={companyInfo.business.taxonomyCode || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Company State ID"
              value={companyInfo.business.stateId || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Company Time Zone"
              value={companyInfo.business.timeZone}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField label="Other ID Label" value="" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Calendar Start Time"
              value={companyInfo.calendar.startTime}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Calendar End Time"
              value={companyInfo.calendar.endTime}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField label="ML Number Label" value="" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Date Note Tracking Enabled"
              value={companyInfo.settings.dateNoteTrackingEnabled || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Default Client Receipt Type"
              value={companyInfo.settings.defaultClientReceiptType || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Days Back Call In"
              value={companyInfo.settings.daysBackCallIn || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Days Must Call In"
              value={companyInfo.settings.daysMustCallIn || ""}
            />
          </Grid>
        </Grid>
      </InfoSection>

      <InfoSection title="Uploaded Files">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Website Fav Icon File"
              value={companyInfo.business.npiNumber || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Login Splash File"
              value={companyInfo.business.taxonomyCode || ""}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <InfoField
              label="Logo File"
              value={companyInfo.business.timeZone}
            />
          </Grid>
        </Grid>
      </InfoSection>
    </Box>
  );
};

export default CompanyInformationContent;
