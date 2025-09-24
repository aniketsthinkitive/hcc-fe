import React, { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../../../components/custom-input/custom-input';
import CustomButton from '../../../components/custom-buttons/custom-buttons';
import CustomLabel from '../../../components/custom-label/custom-label';
import CustomDialog from '../../../components/custom-dialog/custom-dialog';

// Form validation schema - simplified to one field
const cancellationChargeFormSchema = yup.object({
  chargeName: yup.string().required('Charge Name is required'),
});

export interface CancellationChargeFormData {
  chargeName: string;
}

interface AddNewCancellationChargeModalProps {
  open: boolean;
  isEdit?: boolean;
  initialData?: Partial<CancellationChargeFormData>;
  onClose: () => void;
  onSubmit: (data: CancellationChargeFormData) => void;
}

const AddNewCancellationChargeModal: React.FC<AddNewCancellationChargeModalProps> = ({
  open,
  isEdit = false,
  initialData,
  onClose,
  onSubmit,
}) => {
  const initialValues = useMemo(() => ({
    chargeName: "",
  }), []);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CancellationChargeFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(cancellationChargeFormSchema) as any,
    defaultValues: initialValues,
    mode: 'onChange',
  });

  // Set initial values when editing
  useEffect(() => {
    if (isEdit && initialData) {
      Object.keys(initialData).forEach((key) => {
        const value = initialData[key as keyof CancellationChargeFormData];
        if (value !== undefined) {
          setValue(key as keyof CancellationChargeFormData, value);
        }
      });
    } else {
      reset(initialValues);
    }
  }, [isEdit, initialData, setValue, reset, initialValues]);

  const handleFormSubmit = (data: CancellationChargeFormData) => {
    onSubmit(data);
    onClose();
  };

  const handleCancel = () => {
    reset(initialValues);
    onClose();
  };

  return (
    <CustomDialog
      open={open}
      onClose={handleCancel}
      title={isEdit ? "Edit Cancellation Charge" : "Add New Cancellation Charge"}
      buttonName={[]}
      width="500px"
      height="auto"
      padding="24px"
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSubmit={handleSubmit(handleFormSubmit as any)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Charge Name Field */}
        <Controller
          name="chargeName"
          control={control}
          render={({ field }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <CustomLabel label="Charge Name" isRequired />
              <CustomInput
                placeholder="Enter charge name"
                name="chargeName"
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.chargeName}
                errorMessage={errors.chargeName?.message}
              />
            </Box>
          )}
        />

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <CustomButton variant="secondary" size="md" onClick={handleCancel}>
            Cancel
          </CustomButton>
          <CustomButton variant="primary" size="md" type="submit">
            {isEdit ? "Update" : "Save"}
          </CustomButton>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default AddNewCancellationChargeModal;
