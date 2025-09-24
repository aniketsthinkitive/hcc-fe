import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface OfficeSearchFilterProps {
  onSearch?: (searchTerm: string) => void;
  onFilter?: () => void;
}

const OfficeSearchFilter: React.FC<OfficeSearchFilterProps> = ({ 
  onSearch, 
  onFilter 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        padding: '16px',
        gap: '109px', // Gap from Figma design
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Search Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1,
          }}
        >
          <TextField
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{
              width: '320px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid #CDD0CD', // Neutral/20
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Shadow/xs
                '&:hover': {
                  borderColor: '#A9ACA9', // Neutral/40
                },
                '&.Mui-focused': {
                  borderColor: '#439322', // Primary color
                  boxShadow: '0px 0px 0px 3px rgba(67, 147, 34, 0.1)',
                },
                '& fieldset': {
                  border: 'none', // Remove default border
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '8px 10px',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '1.6',
                color: '#A9ACA9', // Neutral/40 for placeholder
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                '&::placeholder': {
                  color: '#A9ACA9', // Neutral/40
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon 
                    sx={{ 
                      width: 18, 
                      height: 18, 
                      color: '#757775' // Neutral/60
                    }} 
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* Filter Button */}
          <IconButton
            onClick={onFilter}
            sx={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #C5C9C5', // Neutral/30
              borderRadius: '6px',
              padding: '10px',
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Shadow/xs
              '&:hover': {
                backgroundColor: '#F9FAF9', // Neutral/1
                borderColor: '#A9ACA9', // Neutral/40
              },
            }}
          >
            <FilterAltIcon 
              sx={{ 
                width: 18, 
                height: 18, 
                color: '#2C2D2C' // Neutral/80
              }} 
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default OfficeSearchFilter;
