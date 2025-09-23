import React from 'react';
import { Box, TextField, Button, Divider } from '@mui/material';
import { Search as SearchIcon, FilterAltOutlined as FilterIcon, KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';

interface SearchFilterSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  searchValue,
  onSearchChange,
  onFilterClick,
}) => {
  return (
    <Box
      sx={{
        width: '100vw', // Full width of the window
        marginLeft: 'calc(-50vw + 50%)', // Center and extend to full width
        marginRight: 'calc(-50vw + 50%)', // Center and extend to full width
        backgroundColor: '#ffffff',
        height: '70px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Horizontal Divider Line */}
      <Divider 
        sx={{ 
          width: '100%',
          borderColor: '#E7E9EB',
          marginBottom: 2,
        }} 
      />
      
      {/* Search and Filter Content */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          paddingX: 3, // Add horizontal padding for content
        }}
      >
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: '#989998', mr: 1 }} />,
        }}
        sx={{
          maxWidth: 400,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E7E9EB', // Light gray border as shown in design
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            '&:hover': {
              borderColor: '#439322',
            },
            '&.Mui-focused': {
              borderColor: '#439322',
              boxShadow: '0px 0px 0px 1px #439322',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '14px',
            color: '#2C2D2C',
            padding: '10px 14px',
            '&::placeholder': {
              color: '#A9ACA9',
              opacity: 1,
            },
          },
        }}
      />

      {/* Filter Button */}
      <Button
        variant="outlined"
        startIcon={<FilterIcon />}
        endIcon={<ArrowDownIcon />}
        onClick={onFilterClick}
        sx={{
          borderColor: '#E7E9EB', // Light gray border as shown in design
          color: '#2C2D2C',
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 14px',
          borderRadius: 2,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          minWidth: 'auto',
          '&:hover': {
            borderColor: '#439322',
            backgroundColor: 'rgba(67, 147, 34, 0.04)',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.1)',
          },
          '& .MuiButton-startIcon': {
            marginRight: '4px',
          },
          '& .MuiButton-endIcon': {
            marginLeft: '4px',
          },
        }}
      >
      </Button>
      </Box>
    </Box>
  );
};

export default SearchFilterSection;
