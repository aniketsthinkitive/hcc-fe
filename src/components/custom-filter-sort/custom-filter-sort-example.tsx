import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Stack } from '@mui/material';
import CustomFilterSort, { type FilterField, type SortGroup } from './custom-filter-sort';

const CustomFilterSortExample: React.FC = () => {
  const [activeFilterField, setActiveFilterField] = useState('patientName');
  const [activeSortGroup, setActiveSortGroup] = useState('patientName');
  const [selectedSortOptions, setSelectedSortOptions] = useState<Record<string, string>>({});
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  // Sample filter fields
  const filterFields: FilterField[] = [
    {
      id: 'patientName',
      label: 'Patient Name',
      type: 'text',
      placeholder: 'Enter patient name'
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Enter location'
    },
    {
      id: 'employer',
      label: 'Employer',
      type: 'text',
      placeholder: 'Enter employer'
    },
    {
      id: 'dateOfBirth',
      label: 'Date Of Birth',
      type: 'date',
      placeholder: 'Select date'
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' }
      ]
    }
  ];

  // Sample sort groups
  const sortGroups: SortGroup[] = [
    {
      id: 'patientName',
      title: 'Patient Name',
      options: [
        { id: 'asc', label: 'A-Z' },
        { id: 'desc', label: 'Z-A' }
      ]
    },
    {
      id: 'openDate',
      title: 'Open Date',
      options: [
        { id: 'oldest', label: 'Oldest to Newest' },
        { id: 'newest', label: 'Newest to Oldest' }
      ]
    },
    {
      id: 'type',
      title: 'Type',
      options: [
        { id: 'asc', label: 'A-Z' },
        { id: 'desc', label: 'Z-A' }
      ]
    },
    {
      id: 'stage',
      title: 'Stage',
      options: [
        { id: 'asc', label: 'A-Z' },
        { id: 'desc', label: 'Z-A' }
      ]
    },
    {
      id: 'schedulingStatus',
      title: 'Scheduling Status',
      options: [
        { id: 'asc', label: 'A-Z' },
        { id: 'desc', label: 'Z-A' }
      ]
    },
    {
      id: 'aging',
      title: 'Aging',
      options: [
        { id: 'asc', label: 'Ascending' },
        { id: 'desc', label: 'Descending' }
      ]
    },
    {
      id: 'nextActionBy',
      title: 'Next Action By',
      options: [
        { id: 'asc', label: 'A-Z' },
        { id: 'desc', label: 'Z-A' }
      ]
    },
    {
      id: 'actionDate',
      title: 'Action Date',
      options: [
        { id: 'oldest', label: 'Oldest to Newest' },
        { id: 'newest', label: 'Newest to Oldest' }
      ]
    },
    {
      id: 'scheduleDate',
      title: 'Schedule Date',
      options: [
        { id: 'oldest', label: 'Oldest to Newest' },
        { id: 'newest', label: 'Newest to Oldest' }
      ]
    }
  ];

  const handleFilterFieldChange = (fieldId: string) => {
    setActiveFilterField(fieldId);
  };

  const handleSortGroupChange = (groupId: string) => {
    setActiveSortGroup(groupId);
  };

  const handleSortOptionChange = (groupId: string, optionId: string) => {
    setSelectedSortOptions(prev => ({
      ...prev,
      [groupId]: optionId
    }));
  };

  const handleFilterValueChange = (fieldId: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleClearAll = () => {
    setFilterValues({});
    setSelectedSortOptions({});
  };

  const handleApply = (filters: Record<string, string>, sortOptions: Record<string, string>) => {
    console.log('Applied filters:', filters);
    console.log('Applied sort options:', sortOptions);
    alert(`Applied ${Object.keys(filters).length} filters and ${Object.keys(sortOptions).length} sort options`);
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: 'center', color: '#439322' }}>
        🔍 Custom Filter & Sort Examples
      </Typography>

      <Stack spacing={4}>
        {/* Filter Component */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Filter Component
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomFilterSort
              type="filter"
              size="md"
              filterFields={filterFields}
              activeFilterField={activeFilterField}
              onFilterFieldChange={handleFilterFieldChange}
              onFilterValueChange={handleFilterValueChange}
              onClearAll={handleClearAll}
              onApply={handleApply}
              onCancel={handleCancel}
            />
          </Box>
        </Paper>

        {/* Sort Component */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Sort Component
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomFilterSort
              type="sort"
              size="md"
              sortGroups={sortGroups}
              activeSortGroup={activeSortGroup}
              selectedSortOptions={selectedSortOptions}
              onSortGroupChange={handleSortGroupChange}
              onSortOptionChange={handleSortOptionChange}
              onClearAll={handleClearAll}
              onApply={handleApply}
              onCancel={handleCancel}
            />
          </Box>
        </Paper>

        {/* Different Sizes */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Different Sizes
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Typography variant="h6" sx={{ marginBottom: 1, textAlign: 'center' }}>
                Small
              </Typography>
              <CustomFilterSort
                type="filter"
                size="sm"
                filterFields={filterFields.slice(0, 3)}
                activeFilterField={activeFilterField}
                onFilterFieldChange={handleFilterFieldChange}
                onFilterValueChange={handleFilterValueChange}
                onClearAll={handleClearAll}
                onApply={handleApply}
                onCancel={handleCancel}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ marginBottom: 1, textAlign: 'center' }}>
                Medium
              </Typography>
              <CustomFilterSort
                type="filter"
                size="md"
                filterFields={filterFields}
                activeFilterField={activeFilterField}
                onFilterFieldChange={handleFilterFieldChange}
                onFilterValueChange={handleFilterValueChange}
                onClearAll={handleClearAll}
                onApply={handleApply}
                onCancel={handleCancel}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ marginBottom: 1, textAlign: 'center' }}>
                Large
              </Typography>
              <CustomFilterSort
                type="filter"
                size="lg"
                filterFields={filterFields}
                activeFilterField={activeFilterField}
                onFilterFieldChange={handleFilterFieldChange}
                onFilterValueChange={handleFilterValueChange}
                onClearAll={handleClearAll}
                onApply={handleApply}
                onCancel={handleCancel}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Current State Display */}
        <Paper sx={{ padding: 3, backgroundColor: '#F8FFF8' }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Current State
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Filter Values:
              </Typography>
              <Box sx={{ backgroundColor: '#FFFFFF', padding: 2, borderRadius: 1, border: '1px solid #E0E0E0' }}>
                {Object.keys(filterValues).length > 0 ? (
                  Object.entries(filterValues).map(([key, value]) => (
                    <Typography key={key} variant="body2" sx={{ marginBottom: 0.5 }}>
                      <strong>{key}:</strong> {value}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No filter values set
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Sort Options:
              </Typography>
              <Box sx={{ backgroundColor: '#FFFFFF', padding: 2, borderRadius: 1, border: '1px solid #E0E0E0' }}>
                {Object.keys(selectedSortOptions).length > 0 ? (
                  Object.entries(selectedSortOptions).map(([key, value]) => (
                    <Typography key={key} variant="body2" sx={{ marginBottom: 0.5 }}>
                      <strong>{key}:</strong> {value}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No sort options selected
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CustomFilterSortExample;

