import React, { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import DischargeStatusTable from './DischargeStatusTable';
import Paginator from '../../../components/pagination/pagination';
import cancellationChargeData from '../../../constant/mock-data/CancellationChargeData.json';

interface CancellationChargeData {
  id: string;
  chargeName: string;
  chargeType: 'fixed' | 'percentage';
  amount: number;
  description: string;
  status: 'active' | 'inactive';
  createdDate: string;
  lastModified: string;
}

interface DischargeStatusTableWithPaginationProps {
  searchTerm?: string;
  loading?: boolean;
  onEdit?: (chargeId: string) => void;
}

const DischargeStatusTableWithPagination: React.FC<DischargeStatusTableWithPaginationProps> = ({
  searchTerm = '',
  loading = false,
  onEdit,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return cancellationChargeData as CancellationChargeData[];
    
    return (cancellationChargeData as CancellationChargeData[]).filter(charge =>
      charge.chargeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.chargeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.amount.toString().includes(searchTerm)
    );
  }, [searchTerm]);

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

  const handleStatusChange = (chargeId: string, newStatus: 'active' | 'inactive') => {
    console.log(`Cancellation charge ${chargeId} status changed to ${newStatus}`);
    // Here you would typically make an API call to update the status
  };

  const handleEdit = (chargeId: string) => {
    if (onEdit) {
      onEdit(chargeId);
    }
  };

  const handleArchive = (chargeId: string) => {
    console.log(`Archive cancellation charge ${chargeId}`);
    // Here you would typically show a confirmation dialog and then archive the charge
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
        <DischargeStatusTable
          data={paginatedData}
          loading={loading}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onArchive={handleArchive}
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

export default DischargeStatusTableWithPagination;
