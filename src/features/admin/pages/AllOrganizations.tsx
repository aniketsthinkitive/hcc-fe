import React, { useState } from 'react';
import { Box } from '@mui/material';
import AllOrganizationsHeader from '../components/AllOrganizationsHeader';
import OrganizationSearchFilter from '../components/OrganizationSearchFilter';
import NewOrganizationModal from '../components/NewOrganizationModal';
import OrganizationsTable from '../components/OrganizationsTable';
import Paginator from '../../../components/pagination/pagination';
import type { OrganizationData, OrganizationFormData } from '../types/organization.types';

const AllOrganizations: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [organizations, setOrganizations] = useState<OrganizationData[]>([
    {
      id: '1',
      organization: '10th JD El Paso',
      status: 'active',
      timeZone: 'Mountain',
      usesDST: 'Y',
      visibleToAllUsers: 'N',
      defaultPrimaryDrugTest: '-',
      defaultAlternateDrugTest: '-',
      numActiveClients: 100,
      numTotalClients: 100,
    },
    {
      id: '2',
      organization: '11th JD',
      status: 'inactive',
      timeZone: 'Hawaii',
      usesDST: 'N',
      visibleToAllUsers: 'Y',
      defaultPrimaryDrugTest: '-',
      defaultAlternateDrugTest: '-',
      numActiveClients: 73,
      numTotalClients: 73,
    },
    {
      id: '3',
      organization: '12th JD',
      status: 'active',
      timeZone: 'Mountain',
      usesDST: 'Y',
      visibleToAllUsers: 'N',
      defaultPrimaryDrugTest: '-',
      defaultAlternateDrugTest: '-',
      numActiveClients: 89,
      numTotalClients: 89,
    },
  ]);
  const [loading] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState<OrganizationData | null>(null);
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
    setEditingOrganization(null);
    setModalOpen(true);
  };

  const handleEditOrganization = (id: string) => {
    console.log('Edit organization clicked:', id);
    // Find the organization to edit
    const orgToEdit = organizations.find(org => org.id === id);
    console.log('Found organization to edit:', orgToEdit);
    if (orgToEdit) {
      setEditingOrganization(orgToEdit);
      setModalOpen(true);
    }
  };

  const handleArchiveOrganization = (id: string) => {
    console.log('Archive organization:', id);
    // TODO: Implement archive functionality
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingOrganization(null);
  };

  const handleOrganizationSubmit = (data: OrganizationFormData) => {
    console.log('Organization form submitted:', data);
    // TODO: Implement organization creation/update logic
    // For now, just close the modal
    handleCloseModal();
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // TODO: Implement search functionality
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    // TODO: Implement status filter functionality
  };

  const handleStatusToggle = (id: string, status: 'active' | 'inactive') => {
    console.log('Status toggle:', id, status);
    setOrganizations(prev => 
      prev.map(org => 
        org.id === id ? { ...org, status } : org
      )
    );
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
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      overflow: 'auto'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        width: '100%',
        overflow: 'visible',
        flexShrink: 0
      }}>
        <AllOrganizationsHeader
          onDownloadCSV={handleDownloadCSV}
          onNewOrganization={handleNewOrganization}
        />

        {/* Search and Filter Section */}
        <OrganizationSearchFilter
          onSearch={handleSearchChange}
          onStatusChange={handleStatusFilterChange}
        />
      </Box>

      {/* Organizations Table - Responsive */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <OrganizationsTable
          data={organizations}
          loading={loading}
          onStatusToggle={handleStatusToggle}
          onEditClick={handleEditOrganization}
          onArchiveClick={handleArchiveOrganization}
        />
      </Box>

      {/* Pagination - Sticky at Bottom */}
      <Box sx={{ 
        position: 'sticky', 
        bottom: 0, 
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E7E9EB',
        zIndex: 10,
        width: '100%',
        padding: { xs: 1, sm: 2 }
      }}>
        <Paginator
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalRecord={pagination.totalRecords}
          onPageChange={(_, page) => handlePageChange(page)}
          onRecordsPerPageChange={handleRecordsPerPageChange}
          defaultSize={13}
        />
      </Box>

      {/* New Organization Modal */}
      <NewOrganizationModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleOrganizationSubmit}
        initialData={editingOrganization ? {
          organizationName: editingOrganization.organization,
          organizationShortName: editingOrganization.organization,
          organizationTimeZone: editingOrganization.timeZone,
          usesDaylightSavings: editingOrganization.usesDST === 'Y',
          clientsVisibleToAllUsers: editingOrganization.visibleToAllUsers === 'Y',
        } : undefined}
        isEdit={!!editingOrganization}
      />
    </Box>
  );
};

export default AllOrganizations;
