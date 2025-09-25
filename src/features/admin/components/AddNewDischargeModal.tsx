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
const DischargeStatusFormSchema = yup.object({
  chargeName: yup.string().required('Charge Name is required'),
});

export interface DischargeStatusFormData {
  chargeName: string;
}

interface AddNewDischargeModalProps {
  open: boolean;
  isEdit?: boolean;
  initialData?: Partial<DischargeStatusFormData>;
  onClose: () => void;
  onSubmit: (data: DischargeStatusFormData) => void;
}

const AddNewDischargeModal: React.FC<AddNewDischargeModalProps> = ({
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
  } = useForm<DischargeStatusFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(DischargeStatusFormSchema) as any,
    defaultValues: initialValues,
    mode: 'onChange',
  });

  // Set initial values when editing
  useEffect(() => {
    if (isEdit && initialData) {
      Object.keys(initialData).forEach((key) => {
        const value = initialData[key as keyof DischargeStatusFormData];
        if (value !== undefined) {
          setValue(key as keyof DischargeStatusFormData, value);
        }
      });
    } else {
      reset(initialValues);
    }
  }, [isEdit, initialData, setValue, reset, initialValues]);

  const handleFormSubmit = (data: DischargeStatusFormData) => {
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
      title={isEdit ? "Edit Discharge status" : "Add Discharge status"}
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
              <CustomLabel label="Discharge status" isRequired />
              <CustomInput
                placeholder="Enter discharge status"
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

export default AddNewDischargeModal;
