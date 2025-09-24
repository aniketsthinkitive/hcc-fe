import React, { useState } from 'react';
import { Box, Portal } from '@mui/material';
import OfficeInformationHeader from '../components/OfficeInformationHeader';
import OfficeSearchFilter from '../components/OfficeSearchFilter';
import OfficeTableWithPagination from '../components/OfficeTableWithPagination';
import AddNewOfficeDrawer from '../components/AddNewOfficeDrawer';
import { type OfficeFormData } from '../components/AddNewOfficeForm';

const OfficeInformationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingOfficeData, setEditingOfficeData] = useState<Partial<OfficeFormData> | null>(null);

  const handleNewOffice = () => {
    setIsEditMode(false);
    setEditingOfficeData(null);
    setIsDrawerOpen(true);
  };

  const handleEditOffice = (officeId: string) => {
    // Here you would typically fetch the office data by ID
    // For now, we'll use mock data
    console.log('Editing office:', officeId);
    const mockOfficeData: Partial<OfficeFormData> = {
      officeShortName: 'Main Office',
      officeTimeZone: 'EST',
      phoneNumber: '(205) 555-0100',
      city: 'Birmingham',
      state: 'AL',
      zipCode: '35203',
      addressLine1: '123 Main Street',
    };
    
    setIsEditMode(true);
    setEditingOfficeData(mockOfficeData);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditMode(false);
    setEditingOfficeData(null);
  };

  const handleSubmitOffice = (data: OfficeFormData) => {
    console.log('Office data submitted:', data);
    // Here you would typically make an API call to save the office data
    // For now, we'll just log the data
    if (isEditMode) {
      console.log('Updating office:', data);
    } else {
      console.log('Creating new office:', data);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = () => {
    console.log('Filter button clicked');
    // Here you would typically open a filter modal or sidebar
  };

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '93vh', // Use full viewport height
        backgroundColor: '#F6F6F6', // Background/BG 1 from Figma
        overflow: 'hidden', // Prevent page-level scrolling
      }}
    >
      {/* Header with title and New Office button */}
      <OfficeInformationHeader onNewOffice={handleNewOffice} />

      {/* Divider line */}
      <Box
        sx={{
          height: '1px',
          backgroundColor: '#E7E9EB', // Border/02 from Figma
          flexShrink: 0, // Prevent shrinking
        }}
      />

      {/* Search and Filter Section */}
      <Box sx={{ flexShrink: 0 }}> {/* Prevent shrinking */}
        <OfficeSearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      </Box>

      {/* Table with Fixed Pagination */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0, // Allow flex child to shrink below content size
        }}
      >
        <OfficeTableWithPagination 
          searchTerm={searchTerm} 
          loading={loading}
          onEdit={handleEditOffice}
        />
      </Box>

    </Box>

    {/* Add/Edit Office Drawer - Rendered in Portal to ensure proper z-index */}
    <Portal>
      <AddNewOfficeDrawer
        open={isDrawerOpen}
        isEdit={isEditMode}
        initialData={editingOfficeData || undefined}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmitOffice}
      />
    </Portal>
    </>
  );
};

export default OfficeInformationPage;