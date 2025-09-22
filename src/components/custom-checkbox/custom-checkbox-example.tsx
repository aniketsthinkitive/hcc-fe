import React, { useState } from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { CustomCheckbox } from './custom-checkbox';

export const CustomCheckboxExample: React.FC = () => {
  const [checkboxStates, setCheckboxStates] = useState({
    // Small checkboxes
    smDefault: false,
    smChecked: true,
    smIndeterminate: true,
    smDisabled: false,
    smDisabledChecked: true,
    smDisabledIndeterminate: true,
    
    // Medium checkboxes
    mdDefault: false,
    mdChecked: true,
    mdIndeterminate: true,
    mdDisabled: false,
    mdDisabledChecked: true,
    mdDisabledIndeterminate: true,
    
    // With text
    withText: false,
    withTextAndSupporting: false,
  });

  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    setCheckboxStates(prev => ({
      ...prev,
      [key]: checked,
    }));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Custom Checkbox Components
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
            <CustomCheckbox
              checked={checkboxStates.smDefault}
              onChange={handleCheckboxChange('smDefault')}
              showText={false}
              data-testid="sm-default"
            />
            <CustomCheckbox
              checked={checkboxStates.smChecked}
              onChange={handleCheckboxChange('smChecked')}
              showText={false}
              data-testid="sm-checked"
            />
            <CustomCheckbox
              checked={checkboxStates.smIndeterminate}
              indeterminate={true}
              onChange={handleCheckboxChange('smIndeterminate')}
              showText={false}
              data-testid="sm-indeterminate"
            />
            <CustomCheckbox
              checked={checkboxStates.smDisabled}
              disabled={true}
              onChange={handleCheckboxChange('smDisabled')}
              showText={false}
              data-testid="sm-disabled"
            />
            <CustomCheckbox
              checked={checkboxStates.smDisabledChecked}
              disabled={true}
              onChange={handleCheckboxChange('smDisabledChecked')}
              showText={false}
              data-testid="sm-disabled-checked"
            />
            <CustomCheckbox
              checked={checkboxStates.smDisabledIndeterminate}
              indeterminate={true}
              disabled={true}
              onChange={handleCheckboxChange('smDisabledIndeterminate')}
              showText={false}
              data-testid="sm-disabled-indeterminate"
            />
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            With Text
          </Typography>
          <Stack spacing={2}>
            <CustomCheckbox
              checked={checkboxStates.withText}
              onChange={handleCheckboxChange('withText')}
              label="Remember me"
              data-testid="sm-with-text"
            />
            <CustomCheckbox
              checked={checkboxStates.withTextAndSupporting}
              onChange={handleCheckboxChange('withTextAndSupporting')}
              label="Remember me"
              supportingText="Save my login details for next time."
              data-testid="sm-with-text-supporting"
            />
            <CustomCheckbox
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
            <CustomCheckbox
              size="md"
              checked={checkboxStates.mdDefault}
              onChange={handleCheckboxChange('mdDefault')}
              showText={false}
              data-testid="md-default"
            />
            <CustomCheckbox
              size="md"
              checked={checkboxStates.mdChecked}
              onChange={handleCheckboxChange('mdChecked')}
              showText={false}
              data-testid="md-checked"
            />
            <CustomCheckbox
              size="md"
              checked={checkboxStates.mdIndeterminate}
              indeterminate={true}
              onChange={handleCheckboxChange('mdIndeterminate')}
              showText={false}
              data-testid="md-indeterminate"
            />
            <CustomCheckbox
              size="md"
              checked={checkboxStates.mdDisabled}
              disabled={true}
              onChange={handleCheckboxChange('mdDisabled')}
              showText={false}
              data-testid="md-disabled"
            />
            <CustomCheckbox
              size="md"
              checked={checkboxStates.mdDisabledChecked}
              disabled={true}
              onChange={handleCheckboxChange('mdDisabledChecked')}
              showText={false}
              data-testid="md-disabled-checked"
            />
            <CustomCheckbox
              size="md"
              checked={checkboxStates.mdDisabledIndeterminate}
              indeterminate={true}
              disabled={true}
              onChange={handleCheckboxChange('mdDisabledIndeterminate')}
              showText={false}
              data-testid="md-disabled-indeterminate"
            />
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            With Text
          </Typography>
          <Stack spacing={2}>
            <CustomCheckbox
              size="md"
              checked={false}
              label="Accept terms and conditions"
              data-testid="md-with-text"
            />
            <CustomCheckbox
              size="md"
              checked={false}
              label="Subscribe to newsletter"
              supportingText="Get updates about new features and improvements"
              data-testid="md-with-text-supporting"
            />
            <CustomCheckbox
              size="md"
              checked={false}
              disabled={true}
              label="Premium feature"
              supportingText="This feature requires a premium subscription"
              data-testid="md-disabled-with-text"
            />
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Interactive Examples */}
      <Typography variant="h5" gutterBottom>
        Interactive Examples
      </Typography>
      
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Form Example
          </Typography>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <CustomCheckbox
              label="I agree to the Terms of Service"
              supportingText="Please read our terms before continuing"
            />
            <CustomCheckbox
              label="I want to receive marketing emails"
              supportingText="We'll send you updates about new features and promotions"
            />
            <CustomCheckbox
              label="Enable two-factor authentication"
              supportingText="Add an extra layer of security to your account"
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomCheckboxExample;
