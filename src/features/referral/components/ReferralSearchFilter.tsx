import React, { useState } from 'react';
import { Box, IconButton, type SelectChangeEvent } from '@mui/material';
import CustomInput from '../../../components/custom-input/custom-input';
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

interface ReferralSearchFilterProps {
  onSearch?: (searchTerm: string) => void;
  onStatusChange?: (status: string) => void;
  onFilter?: () => void;
}

const ReferralSearchFilter: React.FC<ReferralSearchFilterProps> = ({ 
  onSearch, 
  onStatusChange,
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
        <IconButton
          onClick={() => {}}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #C5C9C5", // Neutral/30
            borderRadius: "6px",
            padding: "10px",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)", // Shadow/xs
            "&:hover": {
              backgroundColor: "#F9FAF9", // Neutral/1
              borderColor: "#A9ACA9", // Neutral/40
            },
          }}
        >
          <FilterAltOutlinedIcon
            sx={{
              width: 18,
              height: 18,
              color: "#2C2D2C", // Neutral/80
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <CustomInput
          placeholder="Search By Client Name, Referral ID, or Provider"
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

export default ReferralSearchFilter;
