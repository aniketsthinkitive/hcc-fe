import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from '../../../../components/custom-buttons/custom-buttons';
import { ClientHeaderStyles } from './ClientHeader.styles';

// Icons matching Figma design
const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 12.75L4.5 8.25H7.5V2.25H10.5V8.25H13.5L9 12.75ZM15.75 15.75H2.25V13.5H15.75V15.75Z"
      fill="currentColor"
    />
  </svg>
);

const AddIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 2.25V15.75M2.25 9H15.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface ClientHeaderProps {
  onDownloadCSV?: () => void;
  onNewClient?: () => void;
  className?: string;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({
  onDownloadCSV,
  onNewClient,
  className = '',
}) => {
  return (
    <Box sx={ClientHeaderStyles.container} className={className}>
      <Box sx={ClientHeaderStyles.content}>
        <Typography variant="h5" sx={ClientHeaderStyles.title}>
          All Clients
        </Typography>
        
        <Box sx={ClientHeaderStyles.actions}>
          <CustomButton
            variant="secondary"
            size="md"
            icon={<DownloadIcon />}
            iconPosition="left"
            onClick={onDownloadCSV}
            sx={ClientHeaderStyles.downloadButton}
          >
            Download CSV
          </CustomButton>
          
          <CustomButton
            variant="primary"
            size="md"
            icon={<AddIcon />}
            iconPosition="left"
            onClick={onNewClient}
            sx={ClientHeaderStyles.newClientButton}
          >
            New Client
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientHeader;