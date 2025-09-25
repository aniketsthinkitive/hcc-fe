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
import { CompanyFormData } from '../types/company.types';
import CustomAutoComplete from '../../../components/custom-auto-complete/custom-auto-complete';
import { stateOptions } from '../../../constant/stateOptions';
import { CustomFileUpload } from '../../../components/custom-fileupload';

// Yup validation schema
const validationSchema = yup.object({
  companyName: yup.string().required('Company Name is required'),
  companyShortName: yup.string().required('Company Short Name is required'),
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('Zip Code is required'),
  country: yup.string().required('Country is required'),
  paymentAddressLine1: yup.string().required('Payment Address Line 1 is required'),
  paymentAddressLine2: yup.string(),
  paymentCity: yup.string().required('Payment City is required'),
  paymentState: yup.string().required('Payment State is required'),
  paymentZipCode: yup.string().required('Payment Zip Code is required'),
  paymentCountry: yup.string().required('Payment Country is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  faxNumber: yup.string(),
  email: yup.string().email('Invalid email format').required('Email is required'),
  website: yup.string().url('Invalid URL format'),
  referralEmail: yup.string().email('Invalid email format').required('Referral Email is required'),
  taxId: yup.string().required('Tax ID is required'),
  licenseNumber: yup.string().required('License Number is required'),
  npiNumber: yup.string(),
  taxonomyCode: yup.string(),
  stateId: yup.string(),
  timeZone: yup.string().required('Time Zone is required'),
  usesDST: yup.boolean(),
  calendarStartTime: yup.string(),
  calendarEndTime: yup.string(),
  defaultCurrency: yup.string().required('Default Currency is required'),
  dateFormat: yup.string().required('Date Format is required'),
  timeFormat: yup.string().required('Time Format is required'),
  language: yup.string().required('Language is required'),
  defaultClientReceiptType: yup.string(),
  daysBackCallIn: yup.number().min(0, 'Days must be 0 or greater'),
  daysMustCallIn: yup.number().min(0, 'Days must be 0 or greater'),
  dateNoteTrackingEnabled: yup.string(),
  // New fields
  sameAsCompanyAddress: yup.boolean(),
  mlNumberLabel: yup.string(),
  otherIdLabel: yup.string(),
  enableVoucherTracking: yup.boolean(),
  setMissedAppointmentsToMissed: yup.boolean(),
  showTreatmentFeesToExternalUsers: yup.boolean(),
  omitClientNamesInSystemEmails: yup.boolean(),
  hideSupervisorNamesFromExternalUsers: yup.boolean(),
  propagateToAllClients: yup.boolean(),
});

interface CompanyInformationEditFormProps {
  initialData?: Partial<CompanyFormData>;
  onSubmit: (data: CompanyFormData) => void;
  onCancel: () => void;
}

const CompanyInformationEditForm: React.FC<CompanyInformationEditFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
    const [files, setFiles] = useState<any[]>([]);

  const initialValues: CompanyFormData = {
    companyName: '',
    companyShortName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentAddressLine1: '',
    paymentAddressLine2: '',
    paymentCity: '',
    paymentState: '',
    paymentZipCode: '',
    paymentCountry: 'United States',
    phoneNumber: '',
    faxNumber: '',
    email: '',
    website: '',
    referralEmail: '',
    taxId: '',
    licenseNumber: '',
    npiNumber: '',
    taxonomyCode: '',
    stateId: '',
    timeZone: 'MST',
    usesDST: true,
    calendarStartTime: '',
    calendarEndTime: '',
    defaultCurrency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12 Hour',
    language: 'English',
    defaultClientReceiptType: '',
    daysBackCallIn: 0,
    daysMustCallIn: 0,
    dateNoteTrackingEnabled: '',
    // New fields
    sameAsCompanyAddress: false,
    mlNumberLabel: '',
    otherIdLabel: '',
    enableVoucherTracking: false,
    setMissedAppointmentsToMissed: false,
    showTreatmentFeesToExternalUsers: false,
    omitClientNamesInSystemEmails: false,
    hideSupervisorNamesFromExternalUsers: false,
    propagateToAllClients: false,
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(validationSchema) as any,
    defaultValues: initialValues,
    mode: 'onChange',
  });

  // Set initial values when editing
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        const value = initialData[key as keyof CompanyFormData];
        if (value !== undefined) {
          setValue(key as keyof CompanyFormData, value);
        }
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data: CompanyFormData) => {
    onSubmit(data);
  };

  const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <Typography
      variant="h6"
      sx={{
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1A1A1A',
        // marginBottom: 2,
        // marginTop: 3,
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
          Edit Company Information
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
          minHeight: 0, // Important for flex child to shrink
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Company Name" isRequired />
                    <CustomInput
                      placeholder="Enter Company Name"
                      name="companyName"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.companyName}
                      errorMessage={errors.companyName?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Company URL" />
                    <CustomInput
                      placeholder="Enter Company URL"
                      name="website"
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.website}
                      errorMessage={errors.website?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Support Email" isRequired />
                    <CustomInput
                      placeholder="Enter Support Email"
                      name="email"
                      value={field.value}
                      onChange={field.onChange}
                      isEmail
                      hasError={!!errors.email}
                      errorMessage={errors.email?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="referralEmail"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Referral Email" isRequired />
                    <CustomInput
                      placeholder="Enter Referral Email"
                      name="referralEmail"
                      value={field.value}
                      onChange={field.onChange}
                      isEmail
                      hasError={!!errors.referralEmail}
                      errorMessage={errors.referralEmail?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "#E3ECEF" }} />

          {/* Contacts Section */}
          <SectionTitle title="Contacts" />
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
                    <CustomLabel label="Company Phone" />
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

          {/* Address Details Section */}
          <SectionTitle title="Address Details" />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              background: "#F6F6F6",
              paddingY: 1,
              borderRadius: 1,
              paddingX: 2,
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              Company Address
            </Typography>
          </Box>
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
                      value={field.value}
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
                    <CustomLabel label="Zip" isRequired />
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "6px",
              background: "#F6F6F6",
              paddingY: 1,
              borderRadius: 1,
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: 2,
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              Company Payment Address
            </Typography>
            <Controller
              name="sameAsCompanyAddress"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  checked={field.value || false}
                  onChange={field.onChange}
                  label="Same as Company Address"
                  size="sm"
                />
              )}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="paymentAddressLine1"
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
                      name="paymentAddressLine1"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.paymentAddressLine1}
                      errorMessage={errors.paymentAddressLine1?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="paymentAddressLine2"
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
                      name="paymentAddressLine2"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.paymentAddressLine2}
                      errorMessage={errors.paymentAddressLine2?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="paymentCity"
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
                      name="paymentCity"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.paymentCity}
                      errorMessage={errors.paymentCity?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="paymentState"
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
                        setValue("paymentState", selectedValue, {
                          shouldValidate: true,
                        });
                      }}
                      hasError={!!errors.paymentState}
                      errorMessage={errors.paymentState?.message}
                      maxHeightForOptionsList={250}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="paymentZipCode"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Zip" isRequired />
                    <CustomInput
                      placeholder="Enter Zip Code"
                      name="paymentZipCode"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.paymentZipCode}
                      errorMessage={errors.paymentZipCode?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "#E3ECEF" }} />

          {/* Additional Information Section */}
          <SectionTitle title="Additional Information" />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="npiNumber"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="NPI Number" />
                    <CustomInput
                      placeholder="Enter NPI Number"
                      name="npiNumber"
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.npiNumber}
                      errorMessage={errors.npiNumber?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="taxonomyCode"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Taxonomy Code" />
                    <CustomInput
                      placeholder="Enter Taxonomy Code"
                      name="taxonomyCode"
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.taxonomyCode}
                      errorMessage={errors.taxonomyCode?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="stateId"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="State ID" />
                    <CustomInput
                      placeholder="Enter State ID"
                      name="stateId"
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.stateId}
                      errorMessage={errors.stateId?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="timeZone"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Company Time Zone" isRequired />
                    <CustomSelect
                      placeholder="Select Time Zone"
                      name="timeZone"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      items={[]}
                      hasError={!!errors.timeZone}
                      errorMessage={errors.timeZone?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="usesDST"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Company Uses Daylight Savings Time"
                    size="sm"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="calendarStartTime"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Calendar Start Time" />
                    <CustomInput
                      placeholder="eg. 3:00 AM"
                      name="calendarStartTime"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.calendarStartTime}
                      errorMessage={errors.calendarStartTime?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="calendarEndTime"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Calendar End Time" />
                    <CustomInput
                      placeholder="eg. 10:00 PM"
                      name="calendarEndTime"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.calendarEndTime}
                      errorMessage={errors.calendarEndTime?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="mlNumberLabel"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="ML Number Label" />
                    <CustomInput
                      placeholder="Enter ML Number Label"
                      name="mlNumberLabel"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.mlNumberLabel}
                      errorMessage={errors.mlNumberLabel?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="otherIdLabel"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Other ID Label" />
                    <CustomInput
                      placeholder="Enter Other ID Label"
                      name="otherIdLabel"
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.otherIdLabel}
                      errorMessage={errors.otherIdLabel?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="dateNoteTrackingEnabled"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Date Note Tracking Enabled" />
                    <CustomInput
                      placeholder="Enter Date Note Tracking"
                      name="dateNoteTrackingEnabled"
                      value={field.value || ""}
                      onChange={field.onChange}
                      hasError={!!errors.dateNoteTrackingEnabled}
                      errorMessage={errors.dateNoteTrackingEnabled?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="enableVoucherTracking"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Enable Voucher Tracking"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="setMissedAppointmentsToMissed"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Set Missed Appointments to Missed"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="showTreatmentFeesToExternalUsers"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Show Treatment Fees to External Users"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="omitClientNamesInSystemEmails"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Omit Client Names in System Emails"
                    size="sm"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="hideSupervisorNamesFromExternalUsers"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value || false}
                    onChange={field.onChange}
                    label="Hide Supervisor Names from External Users"
                    size="sm"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="timeZone"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Company Time Zone" isRequired />
                    <CustomSelect
                      placeholder="Select Time Zone"
                      name="timeZone"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      items={[]}
                      hasError={!!errors.timeZone}
                      errorMessage={errors.timeZone?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="propagateToAllClients"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CustomCheckbox
                      checked={field.value || false}
                      onChange={field.onChange}
                      label="Propagate to all clients"
                      size="sm"
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="daysBackCallIn"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Days Back Call In" />
                    <CustomInput
                      placeholder="eg. 7"
                      name="daysBackCallIn"
                      value={field.value || ""}
                      onChange={field.onChange}
                      isNumeric
                      hasError={!!errors.daysBackCallIn}
                      errorMessage={errors.daysBackCallIn?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="daysMustCallIn"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Days Must Call In" />
                    <CustomInput
                      placeholder="eg. 6"
                      name="daysMustCallIn"
                      value={field.value || ""}
                      onChange={field.onChange}
                      isNumeric
                      hasError={!!errors.daysMustCallIn}
                      errorMessage={errors.daysMustCallIn?.message}
                    />
                  </Box>
                )}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <CustomLabel label="Company Documents" />
            <CustomFileUpload
              files={files}
              onFilesChange={setFiles}
              onFileAdd={(file) => {
                console.log("File added:", file);
              }}
              onFileRemove={(fileId) => {
                console.log("File removed:", fileId);
              }}
              type="default"
              size="md"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              maxFiles={5}
              maxFileSize={5 * 1024 * 1024} // 5MB
              placeholder="Drag and drop files here or click to browse"
              showFileList={true}
              showProgress={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <CustomLabel label="Login Splash File" />
            <CustomFileUpload
              files={files}
              onFilesChange={setFiles}
              onFileAdd={(file) => {
                console.log("File added:", file);
              }}
              onFileRemove={(fileId) => {
                console.log("File removed:", fileId);
              }}
              type="default"
              size="md"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              maxFiles={5}
              maxFileSize={5 * 1024 * 1024} // 5MB
              placeholder="Drag and drop files here or click to browse"
              showFileList={true}
              showProgress={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <CustomLabel label="Company Logo File" />
            <CustomFileUpload
              files={files}
              onFilesChange={setFiles}
              onFileAdd={(file) => {
                console.log("File added:", file);
              }}
              onFileRemove={(fileId) => {
                console.log("File removed:", fileId);
              }}
              type="default"
              size="md"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              maxFiles={5}
              maxFileSize={5 * 1024 * 1024} // 5MB
              placeholder="Drag and drop files here or click to browse"
              showFileList={true}
              showProgress={true}
            />
          </Grid>
        </Box>
      </Box>

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
          {isSubmitting ? "Saving..." : "Save Changes"}
        </CustomButton>
      </Box>
    </Box>
    // </Box>
  );
};

export default CompanyInformationEditForm;
