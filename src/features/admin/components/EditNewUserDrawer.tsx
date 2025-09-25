import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import CustomDrawer from '../../../components/custom-drawer/custom-drawer';
import EditNewUser, { type UserFormData, type UserData } from './EditNewUser';

interface EditNewUserDrawerProps {
  open: boolean;
  userData: UserData;
  onSubmit: (data: UserFormData) => void;
  onClose: () => void;
}

const EditNewUserDrawer: React.FC<EditNewUserDrawerProps> = ({
  open,
  userData,
  onSubmit,
  onClose,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleSubmit = (data: UserFormData) => {
    onSubmit(data);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const getDrawerWidth = () => {
    if (isMobile) return '100vw';
    if (isTablet) return '90vw';
    return '925px';
  };

  return (
    <CustomDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      drawerWidth={getDrawerWidth()}
      drawermargin="0"
      drawerPadding="0"
    >
      <EditNewUser
        userData={userData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CustomDrawer>
  );
};

export default EditNewUserDrawer;
