import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Stack } from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  Save, 
  Cancel, 
  Download, 
  Upload, 
  Search,
  Settings,
  Home,
  Person,
  Notifications
} from '@mui/icons-material';
import CustomButton from './custom-buttons';

const CustomButtonExample: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: 'center', color: '#439322' }}>
        🎯 Custom Buttons Examples
      </Typography>

      <Stack spacing={4}>
        {/* Primary Buttons */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Primary Buttons
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="primary" size="sm">
                Small Primary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="primary" size="md">
                Medium Primary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="primary" size="lg">
                Large Primary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="primary" fullWidth>
                Full Width Primary
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>

        {/* Secondary Buttons */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Secondary Buttons
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="secondary" size="sm">
                Small Secondary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="secondary" size="md">
                Medium Secondary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="secondary" size="lg">
                Large Secondary
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>

        {/* Tertiary Buttons */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Tertiary Buttons
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="tertiary" size="sm">
                Small Tertiary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="tertiary" size="md">
                Medium Tertiary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="tertiary" size="lg">
                Large Tertiary
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>

        {/* Outline Buttons */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Outline Buttons
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="outline" size="sm">
                Small Outline
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="outline" size="md">
                Medium Outline
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="outline" size="lg">
                Large Outline
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>

        {/* Text Buttons */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Text Buttons
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="text" size="sm">
                Small Text
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="text" size="md">
                Medium Text
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="text" size="lg">
                Large Text
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>

        {/* Icon Buttons */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Icon Buttons
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="icon" size="sm" icon={<Edit />} aria-label="Edit" />
            </Grid>
            <Grid item>
              <CustomButton variant="icon" size="md" icon={<Delete />} aria-label="Delete" />
            </Grid>
            <Grid item>
              <CustomButton variant="icon" size="lg" icon={<Settings />} aria-label="Settings" />
            </Grid>
          </Grid>
        </Paper>

        {/* Floating Action Buttons */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Floating Action Buttons
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="floating" icon={<Add />} aria-label="Add" />
            </Grid>
            <Grid item>
              <CustomButton variant="floating" icon={<Edit />} aria-label="Edit" />
            </Grid>
            <Grid item>
              <CustomButton variant="floating" icon={<Save />} aria-label="Save" />
            </Grid>
          </Grid>
        </Paper>

        {/* Buttons with Icons */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Buttons with Icons
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="primary" icon={<Save />} iconPosition="left">
                Save
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="secondary" icon={<Download />} iconPosition="right">
                Download
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="tertiary" icon={<Upload />} iconPosition="left">
                Upload
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="outline" icon={<Search />} iconPosition="right">
                Search
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>

        {/* Loading States */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Loading States
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="primary" loading>
                Loading...
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="secondary" loading>
                Processing
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="tertiary" loading>
                Saving
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="primary" onClick={handleLoadingDemo}>
                Click to Load
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>

        {/* Disabled States */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Disabled States
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton variant="primary" disabled>
                Disabled Primary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="secondary" disabled>
                Disabled Secondary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="tertiary" disabled>
                Disabled Tertiary
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="outline" disabled>
                Disabled Outline
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="text" disabled>
                Disabled Text
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton variant="icon" disabled icon={<Edit />} aria-label="Edit" />
            </Grid>
          </Grid>
        </Paper>

        {/* Interactive Examples */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Interactive Examples
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CustomButton 
                variant="primary" 
                onClick={() => alert('Primary button clicked!')}
              >
                Click Me
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton 
                variant="secondary" 
                onClick={() => alert('Secondary button clicked!')}
              >
                Click Me Too
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton 
                variant="tertiary" 
                onClick={() => alert('Tertiary button clicked!')}
              >
                And Me
              </CustomButton>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CustomButtonExample;
