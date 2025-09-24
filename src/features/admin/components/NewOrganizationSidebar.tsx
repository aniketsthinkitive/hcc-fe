import React, { useState, useEffect } from 'react';
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
import type { OrganizationData } from '../types/organization.types';

interface NewOrganizationSidebarProps {
  open: boolean;
  onClose: () => void;
  editingData?: OrganizationData | null;
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

const NewOrganizationSidebar: React.FC<NewOrganizationSidebarProps> = ({ open, onClose, editingData }) => {
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

  // Populate form when editing data is provided
  useEffect(() => {
    console.log('Sidebar editingData changed:', editingData);
    if (editingData) {
      console.log('Populating form with editing data');
      setFormData({
        organizationShortName: editingData.organization || '',
        organizationTimeZone: editingData.timeZone || '',
        allTreatmentsAvailable: false, // Default values for checkboxes
        usesDaylightSavings: editingData.usesDST === 'Y',
        attachComplianceReports: false,
        organizationName: editingData.organization || '',
        addressLine1: '', // These would need to be added to OrganizationData interface
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
        faxNumber: '',
        contactPersonName: '',
        clientsVisibleToAllUsers: editingData.visibleToAllUsers === 'Y',
        externalUsersCanManageVouchers: false,
        enableGrantFunding: false,
      });
    } else {
      // Reset form for new organization
      setFormData({
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
    }
  }, [editingData]);

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
          width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
          maxWidth: { xs: '100%', sm: '600px', md: '700px' },
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
        p: { xs: 2, sm: 3 }, 
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
            {editingData ? 'Edit Organization' : 'Add New Organization'}
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
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 3 }
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

            <Box sx={{ 
              width: { xs: '100%', sm: '50%', md: '40%' },
              minWidth: { xs: '100%', sm: '200px' }
            }}>
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

            {/* Address Line 1 and 2 - Horizontal layout */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2 
            }}>
              <Box sx={{ flex: 1 }}>
                <CustomLabel label="Address Line 1" isRequired />
                <CustomInput
                  name="addressLine1"
                  placeholder="Enter Address Line 1"
                  value={formData.addressLine1}
                  onChange={handleInputChange('addressLine1')}
                  required
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <CustomLabel label="Address Line 2" />
                <CustomInput
                  name="addressLine2"
                  placeholder="Enter Address Line 2"
                  value={formData.addressLine2}
                  onChange={handleInputChange('addressLine2')}
                />
              </Box>
            </Box>

            {/* City, State, Zip - Uniform width and equal spacing */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2 
            }}>
              <Box sx={{ flex: 1 }}>
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
              <CustomLabel label="Contact Person Name" isRequired />
              <CustomInput
                name="contactPersonName"
                placeholder="eg. John Doe"
                value={formData.contactPersonName}
                onChange={handleInputChange('contactPersonName')}
                required
              />
            </Box>

            {/* Phone and Fax - Horizontal layout */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2 
            }}>
              <Box sx={{ flex: 1 }}>
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
              <Box sx={{ flex: 1 }}>
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

      </Box>

      {/* Sticky Footer */}
      <Box sx={{ 
        p: { xs: 2, sm: 3 }, 
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
