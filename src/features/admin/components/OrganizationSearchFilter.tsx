import React, { useState } from 'react';
import { Box, type SelectChangeEvent } from '@mui/material';
import CustomSelect from '../../../components/custom-select/custom-select';
import CustomInput from '../../../components/custom-input/custom-input';

interface OrganizationSearchFilterProps {
  onSearch?: (searchTerm: string) => void;
  onStatusChange?: (status: string) => void;
}

const OrganizationSearchFilter: React.FC<OrganizationSearchFilterProps> = ({ 
  onSearch, 
  onStatusChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusValue, setStatusValue] = useState('all');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setStatusValue(value);
    onStatusChange?.(value);
  };

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "16px",
        gap: "16px",
        backgroundColor: "#FFFFFF",
      }}
    >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CustomSelect
            placeholder="All"
            name="status"
            value={statusValue}
            items={statusOptions}
            onChange={handleStatusChange}
            bgWhite={true}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CustomInput
            placeholder="Search By Organization"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            hasStartSearchIcon={true}
            bgWhite={true}
          />
        </Box>
    </Box>
  );
};

export default OrganizationSearchFilter;
