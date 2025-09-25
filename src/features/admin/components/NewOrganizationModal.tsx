import React from 'react';
import CustomDrawer from '../../../components/custom-drawer/custom-drawer';
import NewOrganizationForm, { type OrganizationFormData } from './NewOrganizationForm';

interface NewOrganizationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OrganizationFormData) => void;
  initialData?: Partial<OrganizationFormData>;
  isEdit?: boolean;
}

const NewOrganizationModal: React.FC<NewOrganizationModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEdit = false,
}) => {
  const handleSubmit = (data: OrganizationFormData) => {
    onSubmit(data);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <CustomDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      drawerWidth="925px"
      drawermargin="0"
      drawerPadding="0"
    >
      <NewOrganizationForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEdit={isEdit}
      />
    </CustomDrawer>
  );
};

export default NewOrganizationModal;
