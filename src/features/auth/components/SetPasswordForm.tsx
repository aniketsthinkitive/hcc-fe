import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Alert,
  Typography,
} from '@mui/material';
import {
  Lock as LockIcon,
} from '@mui/icons-material';
import CustomInput from '../../../components/custom-input/custom-input';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomLabel from '../../../components/custom-label/custom-label';
import type { SetPasswordCredentials } from '../types/auth.types';

// Password validation schema according to user story requirements
const setPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/, 'Password must contain at least one number, symbol, or whitespace'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

type SetPasswordFormData = yup.InferType<typeof setPasswordSchema>;

interface SetPasswordFormProps {
  onSuccess?: () => void;
}

interface PasswordRequirement {
  id: string;
  text: string;
  isValid: boolean;
}

export const SetPasswordForm: React.FC<SetPasswordFormProps> = ({ onSuccess }) => {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<SetPasswordFormData>({
    resolver: yupResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Watch password field for real-time validation
  const watchedPassword = watch('password');

  // Password requirements validation - matching exact Figma text
  const getPasswordRequirements = (password: string): PasswordRequirement[] => [
    {
      id: 'length',
      text: 'Must be at least 8 characters long (longer is better)',
      isValid: password.length >= 8,
    },
    {
      id: 'lowercase',
      text: 'Requires at least one lowercase letter',
      isValid: /[a-z]/.test(password),
    },
    {
      id: 'uppercase',
      text: 'Requires at least one uppercase letter',
      isValid: /[A-Z]/.test(password),
    },
    {
      id: 'number-symbol',
      text: 'Requires at least one number, symbol, or whitespace',
      isValid: /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/.test(password),
    },
  ];

  const passwordRequirements = getPasswordRequirements(watchedPassword || '');

  const onSubmit = async (data: SetPasswordFormData) => {
    try {
      setFormError(null);

      const credentials: SetPasswordCredentials = {
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      // TODO: Implement API call to set password
      console.log('Setting password:', credentials);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      onSuccess?.();
    } catch (error: any) {
      setFormError(error.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit as any)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
      }}
      noValidate
    >
      {/* Form-level error alert */}
      {formError && (
        <Alert 
          severity="error" 
          role="alert"
          sx={{ mb: 2 }}
          onClose={() => setFormError(null)}
        >
          {formError}
        </Alert>
      )}

      {/* Password field */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <CustomLabel label="Password" isRequired />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              name="password"
              placeholder="Enter Your Password"
              value={field.value}
              onChange={field.onChange}
              hasError={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              disableField={isSubmitting}
              icon={<LockIcon />}
              isPassword
              required
            />
          )}
        />
      </Box>

      {/* Confirm Password field */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <CustomLabel label="Confirm Password" isRequired />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              name="confirmPassword"
              placeholder="Re-enter Your Password"
              value={field.value}
              onChange={field.onChange}
              hasError={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              disableField={isSubmitting}
              icon={<LockIcon />}
              isPassword
              required
            />
          )}
        />
      </Box>

      {/* Submit button */}
      <CustomButton
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Creating Password...' : 'Create Password'}
      </CustomButton>

      {/* Password Requirements - Matching Figma Design */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '12px',
          backgroundColor: '#F6F6F6',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        {passwordRequirements.map((requirement) => (
          <Box
            key={requirement.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Box
              sx={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#757775',
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Helvetica Neue',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: 1.2,
                letterSpacing: '1.2%',
                color: '#2C2D2C',
                flex: 1,
              }}
            >
              {requirement.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SetPasswordForm;
