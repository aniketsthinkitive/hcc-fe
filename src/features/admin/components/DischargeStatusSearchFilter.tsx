import React, { useState } from 'react';
import { Box, type SelectChangeEvent } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CustomInput from '../../../components/custom-input/custom-input';
import CustomSelect from '../../../components/custom-select/custom-select';
interface DischargeStatusSearchFilterProps {
  onSearch?: (searchTerm: string) => void;
  onFilter?: () => void;
}

const DischargeStatusSearchFilter: React.FC<DischargeStatusSearchFilterProps> = ({ 
  onSearch, 
  onFilter 
}) => {
   const [searchTerm, setSearchTerm] = useState("");
   const [statusValue, setStatusValue] = useState("all");

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const value = event.target.value;
     setSearchTerm(value);
     onSearch?.(value);
   };

   const handleStatusChange = (event: SelectChangeEvent<string>) => {
     const value = event.target.value;
     setStatusValue(value);
    //  onStatusChange?.(value);
   };

   const statusOptions = [
     { value: "all", label: "All" },
     { value: "archive", label: "Archive" },
     { value: "unarchive", label: "Unarchive" },
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
          placeholder="Search By Discharge Status"
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

export default DischargeStatusSearchFilter;
