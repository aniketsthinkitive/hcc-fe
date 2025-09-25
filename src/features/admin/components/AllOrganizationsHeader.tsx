import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Download as DownloadIcon, Add as AddIcon } from '@mui/icons-material';

interface AllOrganizationsHeaderProps {
  onDownloadCSV: () => void;
  onNewOrganization: () => void;
}

const AllOrganizationsHeader: React.FC<AllOrganizationsHeaderProps> = ({
  onDownloadCSV,
  onNewOrganization,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: {
          xs: "flex-start",
          sm: "space-between",
          md: "space-between",
          lg: "space-between",
        },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 2, sm: 0 },
        margin: { xs: 2, sm: 3 },
        padding: 0,
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        paddingRight: "30px",
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontSize: { xs: "20px", sm: "24px" },
          fontWeight: 600,
          lineHeight: 1.2,
          color: "#2C2D2C",
          margin: 0,
        }}
      >
        All Organizations
      </Typography>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 2 },
          flexDirection: { xs: "column", sm: "row" },
          width: { xs: "100%", sm: "auto" },
          flexShrink: 0,
          minWidth: { xs: "auto", sm: "350px" },
          overflow: "visible",
          justifyContent: { xs: "flex-start", sm: "flex-end" },
        }}
      >
        {/* Download CSV Button */}
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onDownloadCSV}
          sx={{
            borderColor: "#E7E9EB",
            color: "#2C2D2C",
            textTransform: "none",
            fontWeight: 500,
            padding: { xs: "6px 12px", sm: "8px 16px" },
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            fontSize: { xs: "12px", sm: "14px" },
            width: { xs: "100%", sm: "auto" },
            minWidth: { xs: "auto", sm: "160px" },
            flexShrink: 0,
            "&:hover": {
              borderColor: "#439322",
              backgroundColor: "#ffffff",
              color: "#2C2D2C",
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.1)",
            },
            "& .MuiButton-startIcon": {
              marginRight: { xs: "6px", sm: "8px" },
            },
          }}
        >
          Download CSV
        </Button>

        {/* New Organization Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onNewOrganization}
          sx={{
            backgroundColor: "#439322",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 500,
            padding: { xs: "6px 12px", sm: "8px 16px" },
            borderRadius: 2,
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            fontSize: { xs: "12px", sm: "14px" },
            width: { xs: "100%", sm: "auto" },
            minWidth: { xs: "auto", sm: "160px" },
            flexShrink: 0,
            "&:hover": {
              backgroundColor: "#2C6E14",
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.1)",
            },
            "& .MuiButton-startIcon": {
              marginRight: { xs: "6px", sm: "8px" },
            },
          }}
        >
          New Organization
        </Button>
      </Box>
    </Box>
  );
};

export default AllOrganizationsHeader;
