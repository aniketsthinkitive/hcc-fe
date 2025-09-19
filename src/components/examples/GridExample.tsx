import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { GridContainer, GridRow, GridColumn } from '../grid';

const GridExample: React.FC = () => {
  return (
    <GridContainer>
      {/* Header Section */}
      <GridRow>
        <GridColumn mobile={4} tablet={8} desktop={12}>
          <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
              Grid System Example
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This demonstrates the responsive grid system based on Figma design
            </Typography>
          </Paper>
        </GridColumn>
      </GridRow>

      {/* Stats Cards Row */}
      <GridRow>
        <GridColumn mobile={4} tablet={4} desktop={3}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" color="primary">
              150
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Patients
            </Typography>
          </Paper>
        </GridColumn>
        
        <GridColumn mobile={4} tablet={4} desktop={3}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" color="secondary">
              45
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Sessions
            </Typography>
          </Paper>
        </GridColumn>
        
        <GridColumn mobile={4} tablet={4} desktop={3}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" color="success.main">
              98%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Success Rate
            </Typography>
          </Paper>
        </GridColumn>
        
        <GridColumn mobile={4} tablet={4} desktop={3}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" color="info.main">
              12
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New This Week
            </Typography>
          </Paper>
        </GridColumn>
      </GridRow>

      {/* Two Column Layout */}
      <GridRow sx={{ mt: 3 }}>
        <GridColumn mobile={4} tablet={8} desktop={8}>
          <Paper sx={{ p: 3, height: '300px' }}>
            <Typography variant="h5" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This column takes 8/12 on desktop, full width on tablet, and full width on mobile.
              The grid system automatically adjusts based on the breakpoints defined in the Figma design.
            </Typography>
          </Paper>
        </GridColumn>
        
        <GridColumn mobile={4} tablet={8} desktop={4}>
          <Paper sx={{ p: 3, height: '300px' }}>
            <Typography variant="h5" gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This column takes 4/12 on desktop, full width on tablet, and full width on mobile.
            </Typography>
          </Paper>
        </GridColumn>
      </GridRow>

      {/* Offset Example */}
      <GridRow sx={{ mt: 3 }}>
        <GridColumn mobile={4} tablet={4} desktop={6} desktopOffset={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Centered Content
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This content is centered using desktop offset (3 columns on each side).
              On mobile and tablet, it takes full width.
            </Typography>
          </Paper>
        </GridColumn>
      </GridRow>

      {/* Auto Width Example */}
      <GridRow sx={{ mt: 3 }} alignItems="center" justifyContent="space-between">
        <GridColumn auto>
          <Typography variant="h6">Logo</Typography>
        </GridColumn>
        <GridColumn auto>
          <Typography variant="body2" color="text.secondary">
            Navigation Item 1
          </Typography>
        </GridColumn>
        <GridColumn auto>
          <Typography variant="body2" color="text.secondary">
            Navigation Item 2
          </Typography>
        </GridColumn>
        <GridColumn auto>
          <Typography variant="body2" color="text.secondary">
            User Menu
          </Typography>
        </GridColumn>
      </GridRow>

      {/* Responsive Text Example */}
      <GridRow sx={{ mt: 3 }}>
        <GridColumn mobile={4} tablet={8} desktop={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Responsive Typography
            </Typography>
            <Typography variant="body1" gutterBottom>
              This text uses the typography system from the theme, which includes:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body2" component="span">
                  <strong>Inter font family</strong> as the primary font
                </Typography>
              </li>
              <li>
                <Typography variant="body2" component="span">
                  <strong>Responsive font sizes</strong> that scale appropriately
                </Typography>
              </li>
              <li>
                <Typography variant="body2" component="span">
                  <strong>Proper line heights</strong> for optimal readability
                </Typography>
              </li>
              <li>
                <Typography variant="body2" component="span">
                  <strong>Color integration</strong> with the design system
                </Typography>
              </li>
            </Box>
          </Paper>
        </GridColumn>
      </GridRow>
    </GridContainer>
  );
};

export default GridExample;
