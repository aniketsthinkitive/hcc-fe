import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../../../components/custom-input/custom-input';
import CustomAutoComplete from '../../../components/custom-auto-complete/custom-auto-complete';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomLabel from '../../../components/custom-label/custom-label';
import CommonSnackbar from '../../../components/common-snackbar/common-snackbar';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Form validation schema
const userFormSchema = yup.object({
  username: yup.string().required('Username is required'),
  namePrefix: yup.string(),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  title: yup.string(),
  userRole: yup.string().required('User Role is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  userOfficeAssociation: yup.string(),
  organizationalAssociation: yup.string().required('Organizational Association is required'),
  phoneNumbers: yup.array().of(
    yup.object({
      number: yup.string(),
      extension: yup.string(),
      use: yup.string(),
    })
  ),
});

export interface UserFormData {
  username: string;
  namePrefix?: string;
  firstName: string;
  lastName: string;
  title?: string;
  userRole: string;
  email: string;
  userOfficeAssociation?: string;
  organizationalAssociation: string;
  phoneNumbers: Array<{
    number?: string;
    extension?: string;
    use?: string;
  }>;
}

interface AddNewUserProps {
  /** Function to handle form submission - can be async for API calls */
  onSubmit: (data: UserFormData) => Promise<void> | void;
  /** Function to handle form cancellation */
  onCancel: () => void;
}

// Mock data for dropdowns
const userRoleOptions = [
  { key: 'admin', value: 'Admin' },
  { key: 'clinician', value: 'Clinician' },
  { key: 'receptionist', value: 'Receptionist' },
  { key: 'superuser', value: 'Super User' },
];

const phoneUseOptions = [
  { key: 'private', value: 'Private' },
  { key: 'fax', value: 'Fax' },
  { key: 'cell', value: 'Cell' },
  { key: 'work', value: 'Work' },
  { key: 'home', value: 'Home' },
  { key: 'main', value: 'Main' },
  { key: 'pager', value: 'Pager' },
];

const userOfficeAssociationOptions = [
  { key: 'main', value: 'Main' },
  { key: 'branch-a', value: 'Branch A' },
  { key: 'branch-b', value: 'Branch B' },
  { key: 'branch-c', value: 'Branch C' },
];

const organizationalAssociationOptions = [
  { key: 'all', value: 'All' },
  { key: 'healthcare-corp', value: 'Healthcare Corp' },
  { key: 'medical-group', value: 'Medical Group' },
  { key: 'clinic-network', value: 'Clinic Network' },
];


const AddNewUser: React.FC<AddNewUserProps> = ({
  onSubmit,
  onCancel,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [phoneNumbers, setPhoneNumbers] = useState([
    { number: '', extension: '', use: '' }
  ]);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
    status: 'success' as 'success' | 'error'
  });
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    username: '',
    namePrefix: '',
    firstName: '',
    lastName: '',
    title: '',
    userRole: '',
    email: '',
    userOfficeAssociation: '',
    organizationalAssociation: '',
    phoneNumbers: [{ number: '', extension: '', use: '' }],
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(userFormSchema) as any,
    defaultValues: initialValues,
    mode: 'onChange', // This will trigger validation on change and blur
  });

  const handleFormSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    
    try {
      // Call the parent onSubmit function (can be async)
      await onSubmit({ ...data, phoneNumbers });
      
      // Show success message
      setSnackbar({
        isOpen: true,
        message: 'User added successfully!',
        status: 'success'
      });
    } catch (error) {
      // Show error message
      setSnackbar({
        isOpen: true,
        message: 'Failed to add user. Please try again.',
        status: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, isOpen: false }));
  };

  const handleAddPhoneNumber = () => {
    const newPhoneNumbers = [...phoneNumbers, { number: '', extension: '', use: '' }];
    setPhoneNumbers(newPhoneNumbers);
    setValue('phoneNumbers', newPhoneNumbers);
  };

  const handlePhoneNumberChange = (index: number, field: string, value: string) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = { ...newPhoneNumbers[index], [field]: value };
    setPhoneNumbers(newPhoneNumbers);
    setValue('phoneNumbers', newPhoneNumbers);
  };

  const handleDeletePhoneNumber = (index: number) => {
    if (phoneNumbers.length > 1) {
      const newPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
      setPhoneNumbers(newPhoneNumbers);
      setValue('phoneNumbers', newPhoneNumbers);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        width: "100%",
        maxWidth: isMobile ? "100vw" : "925px",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "8px 12px" : "12px 16px",
          borderBottom: "1px solid #E3ECEF",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: isMobile ? "16px" : "18px",
            fontWeight: 600,
            color: "#424342",
            fontFamily: "Geist",
          }}
        >
          Add New User
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
        sx={{
          flex: 1,
          overflow: "auto",
          padding: isMobile ? "8px" : isTablet ? "12px" : "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: isMobile ? "16px" : isTablet ? "20px" : "24px" 
        }}>
          {/* First Row - Username, Name Prefix, First Name */}
          <Box sx={{ 
            display: "flex", 
            gap: isMobile ? "12px" : "16px",
            flexDirection: isMobile ? "column" : "row"
          }}>
            <Controller
              name="username"
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
                  <CustomLabel label="Username" isRequired />
                  <CustomInput
                    placeholder="Enter Username"
                    name="username"
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!errors.username}
                    errorMessage={errors.username?.message}
                  />
                </Box>
              )}
            />

            <Controller
              name="namePrefix"
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
                  <CustomLabel label="User's Name Prefix" />
                  <CustomInput
                    placeholder="Enter User's Name Prefix"
                    name="namePrefix"
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!errors.namePrefix}
                    errorMessage={errors.namePrefix?.message}
                  />
                </Box>
              )}
            />

            <Controller
              name="firstName"
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
                  <CustomLabel label="User's First Name" isRequired />
                  <CustomInput
                    placeholder="Enter User's First Name"
                    name="firstName"
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!errors.firstName}
                    errorMessage={errors.firstName?.message}
                  />
                </Box>
              )}
            />
          </Box>

          {/* Second Row - Last Name, Title, User Role */}
          <Box sx={{ 
            display: "flex", 
            gap: isMobile ? "12px" : "16px",
            flexDirection: isMobile ? "column" : "row"
          }}>
            <Controller
              name="lastName"
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
                  <CustomLabel label="User's Last Name" isRequired />
                  <CustomInput
                    placeholder="Enter User's Last Name"
                    name="lastName"
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                  />
                </Box>
              )}
            />

            <Controller
              name="title"
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
                  <CustomLabel label="User's Title" />
                  <CustomInput
                    placeholder="eg. Lord, Sir, President"
                    name="title"
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!errors.title}
                    errorMessage={errors.title?.message}
                  />
                </Box>
              )}
            />

            <Controller
              name="userRole"
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
                  <CustomLabel label="User's Role" isRequired />
                  <CustomAutoComplete
                    value={String(field.value)}
                    placeholder="Select User's Role"
                    options={userRoleOptions}
                    onChange={(selectedValue) => {
                      setValue("userRole", selectedValue, {
                        shouldValidate: true,
                      });
                    }}
                    hasError={!!errors.userRole}
                    errorMessage={errors.userRole?.message}
                    maxHeightForOptionsList={250}
                  />
                </Box>
              )}
            />
          </Box>

          {/* Phone Number Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "8px" : "12px",
              padding: isMobile ? "8px" : isTablet ? "12px" : "12px 16px 16px",
              border: "1px solid #DDE0DD",
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#2C2D2C",
                fontFamily: "Helvetica Neue",
              }}
            >
              Phone Number
            </Typography>

            {phoneNumbers.map((phone, index) => (
              <Box key={index} sx={{ 
                display: "flex", 
                gap: isMobile ? "8px" : "16px",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "flex-end"
              }}>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <CustomLabel label="Number" />
                  <CustomInput
                    placeholder="eg. (684) 555-0102"
                    name={`phoneNumbers.${index}.number`}
                    value={phone.number}
                    onChange={(e) => handlePhoneNumberChange(index, 'number', e.target.value)}
                    format="phone"
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <CustomLabel label="Extension" />
                  <CustomInput
                    placeholder="Enter Extension"
                    name={`phoneNumbers.${index}.extension`}
                    value={phone.extension}
                    onChange={(e) => handlePhoneNumberChange(index, 'extension', e.target.value)}
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <CustomLabel label="Use" />
                  <CustomAutoComplete
                    value={String(phone.use)}
                    placeholder="Select"
                    options={phoneUseOptions}
                    onChange={(selectedValue) => {
                      handlePhoneNumberChange(index, 'use', selectedValue);
                    }}
                    maxHeightForOptionsList={200}
                  />
                </Box>

                {phoneNumbers.length > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "#F6F6F6",
                      },
                    }}
                    onClick={() => handleDeletePhoneNumber(index)}
                  >
                    <DeleteIcon sx={{ fontSize: "20px", color: "#757775" }} />
                  </Box>
                )}
              </Box>
            ))}

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <CustomButton
                variant="tertiary"
                size="md"
                icon={<AddIcon />}
                iconPosition="left"
                onClick={handleAddPhoneNumber}
                sx={{
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                Add More
              </CustomButton>
            </Box>
          </Box>

          {/* Email */}
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
                <CustomLabel label="Email" isRequired />
                <CustomInput
                  placeholder="eg. johndoe@example.com"
                  name="email"
                  value={field.value}
                  onChange={field.onChange}
                  hasError={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              </Box>
            )}
          />

          {/* User Office Association and Organizational Association */}
          <Box sx={{ 
            display: "flex", 
            gap: isMobile ? "12px" : "16px",
            flexDirection: isMobile ? "column" : "row"
          }}>
            <Controller
              name="userOfficeAssociation"
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
                  <CustomLabel label="User Office Association(s)" />
                  <CustomAutoComplete
                    value={String(field.value)}
                    placeholder="Select"
                    options={userOfficeAssociationOptions}
                    onChange={(selectedValue) => {
                      setValue("userOfficeAssociation", selectedValue, {
                        shouldValidate: true,
                      });
                    }}
                    hasError={!!errors.userOfficeAssociation}
                    errorMessage={errors.userOfficeAssociation?.message}
                    maxHeightForOptionsList={200}
                  />
                </Box>
              )}
            />

            <Controller
              name="organizationalAssociation"
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
                  <CustomLabel label="Organizational Association(s)" isRequired />
                  <CustomAutoComplete
                    value={String(field.value)}
                    placeholder="Select"
                    options={organizationalAssociationOptions}
                    onChange={(selectedValue) => {
                      setValue("organizationalAssociation", selectedValue, {
                        shouldValidate: true,
                      });
                    }}
                    hasError={!!errors.organizationalAssociation}
                    errorMessage={errors.organizationalAssociation?.message}
                    maxHeightForOptionsList={200}
                  />
                </Box>
              )}
            />
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
            marginTop: "auto",
          }}
        >
          <CustomButton variant="secondary" size="md" onClick={onCancel}>
            Cancel
          </CustomButton>
          <CustomButton 
            variant="primary" 
            size="md" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </CustomButton>
        </Box>
      </Box>

      {/* Common Snackbar */}
      <CommonSnackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        status={snackbar.status}
        onClose={handleSnackbarClose}
        position="bottom-right"
        autoClose={true}
        autoCloseDelay={5000}
      />
    </Box>
  );
};

export default AddNewUser;