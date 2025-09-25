import React, { useState } from 'react';
import { Box, Portal } from '@mui/material';
import { 
  ReferralHeader, 
  ReferralSearchFilter, 
  ReferralTableWithPagination 
} from '../components';

const ReferralPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading] = useState(false);

  const handleNewReferral = () => {
    console.log('New referral button clicked');
    // Here you would typically open a new referral form or drawer
  };

  const handleEditReferral = (referralId: string) => {
    console.log('Editing referral:', referralId);
    // Here you would typically open an edit form or drawer
  };

  const handleViewReferral = (referralId: string) => {
    console.log('Viewing referral:', referralId);
    // Here you would typically open a view modal or navigate to details page
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
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
        {/* Header with title and New Referral button */}
        <ReferralHeader onNewReferral={handleNewReferral} />

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
          <ReferralSearchFilter 
            onSearch={handleSearch} 
            onStatusChange={handleStatusFilter}
            onFilter={handleFilter} 
          />
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
          <ReferralTableWithPagination 
            searchTerm={searchTerm} 
            statusFilter={statusFilter}
            loading={loading}
            onEdit={handleEditReferral}
            onView={handleViewReferral}
          />
        </Box>
      </Box>
    </>
  );
};

export default ReferralPage;