import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomLabel from '../../../components/custom-label/custom-label';
import { type UserData } from './EditNewUser';

interface ArchiveNewUserProps {
  /** User data to display */
  userData: UserData;
  /** Function to handle archive/unarchive action */
  onArchive: (userData: UserData) => Promise<void> | void;
  /** Function to handle form cancellation */
  onCancel: () => void;
  /** Whether the user is currently archived */
  isArchived?: boolean;
}

/**
 * ArchiveNewUser Component
 * 
 * A component for archiving or unarchiving users with confirmation.
 * This component provides a clean interface for archive operations
 * and can be extended for future unarchive functionality.
 * 
 * @param userData - The user data to archive/unarchive
 * @param onArchive - Function to handle the archive operation
 * @param onCancel - Function to handle cancellation
 * @param isArchived - Whether the user is currently archived
 */
const ArchiveNewUser: React.FC<ArchiveNewUserProps> = ({
  userData,
  onArchive,
  onCancel,
  isArchived = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const handleArchive = async () => {
    try {
      await onArchive(userData);
    } catch (error) {
      // Error handling is done in the parent component
      throw error;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: isMobile ? "12px 16px" : isTablet ? "16px 20px" : "20px 24px",
          borderBottom: "1px solid #E3ECEF",
          backgroundColor: "#FFFFFF",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif',
            fontWeight: 600,
            fontSize: isMobile ? "18px" : isTablet ? "20px" : "24px",
            lineHeight: 1.2,
            color: "#2C2D2C",
          }}
        >
          {isArchived ? 'Unarchive User' : 'Archive User'}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          padding: isMobile ? "16px" : isTablet ? "20px" : "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          overflow: "auto",
        }}
      >
        {/* User Information Display */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <CustomLabel
            label="User Information"
            required={false}
            sx={{ fontSize: "16px", fontWeight: 600, color: "#2C2D2C" }}
          />
          
          <Box sx={{ 
            padding: "16px", 
            backgroundColor: "#F9FAF9", 
            borderRadius: "8px",
            border: "1px solid #E3ECEF"
          }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Typography sx={{ fontSize: "14px", color: "#757775" }}>
                <strong>Name:</strong> {userData.name}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#757775" }}>
                <strong>Username:</strong> {userData.username}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#757775" }}>
                <strong>Email:</strong> {userData.userEmail}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#757775" }}>
                <strong>Role:</strong> {userData.role}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#757775" }}>
                <strong>Office:</strong> {userData.office}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Warning Message */}
        <Box sx={{ 
          padding: "16px", 
          backgroundColor: isArchived ? "#E3F2FD" : "#FFF3E0", 
          borderRadius: "8px",
          border: `1px solid ${isArchived ? "#BBDEFB" : "#FFE0B2"}`
        }}>
          <Typography sx={{ 
            fontSize: "14px", 
            color: isArchived ? "#1976D2" : "#F57C00",
            fontWeight: 500
          }}>
            {isArchived 
              ? "This will restore the user and make them active again. They will be able to log in and access the system."
              : "This will archive the user. They will no longer be able to log in and will be hidden from the user list by default."
            }
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          borderTop: "1px solid #E3ECEF",
          backgroundColor: "#FFFFFF",
          flexShrink: 0,
        }}
      >
        <CustomButton variant="secondary" size="md" onClick={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton
          variant="primary"
          size="md"
          onClick={handleArchive}
          sx={{
            backgroundColor: isArchived ? "#1976D2" : "#D32F2F",
            '&:hover': {
              backgroundColor: isArchived ? "#1565C0" : "#C62828",
            }
          }}
        >
          {isArchived ? 'Unarchive User' : 'Archive User'}
        </CustomButton>
      </Box>
    </Box>
  );
};

export default ArchiveNewUser;
