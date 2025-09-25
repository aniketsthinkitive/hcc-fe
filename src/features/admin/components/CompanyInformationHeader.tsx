import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import CustomButton from '../../../components/custom-buttons/custom-buttons';

interface CompanyInformationHeaderProps {
  onEdit: () => void;
}

const CompanyInformationHeader: React.FC<CompanyInformationHeaderProps> = ({ onEdit }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: 2, sm: 3 },
        // backgroundColor: '#FFFFFF',
        // borderBottom: '1px solid #E7E9EB',
      }}
    >
      <Typography variant="h5" fontWeight={"600"}>Company Information</Typography>

      {/* <CustomButton
        variant="primary"
        onClick={onEdit}
        icon={<EditIcon />}
        iconPosition="left"
      >
        Edit Profile
      </CustomButton> */}
      <Button
        startIcon={<EditIcon sx={{ width: 18, height: 18 }} />}
        variant="outlined"
        onClick={onEdit}
        sx={{
          backgroundColor: "#FFFFFF", // Primary/70 Main from Figma
          // color: "#FFFFFF",
          border: "1px solid #439322",
          borderRadius: "6px",
          padding: "10px 16px",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "1.15",
          textTransform: "none",
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)", // Shadow/xs
          "&:hover": {
            backgroundColor: "#3a7d1d", // Darker shade on hover
            boxShadow: "0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
          },
        }}
      >
        Edit Profile
      </Button>
    </Box>
  );
};

export default CompanyInformationHeader;
