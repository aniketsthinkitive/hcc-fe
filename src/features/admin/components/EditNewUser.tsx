import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../../../components/custom-input/custom-input';
import CustomAutoComplete from '../../../components/custom-auto-complete/custom-auto-complete';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomLabel from '../../../components/custom-label/custom-label';
import CommonSnackbar from '../../../components/common-snackbar/common-snackbar';
import { Add as AddIcon } from '@mui/icons-material';

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

export interface UserData {
  id: number;
  name: string;
  username: string;
  role: string;
  userEmail: string;
  alertEmail: string;
  phoneNumber: string;
  office: string;
  status: boolean;
  organization: string;
  namePrefix?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  phoneNumbers?: Array<{
    number?: string;
    extension?: string;
    use?: string;
  }>;
  lastLoginAttempt?: string;
  passwordDaysLeft?: number;
  isArchived?: boolean;
}

interface EditNewUserProps {
  /** User data to populate the form */
  userData: UserData;
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
  { key: 'office', value: 'Office' },
];

const officeAssociationOptions = [
  { key: 'main', value: 'Main' },
  { key: 'branch-a', value: 'Branch A' },
  { key: 'branch-b', value: 'Branch B' },
];

const organizationalAssociationOptions = [
  { key: 'healthcare-corp', value: 'Healthcare Corp' },
  { key: 'medical-group', value: 'Medical Group' },
];


const EditNewUser: React.FC<EditNewUserProps> = ({
  userData,
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

  // Parse user data to extract first and last name
  const parseUserName = (fullName: string) => {
    const nameParts = fullName.split(' ');
    return {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
    };
  };

  // Parse phone number to extract number and extension
  const parsePhoneNumber = (phoneStr: string) => {
    if (!phoneStr) return { number: '', extension: '' };
    
    // Simple parsing - you might want to enhance this based on your phone format
    const match = phoneStr.match(/^\((\d{3})\)\s(\d{3})-(\d{4})(?:\sx(\d+))?$/);
    if (match) {
      return {
        number: phoneStr,
        extension: match[4] || '',
      };
    }
    return { number: phoneStr, extension: '' };
  };

  const { firstName, lastName } = parseUserName(userData.name);
  const { number, extension } = parsePhoneNumber(userData.phoneNumber);

  const initialValues = {
    username: userData.username || '',
    namePrefix: userData.namePrefix || '',
    firstName: userData.firstName || firstName,
    lastName: userData.lastName || lastName,
    title: userData.title || '',
    userRole: userData.role || '',
    email: userData.userEmail || '',
    userOfficeAssociation: userData.office || '',
    organizationalAssociation: userData.organization || '',
    phoneNumbers: userData.phoneNumbers || [{ number, extension, use: 'office' }],
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(userFormSchema) as any,
    defaultValues: initialValues,
    mode: 'onChange',
  });

  // Watch for changes to detect modifications
  const watchedValues = watch();

  useEffect(() => {
    const phoneNumbersWithDefaults = initialValues.phoneNumbers.map(phone => ({
      number: phone.number || '',
      extension: phone.extension || '',
      use: phone.use || '',
    }));
    setPhoneNumbers(phoneNumbersWithDefaults);
  }, [userData]);


  const handleFormSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    
    try {
      // Call the parent onSubmit function (can be async)
      await onSubmit({ ...data, phoneNumbers });
      
      // Show success message
      setSnackbar({
        isOpen: true,
        message: 'User updated successfully!',
        status: 'success'
      });
    } catch (error) {
      // Show error message
      setSnackbar({
        isOpen: true,
        message: 'Failed to update user. Please try again.',
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
          Edit User
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
                flexDirection: isMobile ? "column" : "row"
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
                    width: isMobile ? "100%" : isTablet ? "100%" : "287px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <CustomLabel label="User Office Association(s)" />
                  <CustomAutoComplete
                    value={String(field.value)}
                    placeholder="Select"
                    options={officeAssociationOptions}
                    onChange={(selectedValue) => {
                      setValue("userOfficeAssociation", selectedValue, {
                        shouldValidate: true,
                      });
                    }}
                    hasError={!!errors.userOfficeAssociation}
                    errorMessage={errors.userOfficeAssociation?.message}
                    maxHeightForOptionsList={250}
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
                    width: isMobile ? "100%" : isTablet ? "100%" : "287px",
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
                    maxHeightForOptionsList={250}
                  />
                </Box>
              )}
            />
          </Box>

          {/* Last Login Info */}
          <Box sx={{ 
            display: "flex", 
            gap: isMobile ? "12px" : isTablet ? "24px" : "40px", 
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row"
          }}>
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Typography sx={{ fontSize: "14px", color: "#757775", fontFamily: "Helvetica Neue" }}>
                Last Login Attempt
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#757775", fontFamily: "Helvetica Neue" }}>
                :
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#424342", fontFamily: "Helvetica Neue" }}>
                {userData.lastLoginAttempt || "03/21/2025 11:00 AM"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Typography sx={{ fontSize: "14px", color: "#757775", fontFamily: "Helvetica Neue" }}>
                Password Days Left
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#757775", fontFamily: "Helvetica Neue" }}>
                :
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#424342", fontFamily: "Helvetica Neue" }}>
                {userData.passwordDaysLeft || 12}
              </Typography>
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

export default EditNewUser;
