import React, { useState } from 'react';
import { Box } from '@mui/material';
import AllOrganizationsHeader from '../components/AllOrganizationsHeader';
import SearchFilterSection from '../components/SearchFilterSection';
import NewOrganizationSidebar from '../components/NewOrganizationSidebar';
import OrganizationsTable from '../components/OrganizationsTable';
import type { OrganizationData } from '../types/organization.types';

const AllOrganizations: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [organizations, setOrganizations] = useState<OrganizationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 8,
    totalRecords: 100,
    pageSize: 13,
  });

  const handleDownloadCSV = () => {
    console.log('Download CSV clicked');
    // TODO: Implement CSV download functionality
  };

  const handleNewOrganization = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // TODO: Implement search functionality
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
    // TODO: Implement filter functionality
  };

  const handleStatusToggle = (id: string, status: 'active' | 'inactive') => {
    console.log('Status toggle:', id, status);
    // TODO: Implement status toggle functionality
  };

  const handleActionClick = (action: string, id: string) => {
    console.log('Action clicked:', action, id);
    // TODO: Implement action functionality
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
    // TODO: Implement page change functionality
  };

  const handleRecordsPerPageChange = (size: number) => {
    setPagination(prev => ({ ...prev, pageSize: size, page: 0 }));
    // TODO: Implement records per page change functionality
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header Section */}
      <AllOrganizationsHeader
        onDownloadCSV={handleDownloadCSV}
        onNewOrganization={handleNewOrganization}
      />

      {/* Search and Filter Section */}
      <SearchFilterSection
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onFilterClick={handleFilterClick}
      />

      {/* Organizations Table */}
      <Box sx={{ mt: 3 }}>
        <OrganizationsTable
          data={organizations}
          loading={loading}
          onStatusToggle={handleStatusToggle}
          onActionClick={handleActionClick}
          pagination={{
            page: pagination.page,
            totalPages: pagination.totalPages,
            totalRecords: pagination.totalRecords,
            onPageChange: handlePageChange,
            onRecordsPerPageChange: handleRecordsPerPageChange,
          }}
        />
      </Box>

      {/* New Organization Sidebar */}
      <NewOrganizationSidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
      />
    </Box>
  );
};

export default AllOrganizations;
