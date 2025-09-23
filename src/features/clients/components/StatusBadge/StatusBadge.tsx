import React from 'react';
import { Box, Typography } from '@mui/material';
import { StatusBadgeStyles } from './StatusBadge.styles';

export type ClientStatus = 'intake' | 'active' | 'hold' | 'referral' | 'discharged' | 'pending';

export interface StatusBadgeProps {
  status: ClientStatus;
  showDropdown?: boolean;
  onClick?: () => void;
  className?: string;
}

const statusConfig = {
  intake: {
    label: 'Intake',
    backgroundColor: '#DBEAFF', // Informative/5
    textColor: '#1859B4', // Informative/60
    borderColor: '#1859B4',
  },
  active: {
    label: 'Active',
    backgroundColor: '#EFFFE3', // Primary/10
    textColor: '#1AA23A', // Success/60
    borderColor: '#1AA23A',
  },
  hold: {
    label: 'Hold',
    backgroundColor: '#FFF0F0', // Error/1
    textColor: '#B51C1C', // Error/60
    borderColor: '#B51C1C',
  },
  referral: {
    label: 'Referral',
    backgroundColor: '#D8FDFD', // Supporting/10
    textColor: '#067A7A', // Supporting/60 (Main)
    borderColor: '#067A7A',
  },
  discharged: {
    label: 'Discharged',
    backgroundColor: '#F2F2F2', // Neutral/5
    textColor: '#757775', // Neutral/60
    borderColor: '#757775',
  },
  pending: {
    label: 'Pending',
    backgroundColor: '#FAE7DB', // Warning/5
    textColor: '#BF550F', // Warning/60
    borderColor: '#BF550F',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showDropdown = false,
  onClick,
  className = '',
}) => {
  const config = statusConfig[status];

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Box
      className={`${StatusBadgeStyles.badge} ${className}`}
      sx={{
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        border: `1px solid ${config.borderColor}`,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          opacity: 0.8,
          transform: 'translateY(-1px)',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        } : {},
      }}
      onClick={handleClick}
    >
      <Typography
        variant="body2"
        sx={{
          ...StatusBadgeStyles.badgeText,
          color: config.textColor,
          fontWeight: 500,
        }}
      >
        {config.label}
      </Typography>
      
      {showDropdown && (
        <Box
          sx={{
            ...StatusBadgeStyles.dropdownIcon,
            color: config.textColor,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.21 4.21L6 7L8.79 4.21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      )}
    </Box>
  );
};

export default StatusBadge;