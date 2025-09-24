import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface CancellationChargeHeaderProps {
  onNewCharge?: () => void;
}

const CancellationChargeHeader: React.FC<CancellationChargeHeaderProps> = ({ 
  onNewCharge 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 16px 12px',
        gap: '10px',
      }}
    >
      {/* Title Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '1.2',
              color: '#2C2D2C', // Neutral/80 from Figma
            }}
          >
            Cancellation Charges
          </Typography>
        </Box>
      </Box>

      {/* New Charge Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Button
          startIcon={<AddIcon sx={{ width: 18, height: 18 }} />}
          onClick={onNewCharge}
          sx={{
            backgroundColor: '#439322', // Primary/70 Main from Figma
            color: '#FFFFFF',
            border: '1px solid #439322',
            borderRadius: '6px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '1.15',
            textTransform: 'none',
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Shadow/xs
            '&:hover': {
              backgroundColor: '#3a7d1d', // Darker shade on hover
              boxShadow: '0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
            },
          }}
        >
          New Charge
        </Button>
      </Box>
    </Box>
  );
};

export default CancellationChargeHeader;
