import React, { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import ReferralTable from './ReferralTable';
import Paginator from '../../../components/pagination/pagination';
import referralData from '../../../constant/mock-data/ReferralData.json';

interface ReferralData {
  id: string;
  referralId: string;
  clientName: string;
  referringProvider: string;
  referralDate: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  serviceType: string;
  phoneNumber: string;
  email: string;
}

interface ReferralTableWithPaginationProps {
  searchTerm?: string;
  statusFilter?: string;
  loading?: boolean;
  onEdit?: (referralId: string) => void;
  onView?: (referralId: string) => void;
}

const ReferralTableWithPagination: React.FC<ReferralTableWithPaginationProps> = ({
  searchTerm = '',
  statusFilter = 'all',
  loading = false,
  onEdit,
  onView,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  // Filter data based on search term and status filter
  const filteredData = useMemo(() => {
    let filtered = referralData as ReferralData[];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(referral =>
        referral.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.referralId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.referringProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(referral => referral.status === statusFilter);
    }
    
    return filtered;
  }, [searchTerm, statusFilter]);

  // Paginate the filtered data
  const paginatedData = useMemo(() => {
    const startIndex = currentPage * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, recordsPerPage]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown> | null, page: number) => {
    setCurrentPage(page);
  };

  const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
    setRecordsPerPage(newRecordsPerPage);
    setCurrentPage(0); // Reset to first page when changing records per page
  };

  const handleStatusChange = (referralId: string, newStatus: string) => {
    console.log(`Referral ${referralId} status changed to ${newStatus}`);
    // Here you would typically make an API call to update the status
  };

  const handleEdit = (referralId: string) => {
    if (onEdit) {
      onEdit(referralId);
    }
  };

  const handleView = (referralId: string) => {
    if (onView) {
      onView(referralId);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        height: "100%",
        position: "relative",
        overflow: "hidden", // Prevent container from scrolling
      }}
    >
      {/* Table Container - Only this part scrolls */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          minHeight: 0, // Allow flex child to shrink
        }}
      >
        <ReferralTable
          data={paginatedData}
          loading={loading}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onView={handleView}
        />
      </Box>

      {/* Fixed Pagination at Bottom */}
      {!loading && filteredData.length > 0 && (
        <Box
          sx={{
            position: "static",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E7E9EB", // Border/02
            borderRadius: "0px 0px 10px 10px",
            zIndex: 1000,
            boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.1)", // Add shadow for better visibility
            marginTop: "-8px", // Move the pagination box up by 8px
          }}
        >
          <Paginator
            page={currentPage}
            totalPages={totalPages}
            totalRecord={filteredData.length}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
            defaultSize={recordsPerPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default ReferralTableWithPagination;
