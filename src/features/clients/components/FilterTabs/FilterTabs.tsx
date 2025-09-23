import React from 'react';
import { Box, IconButton, TextField, InputAdornment } from '@mui/material';
import CustomTabs from '../../../../components/custom-tabs/custom-tabs';
import { FilterAltOutlined, Search } from '@mui/icons-material';
import { FilterTabsStyles } from './FilterTabs.styles';
import type { ClientStatus } from '../StatusBadge/StatusBadge';

export interface FilterTab {
  id: string;
  label: string;
  status?: ClientStatus;
  count?: number;
  active?: boolean;
}

export interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) => {
  // Convert FilterTab to TabItem format for CustomTabs
  const customTabs = tabs.map(tab => ({
    id: tab.id,
    label: tab.label,
    disabled: false,
  }));

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Design placeholder - search functionality will be implemented later
    console.log('Search:', e.target.value);
  };



  return (
    <Box sx={FilterTabsStyles.container} className={className}>
      {/* Tabs Container with Figma styling */}
      <Box sx={FilterTabsStyles.tabsContainer}>
        <CustomTabs
          tabs={customTabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          type="button-white-border-figma"
          size="sm"
          fullWidth={false}
        />
      </Box>
      
      {/* Filter and Search Section - Filter first, then search */}
     
        <Box sx={FilterTabsStyles.searchContainer}>
          {/* Filter Button */}
          <IconButton
            sx={FilterTabsStyles.filterButton}
            aria-label="filter"
          >
            <FilterAltOutlined />
          </IconButton>
          
          {/* Search Input */}
          <TextField
            placeholder="Search"
            value=""
            onChange={handleSearchChange}
            sx={FilterTabsStyles.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#757775', fontSize: '16px' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
     
  );
};

export default FilterTabs;