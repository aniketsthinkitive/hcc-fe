import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Settings, Home, Person, Notifications } from '@mui/icons-material';
import CustomTabs, { type TabItem } from './custom-tabs';

const exampleTabs: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home />,
    content: <Typography>Home content goes here</Typography>
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <Person />,
    badge: '3',
    content: <Typography>Profile content goes here</Typography>
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    content: <Typography>Settings content goes here</Typography>
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Notifications />,
    badge: '12',
    content: <Typography>Notifications content goes here</Typography>
  }
];

const iconOnlyTabs: TabItem[] = [
  {
    id: 'home-icon',
    icon: <Home />,
    content: <Typography>Home content</Typography>
  },
  {
    id: 'profile-icon',
    icon: <Person />,
    content: <Typography>Profile content</Typography>
  },
  {
    id: 'settings-icon',
    icon: <Settings />,
    content: <Typography>Settings content</Typography>
  }
];

export default function CustomTabsExample() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Box sx={{ padding: '24px', gap: '32px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ marginBottom: '16px' }}>
        Custom Tabs Examples
      </Typography>

      {/* Button Primary Tabs */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Button Primary (Medium)
        </Typography>
        <CustomTabs
          tabs={exampleTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          type="button-primary"
          size="md"
          showContent={true}
        />
      </Paper>

      {/* Button Primary Small */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Button Primary (Small)
        </Typography>
        <CustomTabs
          tabs={exampleTabs}
          type="button-primary"
          size="sm"
        />
      </Paper>

      {/* Button Gray */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Button Gray
        </Typography>
        <CustomTabs
          tabs={exampleTabs}
          type="button-gray"
          size="md"
        />
      </Paper>

      {/* Button White Border */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Button White Border
        </Typography>
        <CustomTabs
          tabs={exampleTabs}
          type="button-white-border"
          size="md"
        />
      </Paper>

      {/* Button White Border Icon Only */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Button White Border (Icon Only)
        </Typography>
        <CustomTabs
          tabs={iconOnlyTabs}
          type="button-white-border-icon-only"
          size="md"
        />
      </Paper>

      {/* Underline */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Underline
        </Typography>
        <CustomTabs
          tabs={exampleTabs}
          type="underline"
          size="md"
        />
      </Paper>

      {/* Underline Filled */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Underline Filled
        </Typography>
        <CustomTabs
          tabs={exampleTabs}
          type="underline-filled"
          size="md"
        />
      </Paper>

      {/* Full Width */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Full Width Tabs
        </Typography>
        <CustomTabs
          tabs={exampleTabs}
          type="button-primary"
          size="md"
          fullWidth={true}
        />
      </Paper>

      {/* Disabled State */}
      <Paper sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          Disabled Tabs
        </Typography>
        <CustomTabs
          tabs={[
            ...exampleTabs,
            {
              id: 'disabled',
              label: 'Disabled',
              icon: <Settings />,
              disabled: true,
              content: <Typography>This tab is disabled</Typography>
            }
          ]}
          type="button-primary"
          size="md"
        />
      </Paper>
    </Box>
  );
}
