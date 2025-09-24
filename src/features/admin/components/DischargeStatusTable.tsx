import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  Switch,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  heading,
  tableCellCss,
  primaryTextCss,
  tableContainerCss,
} from '../../../components/common-table/widgets/common-table-widgets';
import TableSkeleton from '../../../components/common-table/TableSkeleton';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

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

interface DischargeStatusTableProps {
  data?: CancellationChargeData[];
  loading?: boolean;
  onStatusChange?: (chargeId: string, newStatus: 'active' | 'inactive') => void;
  onEdit?: (chargeId: string) => void;
  onArchive?: (chargeId: string) => void;
}

const tableHeaders = [
  { id: "discharge_status", label: "Discharge Status", width: "500px" },
  { id: "actions", label: "Action", width: "100px" },
];

const DischargeStatusTable: React.FC<DischargeStatusTableProps> = ({
  data = [],
  loading = false,
  onEdit,
}) => {
  const [tableData, setTableData] = useState<CancellationChargeData[]>(data);

  useEffect(() => {
    if (!loading) {
      setTableData(data);
    }
  }, [data, loading]);


  const handleEdit = () => {
    onEdit();
   //Edit code
  };

  // Show skeleton loader when loading
  if (loading) {
    return (
      <Paper sx={{ overflow: 'hidden' }}>
        <TableSkeleton 
          headers={tableHeaders}
          rowCount={5}
          hasCheckbox={false}
          hasAvatar={false}
          hasActions={true}
        />
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: "hidden", height: "100%" }}>
      <TableContainer
        sx={{
          height: "100%",
          "& .MuiTable-root": {
            borderCollapse: "separate",
            borderSpacing: 0,
          },
          "& .MuiTableHead-root": {
            "& .MuiTableCell-root": {
              backgroundColor: "#F2F2F2", // Neutral/5
              borderBottom: "1px solid #E2E5E8", // Neutral/10
            },
          },
          "& .MuiTableBody-root": {
            "& .MuiTableRow-root": {
              "&:hover": {
                backgroundColor: "rgba(67, 147, 34, 0.02)", // Subtle hover effect
              },
            },
            "& .MuiTableCell-root": {
              borderBottom: "1px solid #F2F2F2", // Neutral/5
            },
          },
        }}
      >
        <Table aria-label="cancellation charge table" sx={tableCellCss}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{
                    ...heading,
                    width: header.width,
                    minWidth: header.width,
                  }}
                  align="left"
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "1.2",
                      color: "#757775", // Neutral/60
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {header.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  <Typography
                    sx={{
                      padding: "40px 0",
                      color: "#989998", // Neutral/50
                      fontSize: "14px",
                    }}
                  >
                    No cancellation charges available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((row) => (
                <TableRow key={row.id}>
                  {/* Charge Name Column */}
                  <TableCell sx={heading} align="left">
                    <Typography sx={primaryTextCss}>
                      {row.chargeName}
                    </Typography>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell sx={heading} align="left">
                    <IconButton
                      onClick={() => handleEdit()}
                      sx={{
                        padding: "4px",
                        borderRadius: "6px",
                        "&:hover": {
                          backgroundColor: "rgba(67, 147, 34, 0.04)",
                        },
                      }}
                    >
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DischargeStatusTable;
