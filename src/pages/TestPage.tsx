import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  FormLabel
} from '@mui/material';

// Import custom components
import CustomSelect from '../components/custom-select/custom-select';
import { CustomFilterSort } from '../components/custom-filter-sort';
 
const TestPage: React.FC = () => {
  // State for dropdown
  const [selectValue, setSelectValue] = useState('');
  
  // State for filter-sort
  const [activeFilterField, setActiveFilterField] = useState('patientName');
  const [activeSortGroup, setActiveSortGroup] = useState('patientName');
  const [selectedSortOptions, setSelectedSortOptions] = useState<Record<string, string>>({});
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  // Sample data for dropdown
  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // Sample filter fields
  const filterFields = [
    {
      id: 'patientName',
      label: 'Patient Name',
      type: 'text' as const,
      placeholder: 'Enter patient name'
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text' as const,
      placeholder: 'Enter location'
    },
    {
      id: 'status',
      label: 'Status',
      type: 'text' as const,
      placeholder: 'Enter status'
    }
  ];

  // Sample sort groups
  const sortGroups = [
    {
      id: 'patientName',
      title: 'Patient Name',
      options: [
        { id: 'asc', label: 'A-Z', value: 'asc' },
        { id: 'desc', label: 'Z-A', value: 'desc' }
      ]
    },
    {
      id: 'date',
      title: 'Date',
      options: [
        { id: 'oldest', label: 'Oldest to Newest', value: 'oldest' },
        { id: 'newest', label: 'Newest to Oldest', value: 'newest' }
      ]
    }
  ];

  const handleSelectChange = (e: any) => {
    setSelectValue(e.target.value);
  };

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
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h3" sx={{ marginBottom: 4, textAlign: 'center', color: '#439322' }}>
        🧪 Custom Components Test
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Custom Dropdown */}
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: 3, color: '#439322', textAlign: 'center' }}>
            Custom Select Dropdown
          </Typography>
          
          <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
            <FormLabel sx={{ marginBottom: 2, display: 'block', fontSize: '16px', fontWeight: 600 }}>
              Choose an Option
            </FormLabel>
            <CustomSelect
              placeholder="Select an option"
              name="testSelect"
              value={selectValue}
              items={selectOptions}
              onChange={handleSelectChange}
            />
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#439322', 
                marginTop: 2, 
                display: 'block',
                textAlign: 'center',
                fontWeight: 500
              }}
            >
              Selected: {selectValue || 'None selected'}
            </Typography>
          </Box>
        </Paper>

        {/* Custom Filter Component */}
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: 3, color: '#439322', textAlign: 'center' }}>
            Custom Filter Component
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

        {/* Custom Sort Component */}
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: 3, color: '#439322', textAlign: 'center' }}>
            Custom Sort Component
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

        {/* Current State Display */}
        <Paper sx={{ padding: 3, backgroundColor: '#F8FFF8' }}>
          <Typography variant="h5" sx={{ marginBottom: 2, color: '#439322' }}>
            Current State
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Box>
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
            </Box>
            <Box>
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
            </Box>
          </Box>
        </Paper>
      </Box>

    </Box>
  );
};

export default TestPage;