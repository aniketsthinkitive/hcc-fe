import {
  Box,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import {
  paginatorContainerStyles,
  paginationControlsStyles,
  paginationMainStyles,
  paginationItemStyles,
  navigationButtonStyles,
  recordsSelectStyles,
  entriesTextStyles,
  rowsPerPageContainerStyles,
  rowsPerPageLabelStyles,
} from "./pagination-styles";

export type PaginatorProps = {
  page: number;
  totalPages: number;
  totalRecord: number;
  onPageChange: (event: ChangeEvent<unknown> | null, page: number) => void;
  onRecordsPerPageChange?: (recordsPerPage: number) => void;
  defaultSize?: number;
};

const Paginator = (props: PaginatorProps) => {
  const { onPageChange, onRecordsPerPageChange, defaultSize, totalRecord } =
    props;

  const [page, setPage] = useState(props.page);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(props.totalPages);

  useEffect(() => {
    if (defaultSize) {
      setSize(defaultSize);
    }
  }, [defaultSize]);

  useEffect(() => {
    setTotalPages(props.totalPages);
    console.log("total pages", props.totalPages);
  }, [props.totalPages]);

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);

  const startRecord = page * size + 1;
  const endRecord = Math.min((page + 1) * size, totalRecord);

  return (
    <>
      {totalPages !== 0 && (
        <Box sx={paginatorContainerStyles}>
          <Box>
            <Typography sx={entriesTextStyles}>
              Showing {startRecord} to {endRecord} of {totalRecord} entries
            </Typography>
          </Box>
          <Box sx={paginationControlsStyles}>
            {onRecordsPerPageChange && (
              <Box sx={rowsPerPageContainerStyles}>
                <Typography sx={rowsPerPageLabelStyles}>
                  Rows per page:
                </Typography>
                <Select
                  size="small"
                  value={size}
                  onChange={(e) => {
                    onRecordsPerPageChange(+e.target.value);
                    onPageChange(null, 0);
                    setSize(e.target.value as number);
                  }}
                  sx={recordsSelectStyles}
                  variant="standard"
                  disableUnderline
                >
                  <MenuItem value={5}>05</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </Box>
            )}
            <Box sx={paginationMainStyles}>
              <Pagination
                page={page}
                count={totalPages}
                variant="text"
                shape="rounded"
                renderItem={(item) => (
                  <PaginationItem
                    sx={
                      (item.type === "previous" || item.type === "next"
                        ? navigationButtonStyles
                        : paginationItemStyles) as SxProps<Theme>
                    }
                    components={{
                      previous: PreviousBtn,
                      next: NextBtn,
                    }}
                    {...item}
                  />
                )}
                onChange={(e, page) => onPageChange(e, +page - 1)}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Paginator;

const PreviousBtn = () => {
  return (
    <ChevronLeft
      sx={{
        width: "18px",
        height: "18px",
        fill: "#4D4F4D", // Neutral/90 from Figma
      }}
    />
  );
};

const NextBtn = () => {
  return (
    <ChevronRight
      sx={{
        width: "18px",
        height: "18px",
        fill: "#4D4F4D", // Neutral/90 from Figma
      }}
    />
  );
};
