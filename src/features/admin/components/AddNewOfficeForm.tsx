import React, { useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../../../components/custom-input/custom-input';
import CustomSelect from '../../../components/custom-select/custom-select';
import CustomCheckbox from '../../../components/custom-checkbox/custom-checkbox';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomLabel from '../../../components/custom-label/custom-label';
import CustomAutoComplete from '../../../components/custom-auto-complete/custom-auto-complete';
import { stateOptions } from '../../../constant/stateOptions';
import { timezoneOptions } from '../../../constant/timezoneOptions';

// Form validation schema
const officeFormSchema = yup.object({
  officeShortName: yup.string().required('Office Short Name is required'),
  allTreatmentsProvided: yup.boolean(),
  officeTimeZone: yup.string().required('Office Time Zone is required'),
  officeUsesDaylightSavings: yup.boolean(),
  phoneNumber: yup.string().matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number'),
  colorLineBPhoneNumber: yup.string().matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number'),
  faxPhoneNumber: yup.string().matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number'),
  smsReminderFooter: yup.string(),
  officeNameOnPortal: yup.string(),
  officeName: yup.string(),
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(),
  city: yup.string().required('City is required'),
  physicalAddress: yup.object({
    state_id: yup.string().required('State is required'),
  }),
  zipCode: yup.string().required('Zip Code is required'),
  npiNumber: yup.string(),
  taxonomyCode: yup.string(),
  stateId: yup.string(),
  attendingDoctor: yup.string(),
  callInStartTime: yup.string(),
  callInEndTime: yup.string(),
});

export interface OfficeFormData {
  officeShortName: string;
  allTreatmentsProvided?: boolean;
  officeTimeZone: string;
  officeUsesDaylightSavings?: boolean;
  phoneNumber?: string;
  colorLineBPhoneNumber?: string;
  faxPhoneNumber?: string;
  smsReminderFooter?: string;
  officeNameOnPortal?: string;
  officeName?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  physicalAddress: {
    state_id: string;
  };
  zipCode: string;
  npiNumber?: string;
  taxonomyCode?: string;
  stateId?: string;
  attendingDoctor?: string;
  callInStartTime?: string;
  callInEndTime?: string;
}

interface AddNewOfficeFormProps {
  isEdit?: boolean;
  initialData?: Partial<OfficeFormData>;
  onSubmit: (data: OfficeFormData) => void;
  onCancel: () => void;
}


const AddNewOfficeForm: React.FC<AddNewOfficeFormProps> = ({
  isEdit = false,
  initialData,
  onSubmit,
  onCancel,
}) => {

  const initialValues = {
    officeShortName: "",
    allTreatmentsProvided: false,
    officeTimeZone: "",
    officeUsesDaylightSavings: false,
    phoneNumber: "",
    colorLineBPhoneNumber: "",
    faxPhoneNumber: "",
    smsReminderFooter: "",
    officeNameOnPortal: "",
    officeName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    physicalAddress: {
      state_id: "",
    },
    zipCode: "",
    npiNumber: "",
    taxonomyCode: "",
    stateId: "",
    attendingDoctor: "",
    callInStartTime: "",
    callInEndTime: "",
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OfficeFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(officeFormSchema) as any,
    defaultValues: initialValues,
    mode: 'onChange', // This will trigger validation on change and blur
  });

  // Set initial values when editing
  useEffect(() => {
    if (isEdit && initialData) {
      Object.keys(initialData).forEach((key) => {
        const value = initialData[key as keyof OfficeFormData];
        if (value !== undefined) {
          setValue(key as keyof OfficeFormData, value);
        }
      });
    }
  }, [isEdit, initialData, setValue]);


  const handleFormSubmit = (data: OfficeFormData) => {
    onSubmit(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
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
          {isEdit ? "Edit Office" : "Add New Office"}
        </Typography>
        <Box
          sx={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            // backgroundColor: "#F6F6F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            // "&:hover": {
            //   backgroundColor: "#E7E9EB",
            // },
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
        sx={{
          flex: 1,
          overflow: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* First Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Office Short Name and Checkbox */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <Controller
                name="officeShortName"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Office Short Name" isRequired />
                    <CustomInput
                      placeholder="Enter Office Short Name"
                      name="officeShortName"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.officeShortName}
                      errorMessage={errors.officeShortName?.message}
                      // required
                    />
                  </Box>
                )}
              />

              <Controller
                name="allTreatmentsProvided"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value}
                    onChange={field.onChange}
                    label="All Treatments are provided at this office"
                    size="sm"
                  />
                )}
              />

              <Controller
                name="officeTimeZone"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Office Time Zone" isRequired />
                    <CustomAutoComplete
                      value={String(field.value)}
                      placeholder="Select Office Time Zone"
                      options={timezoneOptions}
                      onChange={(selectedValue) => {
                        setValue("officeTimeZone", selectedValue, {
                          shouldValidate: true,
                        });
                      }}
                      hasError={!!errors.officeTimeZone}
                      errorMessage={errors.officeTimeZone?.message}
                      maxHeightForOptionsList={250}
                    />
                  </Box>
                )}
              />
            </Box>

            <Divider sx={{ borderColor: "#E3ECEF" }} />

            {/* Second Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <Controller
                name="officeUsesDaylightSavings"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    checked={field.value}
                    onChange={field.onChange}
                    label="Office Uses Daylight Savings Time"
                    size="sm"
                  />
                )}
              />

              {/* Phone Numbers Row */}
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="Phone Number" />
                      <CustomInput
                        placeholder="eg. (205) 555-0100"
                        name="phoneNumber"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.phoneNumber}
                        errorMessage={errors.phoneNumber?.message}
                        format="phone"
                      />
                    </Box>
                  )}
                />

                {/* <Controller
                  name="colorLineBPhoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="Color-Line B Phone Number" />
                      <CustomInput
                        placeholder="eg. (205) 555-0100"
                        name="colorLineBPhoneNumber"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.colorLineBPhoneNumber}
                        errorMessage={errors.colorLineBPhoneNumber?.message}
                        format="phone"
                      />
                    </Box>
                  )}
                /> */}

                <Controller
                  name="faxPhoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="FAX Phone Number" />
                      <CustomInput
                        placeholder="eg. (205) 555-0100"
                        name="faxPhoneNumber"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.faxPhoneNumber}
                        errorMessage={errors.faxPhoneNumber?.message}
                        format="phone"
                      />
                    </Box>
                  )}
                />
              </Box>

              {/* SMS Reminder Footer */}
              {/* <Controller
                name="smsReminderFooter"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="SMS Reminder Footer" />
                    <CustomInput
                      placeholder="Placeholder"
                      name="smsReminderFooter"
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!errors.smsReminderFooter}
                      errorMessage={errors.smsReminderFooter?.message}
                    />
                  </Box>
                )}
              /> */}

              <Divider sx={{ borderColor: "#E3ECEF" }} />

              {/* Office Names Row */}
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Controller
                  name="officeNameOnPortal"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="Office Name shown on Portal" />
                      <CustomInput
                        placeholder="Enter Office Name shown on Portal"
                        name="officeNameOnPortal"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.officeNameOnPortal}
                        errorMessage={errors.officeNameOnPortal?.message}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="officeName"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="Office Name" />
                      <CustomInput
                        placeholder="Enter Office Name"
                        name="officeName"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.officeName}
                        errorMessage={errors.officeName?.message}
                      />
                    </Box>
                  )}
                />
              </Box>

              {/* Address Section */}
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Controller
                  name="addressLine1"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
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
                        // required
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="addressLine2"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
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
              </Box>

              {/* City, State, Zip Row */}
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
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
                        // required
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="physicalAddress.state_id"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
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
                          setValue("physicalAddress.state_id", selectedValue, {
                            shouldValidate: true,
                          });
                        }}
                        hasError={!!errors.physicalAddress?.state_id}
                        errorMessage={errors.physicalAddress?.state_id?.message}
                        maxHeightForOptionsList={250}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="zipCode"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
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
                        // required
                      />
                    </Box>
                  )}
                />
              </Box>

              {/* NPI, Taxonomy, State ID Row */}
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Controller
                  name="npiNumber"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="Group NPI Number" />
                      <CustomInput
                        placeholder="Enter NPI Number"
                        name="npiNumber"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.npiNumber}
                        errorMessage={errors.npiNumber?.message}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="taxonomyCode"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="Taxonomy Code" />
                      <CustomInput
                        placeholder="Enter Taxonomy Code"
                        name="taxonomyCode"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.taxonomyCode}
                        errorMessage={errors.taxonomyCode?.message}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="stateId"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="State ID" />
                      <CustomInput
                        placeholder="Enter State ID"
                        name="stateId"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.stateId}
                        errorMessage={errors.stateId?.message}
                      />
                    </Box>
                  )}
                />
              </Box>

              {/* Attending Doctor */}
              <Controller
                name="attendingDoctor"
                control={control}
                render={({ field }) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <CustomLabel label="Attending Doctor" />
                    <CustomAutoComplete
                      value={String(field.value)}
                      placeholder="Select"
                      options={[]}
                      onChange={(selectedValue) => {
                        setValue("attendingDoctor", selectedValue, {
                          shouldValidate: true,
                        });
                      }}
                      hasError={!!errors.attendingDoctor}
                      errorMessage={errors.attendingDoctor?.message}
                      maxHeightForOptionsList={250}
                    />
                  </Box>
                )}
              />

              <Divider sx={{ borderColor: "#E3ECEF" }} />

              {/* Call In Times */}
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Controller
                  name="callInStartTime"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="Call In Start Time" />
                      <CustomInput
                        placeholder="eg. 0100"
                        name="callInStartTime"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.callInStartTime}
                        errorMessage={errors.callInStartTime?.message}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="callInEndTime"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <CustomLabel label="Call In End Time" />
                      <CustomInput
                        placeholder="eg. 0100"
                        name="callInEndTime"
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!errors.callInEndTime}
                        errorMessage={errors.callInEndTime?.message}
                      />
                    </Box>
                  )}
                />
              </Box>

              {/* Note Section */}
              <Box
                sx={{
                  backgroundColor: "#FDF0E8",
                  borderRadius: "8px",
                  padding: "8px 12px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#2C2D2C",
                    fontFamily: "Helvetica Neue",
                  }}
                >
                  Note
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#2C2D2C",
                    fontFamily: "Helvetica Neue",
                    lineHeight: 1.6,
                  }}
                >
                  *If all Treatments are not provided at this office, then you
                  must go through each Treatment and set each office that
                  provides the treatment.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Fixed Footer with Buttons */}
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
          <CustomButton variant="secondary" size="md" onClick={onCancel}>
            Cancel
          </CustomButton>
          <CustomButton variant="primary" size="md" type="submit">
            Save
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewOfficeForm;
  