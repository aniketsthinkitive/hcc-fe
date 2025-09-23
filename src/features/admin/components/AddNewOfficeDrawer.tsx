import React from 'react';
import CustomDrawer from '../../../components/custom-drawer/custom-drawer';
import AddNewOfficeForm, { type OfficeFormData } from './AddNewOfficeForm';

interface AddNewOfficeDrawerProps {
  open: boolean;
  isEdit?: boolean;
  initialData?: Partial<OfficeFormData>;
  onClose: () => void;
  onSubmit: (data: OfficeFormData) => void;
}

const AddNewOfficeDrawer: React.FC<AddNewOfficeDrawerProps> = ({
  open,
  isEdit = false,
  initialData,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (data: OfficeFormData) => {
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
      <AddNewOfficeForm
        isEdit={isEdit}
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CustomDrawer>
  );
};

export default AddNewOfficeDrawer;
