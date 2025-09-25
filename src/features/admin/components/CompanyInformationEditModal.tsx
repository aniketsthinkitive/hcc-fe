import React from 'react';
import CustomDrawer from '../../../components/custom-drawer/custom-drawer';
import CompanyInformationEditForm, { type CompanyFormData } from './CompanyInformationEditForm';

interface CompanyInformationEditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CompanyFormData) => void;
  initialData?: Partial<CompanyFormData>;
}

const CompanyInformationEditModal: React.FC<CompanyInformationEditModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const handleSubmit = (data: CompanyFormData) => {
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
      <CompanyInformationEditForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CustomDrawer>
  );
};

export default CompanyInformationEditModal;
