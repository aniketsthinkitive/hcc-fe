import React, { useState } from 'react';
import { Box, Typography, Divider, Stack, Paper, Grid } from '@mui/material';
import { CustomCheckbox } from '../custom-checkbox';
import { CustomRadio } from '../custom-radio';

export const RadioCheckboxDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    // Checkbox states
    termsAccepted: false,
    newsletterSubscription: false,
    twoFactorAuth: true,
    marketingEmails: false,
    
    // Radio group states
    planType: 'standard',
    paymentMethod: 'credit-card',
    notificationFrequency: 'daily',
    theme: 'light',
  });

  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleRadioChange = (key: string) => (checked: boolean, value?: string) => {
    if (checked && value) {
      setFormData(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom>
        Custom Radio Buttons & Checkboxes
      </Typography>
      
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Human Care Center Design System Components
      </Typography>

      <Grid container spacing={4}>
        {/* Checkboxes Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h4" gutterBottom color="primary">
              Checkboxes
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Use checkboxes when users can select multiple options from a list.
            </Typography>

            <Stack spacing={3}>
              {/* Small Checkboxes */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Small Size (16px)
                </Typography>
                <Stack spacing={2}>
                  <CustomCheckbox
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange('termsAccepted')}
                    label="I agree to the Terms of Service"
                    supportingText="Please read our terms before continuing"
                  />
                  <CustomCheckbox
                    checked={formData.newsletterSubscription}
                    onChange={handleCheckboxChange('newsletterSubscription')}
                    label="Subscribe to newsletter"
                    supportingText="Get updates about new features and improvements"
                  />
                  <CustomCheckbox
                    checked={formData.twoFactorAuth}
                    onChange={handleCheckboxChange('twoFactorAuth')}
                    label="Enable two-factor authentication"
                    supportingText="Add an extra layer of security to your account"
                  />
                </Stack>
              </Box>

              {/* Medium Checkboxes */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Medium Size (20px)
                </Typography>
                <Stack spacing={2}>
                  <CustomCheckbox
                    size="md"
                    checked={formData.marketingEmails}
                    onChange={handleCheckboxChange('marketingEmails')}
                    label="Receive marketing emails"
                    supportingText="We'll send you updates about new features and promotions"
                  />
                  <CustomCheckbox
                    size="md"
                    checked={false}
                    indeterminate={true}
                    label="Some items selected"
                    supportingText="This checkbox is in an indeterminate state"
                  />
                  <CustomCheckbox
                    size="md"
                    checked={false}
                    disabled={true}
                    label="Disabled option"
                    supportingText="This option is currently unavailable"
                  />
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Radio Buttons Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h4" gutterBottom color="primary">
              Radio Buttons
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Use radio buttons when users can select only one option from a list.
            </Typography>

            <Stack spacing={3}>
              {/* Plan Selection */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Plan Selection
                </Typography>
                <Stack spacing={2}>
                  <CustomRadio
                    checked={formData.planType === 'basic'}
                    onChange={handleRadioChange('planType')}
                    value="basic"
                    label="Basic Plan"
                    supportingText="Perfect for individuals - $9/month"
                  />
                  <CustomRadio
                    checked={formData.planType === 'standard'}
                    onChange={handleRadioChange('planType')}
                    value="standard"
                    label="Standard Plan"
                    supportingText="Great for small teams - $29/month"
                  />
                  <CustomRadio
                    checked={formData.planType === 'premium'}
                    onChange={handleRadioChange('planType')}
                    value="premium"
                    label="Premium Plan"
                    supportingText="Best for large organizations - $99/month"
                  />
                </Stack>
              </Box>

              {/* Payment Method */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>
                <Stack spacing={2}>
                  <CustomRadio
                    size="md"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleRadioChange('paymentMethod')}
                    value="credit-card"
                    label="Credit Card"
                    supportingText="Visa, Mastercard, American Express"
                  />
                  <CustomRadio
                    size="md"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleRadioChange('paymentMethod')}
                    value="paypal"
                    label="PayPal"
                    supportingText="Pay securely with your PayPal account"
                  />
                  <CustomRadio
                    size="md"
                    checked={formData.paymentMethod === 'bank-transfer'}
                    onChange={handleRadioChange('paymentMethod')}
                    value="bank-transfer"
                    label="Bank Transfer"
                    supportingText="Direct transfer from your bank account"
                  />
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Form Example */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom color="primary">
              Complete Form Example
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Here's how these components work together in a real form.
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <Stack spacing={2}>
                  <CustomCheckbox
                    checked={formData.newsletterSubscription}
                    onChange={handleCheckboxChange('newsletterSubscription')}
                    label="Subscribe to newsletter"
                    supportingText="Get weekly updates about new features"
                  />
                  <CustomCheckbox
                    checked={formData.twoFactorAuth}
                    onChange={handleCheckboxChange('twoFactorAuth')}
                    label="Enable two-factor authentication"
                    supportingText="Add an extra layer of security"
                  />
                  <CustomCheckbox
                    checked={formData.marketingEmails}
                    onChange={handleCheckboxChange('marketingEmails')}
                    label="Receive marketing emails"
                    supportingText="Promotional offers and product updates"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Preferences
                </Typography>
                <Stack spacing={2}>
                  <CustomRadio
                    checked={formData.notificationFrequency === 'immediate'}
                    onChange={handleRadioChange('notificationFrequency')}
                    value="immediate"
                    label="Immediate notifications"
                    supportingText="Get notified as soon as something happens"
                  />
                  <CustomRadio
                    checked={formData.notificationFrequency === 'daily'}
                    onChange={handleRadioChange('notificationFrequency')}
                    value="daily"
                    label="Daily digest"
                    supportingText="Receive a summary once per day"
                  />
                  <CustomRadio
                    checked={formData.notificationFrequency === 'weekly'}
                    onChange={handleRadioChange('notificationFrequency')}
                    value="weekly"
                    label="Weekly summary"
                    supportingText="Get a weekly overview of activity"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* State Showcase */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom color="primary">
              All States Showcase
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Visual reference for all possible states of both components.
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Checkbox States
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <CustomCheckbox showText={false} />
                  <CustomCheckbox showText={false} checked />
                  <CustomCheckbox showText={false} indeterminate />
                  <CustomCheckbox showText={false} disabled />
                  <CustomCheckbox showText={false} checked disabled />
                  <CustomCheckbox showText={false} indeterminate disabled />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Radio Button States
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <CustomRadio showText={false} />
                  <CustomRadio showText={false} checked />
                  <CustomRadio showText={false} disabled />
                  <CustomRadio showText={false} checked disabled />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RadioCheckboxDemo;
