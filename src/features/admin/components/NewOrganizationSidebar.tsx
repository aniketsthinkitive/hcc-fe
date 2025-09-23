import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';
import CustomInput from '../../../components/custom-input/custom-input';
import CustomSelect from '../../../components/custom-select/custom-select';
import CustomLabel from '../../../components/custom-label/custom-label';

interface NewOrganizationSidebarProps {
  open: boolean;
  onClose: () => void;
}

// Form data interface
interface FormData {
  organizationShortName: string;
  organizationTimeZone: string;
  allTreatmentsAvailable: boolean;
  usesDaylightSavings: boolean;
  attachComplianceReports: boolean;
  organizationName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  faxNumber: string;
  contactPersonName: string;
  clientsVisibleToAllUsers: boolean;
  externalUsersCanManageVouchers: boolean;
  enableGrantFunding: boolean;
}

const NewOrganizationSidebar: React.FC<NewOrganizationSidebarProps> = ({ open, onClose }) => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    organizationShortName: '',
    organizationTimeZone: '',
    allTreatmentsAvailable: false,
    usesDaylightSavings: false,
    attachComplianceReports: false,
    organizationName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
    faxNumber: '',
    contactPersonName: '',
    clientsVisibleToAllUsers: false,
    externalUsersCanManageVouchers: false,
    enableGrantFunding: false,
  });

  // Time zone options
  const timeZoneOptions = [
    { value: 'mountain', label: 'Mountain' },
    { value: 'pacific', label: 'Pacific' },
    { value: 'eastern', label: 'Eastern' },
    { value: 'central', label: 'Central' },
    { value: 'hawaii', label: 'Hawaii' },
  ];

  // State options
  const stateOptions = [
    { value: 'al', label: 'Alabama' },
    { value: 'ak', label: 'Alaska' },
    { value: 'az', label: 'Arizona' },
    { value: 'ar', label: 'Arkansas' },
    { value: 'ca', label: 'California' },
    { value: 'co', label: 'Colorado' },
    { value: 'ct', label: 'Connecticut' },
    { value: 'de', label: 'Delaware' },
    { value: 'fl', label: 'Florida' },
    { value: 'ga', label: 'Georgia' },
    // Add more states as needed
  ];

  // Handle input changes
  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // Handle select changes
  const handleSelectChange = (field: keyof FormData) => (e: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.checked
    }));
  };

  // Handle form submission
  const handleSave = () => {
    console.log('Form data:', formData);
    // TODO: Implement form submission
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 1300, // Higher than navbar and other components
        '& .MuiBackdrop-root': {
          zIndex: 1299, // Backdrop should be below drawer but above other content
        },
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '50vw', md: '50vw' },
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1300, // Ensure drawer paper is above everything
        },
      }}
    >
      {/* Sticky Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid #E7E9EB',
        backgroundColor: '#FFFFFF',
        position: 'sticky',
        top: 0,
        zIndex: 1
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              color: '#2C2D2C',
              fontSize: { xs: '20px', sm: '24px' }
            }}
          >
            Add New Organization
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#989998' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        {/* General Information Section */}
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <CustomLabel label="Organization Short Name" isRequired />
              <CustomInput
                name="organizationShortName"
                placeholder="Enter Organization Short Name"
                value={formData.organizationShortName}
                onChange={handleInputChange('organizationShortName')}
                required
              />
            </Box>

            <Box>
              <CustomLabel label="Organization Time Zone" isRequired />
              <CustomSelect
                name="organizationTimeZone"
                placeholder="Select Time Zone"
                value={formData.organizationTimeZone}
                items={timeZoneOptions}
                onChange={handleSelectChange('organizationTimeZone')}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.allTreatmentsAvailable}
                    onChange={handleCheckboxChange('allTreatmentsAvailable')}
                    sx={{
                      '&.Mui-checked': {
                        color: '#439322',
                      },
                    }}
                  />
                }
                label="All Treatments are available to this org"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#2C2D2C',
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.usesDaylightSavings}
                    onChange={handleCheckboxChange('usesDaylightSavings')}
                    sx={{
                      '&.Mui-checked': {
                        color: '#439322',
                      },
                    }}
                  />
                }
                label="Organization Uses Daylight Savings Time"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#2C2D2C',
                  },
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.attachComplianceReports}
                    onChange={handleCheckboxChange('attachComplianceReports')}
                    sx={{
                      '&.Mui-checked': {
                        color: '#439322',
                      },
                    }}
                  />
                }
                label="Attach Individualized Compliance Reports"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#2C2D2C',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Organization Details Section */}
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <CustomLabel label="Organization Name" isRequired />
              <CustomInput
                name="organizationName"
                placeholder="Enter Organization Name"
                value={formData.organizationName}
                onChange={handleInputChange('organizationName')}
                required
              />
            </Box>

            <Box>
              <CustomLabel label="Address Line 1" isRequired />
              <CustomInput
                name="addressLine1"
                placeholder="Enter Address Line 1"
                value={formData.addressLine1}
                onChange={handleInputChange('addressLine1')}
                required
              />
            </Box>

            <Box>
              <CustomLabel label="Address Line 2" />
              <CustomInput
                name="addressLine2"
                placeholder="Enter Address Line 2"
                value={formData.addressLine2}
                onChange={handleInputChange('addressLine2')}
              />
            </Box>

            {/* City, State, Zip in responsive layout */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2 
            }}>
              <Box sx={{ flex: { xs: 1, sm: 2 } }}>
                <CustomLabel label="City" isRequired />
                <CustomInput
                  name="city"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={handleInputChange('city')}
                  required
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <CustomLabel label="State" isRequired />
                <CustomSelect
                  name="state"
                  placeholder="Select"
                  value={formData.state}
                  items={stateOptions}
                  onChange={handleSelectChange('state')}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <CustomLabel label="Zip" isRequired />
                <CustomInput
                  name="zip"
                  placeholder="Enter Zip Code"
                  value={formData.zip}
                  onChange={handleInputChange('zip')}
                  required
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Contact Information Section */}
        <Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <CustomLabel label="Phone Number" isRequired />
              <CustomInput
                name="phoneNumber"
                placeholder="eg. (205) 555-0100"
                value={formData.phoneNumber}
                onChange={handleInputChange('phoneNumber')}
                format="phone"
                required
              />
            </Box>

            <Box>
              <CustomLabel label="Fax Number" isRequired />
              <CustomInput
                name="faxNumber"
                placeholder="eg. (205) 555-0100"
                value={formData.faxNumber}
                onChange={handleInputChange('faxNumber')}
                format="phone"
                required
              />
            </Box>

            <Box>
              <CustomLabel label="Contact Person Name" isRequired />
              <CustomInput
                name="contactPersonName"
                placeholder="eg. John Doe"
                value={formData.contactPersonName}
                onChange={handleInputChange('contactPersonName')}
                required
              />
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Additional Options Section */}
        <Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.clientsVisibleToAllUsers}
                    onChange={handleCheckboxChange('clientsVisibleToAllUsers')}
                    sx={{
                      '&.Mui-checked': {
                        color: '#439322',
                      },
                    }}
                  />
                }
                label="Clients Visible to all Organization Users"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#2C2D2C',
                    fontWeight: 500,
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: '#989998', fontSize: '12px', ml: 4 }}>
                If checked, all clients supervised by this organization must have a ROI signed with this org!
              </Typography>
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.externalUsersCanManageVouchers}
                    onChange={handleCheckboxChange('externalUsersCanManageVouchers')}
                    sx={{
                      '&.Mui-checked': {
                        color: '#439322',
                      },
                    }}
                  />
                }
                label="External Org Users Can Manage Client Vouchers"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#2C2D2C',
                    fontWeight: 500,
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: '#989998', fontSize: '12px', ml: 4 }}>
                Unchecking this will remove the Manage Voucher permission for all external users for this org!
              </Typography>
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.enableGrantFunding}
                    onChange={handleCheckboxChange('enableGrantFunding')}
                    sx={{
                      '&.Mui-checked': {
                        color: '#439322',
                      },
                    }}
                  />
                }
                label="Enable this Org to use Grant Funding for Vouchers"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#2C2D2C',
                    fontWeight: 500,
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: '#989998', fontSize: '12px', ml: 4 }}>
                Unchecking this stop allowing this organizations grant funds for vouchers
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Note Section */}
        <Box sx={{
          backgroundColor: '#FFF3E0',
          border: '1px solid #FFB74D',
          borderRadius: 2,
          p: 2,
        }}>
          <Typography variant="h6" sx={{ mb: 1, color: '#E65100', fontWeight: 600 }}>
            Note
          </Typography>
          <Typography variant="body2" sx={{ color: '#E65100', fontSize: '12px', lineHeight: 1.5 }}>
            <strong>*</strong> If this is checked, then all client treatments and client Lab Test Panels are available to a client assigned to this organization. If it is not checked, then not all Treatments and Lab Test Panels are available to clients assigned to this organization. In this case each Treatment (TreatsGroups/Treatments) or Lab Test (Admin/Lab Tests) must be individually set to allow access.
          </Typography>
          <Typography variant="body2" sx={{ color: '#E65100', fontSize: '12px', lineHeight: 1.5, mt: 1 }}>
            <strong>**</strong> When adding a new organization, no UA tests will be available. Add the organization, then go to the Admin/Lab Tests screen and enable the UA tests available to the new organization, then come back to the newly added organization (Admin/Organizations) specify the default UA tests.
          </Typography>
        </Box>
      </Box>

      {/* Sticky Footer */}
      <Box sx={{ 
        p: 3, 
        borderTop: '1px solid #E7E9EB',
        backgroundColor: '#FFFFFF',
        position: 'sticky',
        bottom: 0,
        zIndex: 1
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleSave}
            sx={{
              backgroundColor: '#439322',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 500,
              padding: '10px 20px',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#2C6E14',
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NewOrganizationSidebar;
