import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Link,
  Alert,
  Typography,
} from '@mui/material';
import {
  Mail as MailIcon,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import type { EmailPasswordCredentials } from '../types/auth.types';
import CustomInput from '../../../components/custom-input/custom-input';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomLabel from '../../../components/custom-label/custom-label';
import { CustomCheckbox } from '../../../components/custom-checkbox';

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .required('Please enter your email address')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'Password must be at least 8 characters long'),
  rememberMe: yup.boolean().default(false),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}


export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading, error, clearAuthError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setFormError(null);
      clearAuthError();

      const credentials: EmailPasswordCredentials = {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      };

      const result = await login(credentials);

      if (result.type.endsWith('/fulfilled')) {
        onSuccess?.();
      } else if (result.type.endsWith('/rejected')) {
        setFormError('Invalid email or password. Please try again.');
      }
    } catch (error: any) {
      setFormError(error.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked');
  };

  const displayError = formError || error;

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
      {displayError && (
        <Alert 
          severity="error" 
          role="alert"
          sx={{ mb: 2 }}
          onClose={() => {
            setFormError(null);
            clearAuthError();
          }}
        >
          {displayError}
        </Alert>
      )}

      {/* Email field */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <CustomLabel label="Email Address" isRequired />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              name="email"
              placeholder="Enter your email address"
              value={field.value}
              onChange={field.onChange}
              hasError={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              disableField={isLoading || isSubmitting}
              icon={<MailIcon />}
              isEmail
              required
            />
          )}
        />
      </Box>

      {/* Password field */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <CustomLabel label="Password" isRequired />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput
              name="password"
              placeholder="Enter your password"
              value={field.value}
              onChange={field.onChange}
              hasError={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              disableField={isLoading || isSubmitting}
              isPassword
              required
            />
          )}
        />
      </Box>

      {/* Remember me and Forgot password row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <CustomCheckbox
              checked={field.value}
              onChange={field.onChange}
              label="Remember Me"
              disabled={isLoading || isSubmitting}
              size="sm"
            />
          )}
        />

        <Link
          component="button"
          type="button"
          onClick={handleForgotPassword}
          disabled={isLoading || isSubmitting}
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.15,
            textDecoration: 'none',
            color: '#10B981',
            '&:hover': {
              textDecoration: 'underline',
              color: '#059669',
            },
            '&:disabled': {
              color: 'text.disabled',
              cursor: 'not-allowed',
            },
          }}
        >
          Forgot Password?
        </Link>
      </Box>

      {/* Submit button */}
      <CustomButton
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading || isSubmitting}
        loading={isLoading || isSubmitting}
      >
        {isLoading || isSubmitting ? 'Signing In...' : 'Sign In'}
      </CustomButton>
    </Box>
  );
};

export default LoginForm;
