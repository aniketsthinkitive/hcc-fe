import React, { useState } from 'react';
import { Box } from '@mui/material';
import DischargeStatusHeader from '../components/DischargeStatusHeader';
import DischargeStatusSearchFilter from '../components/DischargeStatusSearchFilter';
import DischargeStatusTableWithPagination from '../components/DischargeStatusTableWithPagination';
import AddNewDischargeModal from "../components/AddNewDischargeModal";
import { type CancellationChargeFormData } from '../components/AddNewDischargeModal';

const DischargeStatusPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingChargeData, setEditingChargeData] = useState<Partial<CancellationChargeFormData> | null>(null);

  const handleNewCharge = () => {
    setIsEditMode(false);
    setEditingChargeData(null);
    setIsModalOpen(true);
  };

  const handleEditCharge = (chargeId: string) => {
    // Here you would typically fetch the charge data by ID
    // For now, we'll use mock data
    console.log('Editing cancellation charge:', chargeId);
    const mockChargeData: Partial<CancellationChargeFormData> = {
      chargeName: 'Late Cancellation Fee',
    };
    
    setIsEditMode(true);
    setEditingChargeData(mockChargeData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingChargeData(null);
  };

  const handleSubmitCharge = (data: CancellationChargeFormData) => {
    console.log('Cancellation charge data submitted:', data);
    // Here you would typically make an API call to save the charge data
    // For now, we'll just log the data
    if (isEditMode) {
      console.log('Updating cancellation charge:', data);
    } else {
      console.log('Creating new cancellation charge:', data);
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
          display: "flex",
          flexDirection: "column",
          height: "93vh", // Use full viewport height
          backgroundColor: "#F6F6F6", // Background/BG 1 from Figma
          overflow: "hidden", // Prevent page-level scrolling
        }}
      >
        {/* Header with title and New Charge button */}
        <DischargeStatusHeader onNewCharge={handleNewCharge} />

        {/* Divider line */}
        <Box
          sx={{
            height: "1px",
            backgroundColor: "#E7E9EB", // Border/02 from Figma
            flexShrink: 0, // Prevent shrinking
          }}
        />

        {/* Search and Filter Section */}
        <Box sx={{ flexShrink: 0 }}>
          {" "}
          {/* Prevent shrinking */}
          <DischargeStatusSearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
          />
        </Box>

        {/* Table with Fixed Pagination */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0, // Allow flex child to shrink below content size
          }}
        >
          <DischargeStatusTableWithPagination
            searchTerm={searchTerm}
            loading={loading}
            onEdit={handleEditCharge}
          />
        </Box>
      </Box>

      {/* Add/Edit Cancellation Charge Modal */}
      <AddNewDischargeModal
        open={isModalOpen}
        isEdit={isEditMode}
        initialData={editingChargeData || undefined}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCharge}
      />
    </>
  );
};

export default DischargeStatusPage;
