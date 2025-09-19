import React, { useState } from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { CustomRadio } from './custom-radio';

export const CustomRadioExample: React.FC = () => {
  const [radioStates, setRadioStates] = useState({
    // Small radios
    smDefault: false,
    smChecked: true,
    smDisabled: false,
    smDisabledChecked: true,
    
    // Medium radios
    mdDefault: false,
    mdChecked: true,
    mdDisabled: false,
    mdDisabledChecked: true,
    
    // With text
    withText: false,
    withTextAndSupporting: false,
    
    // Radio groups
    paymentMethod: 'credit-card',
    notificationPreference: 'email',
  });

  const handleRadioChange = (key: string) => (checked: boolean, value?: string) => {
    setRadioStates(prev => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleRadioGroupChange = (groupKey: string) => (checked: boolean, value?: string) => {
    if (checked && value) {
      setRadioStates(prev => ({
        ...prev,
        [groupKey]: value,
      }));
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Custom Radio Button Components
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Based on the Human Care Center Figma design system
      </Typography>

      {/* Small Size Variants */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Small Size (16px)
      </Typography>
      
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Without Text
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <CustomRadio
              checked={radioStates.smDefault}
              onChange={handleRadioChange('smDefault')}
              showText={false}
              data-testid="sm-default"
            />
            <CustomRadio
              checked={radioStates.smChecked}
              onChange={handleRadioChange('smChecked')}
              showText={false}
              data-testid="sm-checked"
            />
            <CustomRadio
              checked={radioStates.smDisabled}
              disabled={true}
              onChange={handleRadioChange('smDisabled')}
              showText={false}
              data-testid="sm-disabled"
            />
            <CustomRadio
              checked={radioStates.smDisabledChecked}
              disabled={true}
              onChange={handleRadioChange('smDisabledChecked')}
              showText={false}
              data-testid="sm-disabled-checked"
            />
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            With Text
          </Typography>
          <Stack spacing={2}>
            <CustomRadio
              checked={radioStates.withText}
              onChange={handleRadioChange('withText')}
              label="Option 1"
              data-testid="sm-with-text"
            />
            <CustomRadio
              checked={radioStates.withTextAndSupporting}
              onChange={handleRadioChange('withTextAndSupporting')}
              label="Option 2"
              supportingText="This is a more detailed description of the option"
              data-testid="sm-with-text-supporting"
            />
            <CustomRadio
              checked={false}
              disabled={true}
              label="Disabled option"
              supportingText="This option is currently disabled"
              data-testid="sm-disabled-with-text"
            />
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Medium Size Variants */}
      <Typography variant="h5" gutterBottom>
        Medium Size (20px)
      </Typography>
      
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Without Text
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <CustomRadio
              size="md"
              checked={radioStates.mdDefault}
              onChange={handleRadioChange('mdDefault')}
              showText={false}
              data-testid="md-default"
            />
            <CustomRadio
              size="md"
              checked={radioStates.mdChecked}
              onChange={handleRadioChange('mdChecked')}
              showText={false}
              data-testid="md-checked"
            />
            <CustomRadio
              size="md"
              checked={radioStates.mdDisabled}
              disabled={true}
              onChange={handleRadioChange('mdDisabled')}
              showText={false}
              data-testid="md-disabled"
            />
            <CustomRadio
              size="md"
              checked={radioStates.mdDisabledChecked}
              disabled={true}
              onChange={handleRadioChange('mdDisabledChecked')}
              showText={false}
              data-testid="md-disabled-checked"
            />
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            With Text
          </Typography>
          <Stack spacing={2}>
            <CustomRadio
              size="md"
              checked={false}
              label="Standard plan"
              data-testid="md-with-text"
            />
            <CustomRadio
              size="md"
              checked={false}
              label="Premium plan"
              supportingText="Includes advanced features and priority support"
              data-testid="md-with-text-supporting"
            />
            <CustomRadio
              size="md"
              checked={false}
              disabled={true}
              label="Enterprise plan"
              supportingText="Contact sales for pricing and availability"
              data-testid="md-disabled-with-text"
            />
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Radio Group Examples */}
      <Typography variant="h5" gutterBottom>
        Radio Group Examples
      </Typography>
      
      <Stack spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Payment Method Selection
          </Typography>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <CustomRadio
              checked={radioStates.paymentMethod === 'credit-card'}
              onChange={handleRadioGroupChange('paymentMethod')}
              value="credit-card"
              label="Credit Card"
              supportingText="Visa, Mastercard, American Express"
            />
            <CustomRadio
              checked={radioStates.paymentMethod === 'paypal'}
              onChange={handleRadioGroupChange('paymentMethod')}
              value="paypal"
              label="PayPal"
              supportingText="Pay securely with your PayPal account"
            />
            <CustomRadio
              checked={radioStates.paymentMethod === 'bank-transfer'}
              onChange={handleRadioGroupChange('paymentMethod')}
              value="bank-transfer"
              label="Bank Transfer"
              supportingText="Direct transfer from your bank account"
            />
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <CustomRadio
              checked={radioStates.notificationPreference === 'email'}
              onChange={handleRadioGroupChange('notificationPreference')}
              value="email"
              label="Email notifications"
              supportingText="Receive updates via email"
            />
            <CustomRadio
              checked={radioStates.notificationPreference === 'sms'}
              onChange={handleRadioGroupChange('notificationPreference')}
              value="sms"
              label="SMS notifications"
              supportingText="Receive updates via text message"
            />
            <CustomRadio
              checked={radioStates.notificationPreference === 'none'}
              onChange={handleRadioGroupChange('notificationPreference')}
              value="none"
              label="No notifications"
              supportingText="Opt out of all notifications"
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomRadioExample;
