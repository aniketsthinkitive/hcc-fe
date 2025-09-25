import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../../../components/custom-input/custom-input';
import CustomSelect from '../../../components/custom-select/custom-select';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomLabel from '../../../components/custom-label/custom-label';
import CustomCheckbox from '../../../components/custom-checkbox/custom-checkbox';
import { OrganizationFormData } from '../types/organization.types';
import CustomAutoComplete from '../../../components/custom-auto-complete/custom-auto-complete';
import { stateOptions } from '../../../constant/stateOptions';

// Yup validation schema
const validationSchema = yup.object({
  organizationName: yup.string().required('Organization Name is required'),
  organizationShortName: yup.string().required('Organization Short Name is required'),
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('Zip Code is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  faxNumber: yup.string(),
  contactPersonName: yup.string().required('Contact Person Name is required'),
  organizationTimeZone: yup.string().required('Time Zone is required'),
  usesDaylightSavings: yup.boolean(),
  allTreatmentsAvailable: yup.boolean(),
  attachComplianceReports: yup.boolean(),
  clientsVisibleToAllUsers: yup.boolean(),
  externalUsersCanManageVouchers: yup.boolean(),
  enableGrantFunding: yup.boolean(),
});

interface NewOrganizationFormProps {
  initialData?: Partial<OrganizationFormData>;
  onSubmit: (data: OrganizationFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const NewOrganizationForm: React.FC<NewOrganizationFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const initialValues: OrganizationFormData = {
    organizationName: '',
    organizationShortName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    faxNumber: '',
    contactPersonName: '',
    organizationTimeZone: 'MST',
    usesDaylightSavings: true,
    allTreatmentsAvailable: false,
    attachComplianceReports: false,
    clientsVisibleToAllUsers: false,
    externalUsersCanManageVouchers: false,
    enableGrantFunding: false,
  };

  // Time zone options
  const timeZoneOptions = [
    { value: 'MST', label: 'Mountain Standard Time' },
    { value: 'PST', label: 'Pacific Standard Time' },
    { value: 'EST', label: 'Eastern Standard Time' },
    { value: 'CST', label: 'Central Standard Time' },
    { value: 'HST', label: 'Hawaii Standard Time' },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(validationSchema) as any,
    defaultValues: initialValues,
    mode: 'onChange',
  });

  // Set initial values when editing
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        const value = initialData[key as keyof OrganizationFormData];
        if (value !== undefined) {
          setValue(key as keyof OrganizationFormData, value);
        }
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data: OrganizationFormData) => {
    onSubmit(data);
  };

  const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <Typography
      variant="h6"
      sx={{
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1A1A1A',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {title}
    </Typography>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        maxHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid #E3ECEF",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#424342",
            fontFamily: "Geist",
          }}
        >
          {isEdit ? 'Edit Organization' : 'Add New Organization'}
        </Typography>
        <Box
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={onCancel}
        >
          <Typography sx={{ fontSize: "18px", color: "#2C2D2C" }}>×</Typography>
        </Box>
      </Box>

      {/* Form Content */}
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit={handleSubmit(handleFormSubmit as any)}
        onClick={(e) => e.stopPropagation()}
        sx={{
          flex: 1,
          overflow: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Organization Information */}
          <SectionTitle title="Organization Information" />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="organizationName"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Organization Name" isRequired />
                    <CustomInput
                      placeholder="Enter Organization Name"
                      name="organizationName"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.organizationName}
                      errorMessage={errors.organizationName?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="organizationShortName"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Organization Short Name" isRequired />
                    <CustomInput
                      placeholder="Enter Organization Short Name"
                      name="organizationShortName"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.organizationShortName}
                      errorMessage={errors.organizationShortName?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="contactPersonName"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Contact Person Name" isRequired />
                    <CustomInput
                      placeholder="Enter Contact Person Name"
                      name="contactPersonName"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.contactPersonName}
                      errorMessage={errors.contactPersonName?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="organizationTimeZone"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Organization Time Zone" isRequired />
                    <CustomSelect
                      placeholder="Select Time Zone"
                      name="organizationTimeZone"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      items={timeZoneOptions}
                      hasError={!!errors.organizationTimeZone}
                      errorMessage={errors.organizationTimeZone?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "#E3ECEF" }} />

          {/* Contact Information */}
          <SectionTitle title="Contact Information" />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Phone Number" isRequired />
                    <CustomInput
                      placeholder="eg. (671) 555-0110"
                      name="phoneNumber"
                      value={field.value}
                      onChange={field.onChange}
                      format="phone"
                      hasError={!!errors.phoneNumber}
                      errorMessage={errors.phoneNumber?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="faxNumber"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Fax Number" />
                    <CustomInput
                      placeholder="eg. 888-620-9502"
                      name="faxNumber"
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.faxNumber}
                      errorMessage={errors.faxNumber?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "#E3ECEF" }} />

          {/* Address Information */}
          <SectionTitle title="Address Information" />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="addressLine1"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Address Line 1" isRequired />
                    <CustomInput
                      placeholder="Enter Address Line 1"
                      name="addressLine1"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.addressLine1}
                      errorMessage={errors.addressLine1?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="addressLine2"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Address Line 2" />
                    <CustomInput
                      placeholder="Enter Address Line 2"
                      name="addressLine2"
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.addressLine2}
                      errorMessage={errors.addressLine2?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="City" isRequired />
                    <CustomInput
                      placeholder="Enter City"
                      name="city"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.city}
                      errorMessage={errors.city?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="State" isRequired />
                    <CustomAutoComplete
                      value={String(field.value)}
                      placeholder="State"
                      options={stateOptions}
                      onChange={(selectedValue) => {
                        setValue("state", selectedValue, {
                          shouldValidate: true,
                        });
                      }}
                      hasError={!!errors.state}
                      errorMessage={errors.state?.message}
                      maxHeightForOptionsList={250}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Zip Code" isRequired />
                    <CustomInput
                      placeholder="Enter Zip Code"
                      name="zipCode"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.zipCode}
                      errorMessage={errors.zipCode?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "#E3ECEF" }} />

          {/* Organization Settings */}
          <SectionTitle title="Organization Settings" />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="usesDaylightSavings"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Organization Uses Daylight Savings Time"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="allTreatmentsAvailable"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="All Treatments Available"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="attachComplianceReports"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Attach Compliance Reports"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="clientsVisibleToAllUsers"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Clients Visible to All Users"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="externalUsersCanManageVouchers"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="External Users Can Manage Vouchers"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="enableGrantFunding"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Enable Grant Funding"
                    size="sm"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          borderTop: "1px solid #E3ECEF",
          backgroundColor: "#FFFFFF",
          flexShrink: 0,
        }}
      >
        <CustomButton
          variant="secondary"
          size="md"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </CustomButton>
        <CustomButton
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : (isEdit ? "Update Organization" : "Create Organization")}
        </CustomButton>
      </Box>
    </Box>
  );
};

export default NewOrganizationForm;
