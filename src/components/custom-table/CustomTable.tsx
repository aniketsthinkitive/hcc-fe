import { useState, useMemo } from 'react';
import { CustomTableStyles } from './CustomTable.styles';
import type { TableColumn, TableConfig } from './types';

interface CustomTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  config?: TableConfig;
  onRowSelect?: (selectedRows: T[]) => void;
  onRowClick?: (row: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export const CustomTable = <T extends Record<string, any>>({
  data,
  columns,
  config = {},
  onRowSelect,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}: CustomTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const {
    showCheckbox = true,
    showActions = true,
    showPagination = true,
    pageSize = 10,
    showRowsPerPage = true,
    stickyHeader = true,
    hoverable = true,
  } = config;

  // Handle row selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = new Set(data.map((_, index) => index));
      setSelectedRows(allIndices);
      onRowSelect?.(data);
    } else {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    }
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
    
    const selectedData = data.filter((_, i) => newSelected.has(i));
    onRowSelect?.(selectedData);
  };

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const isAllSelected = selectedRows.size === data.length && data.length > 0;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length;

  if (loading) {
    return (
      <div className={CustomTableStyles.loadingContainer}>
        <div className={CustomTableStyles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`${CustomTableStyles.tableContainer} ${className}`}>
      <div className={CustomTableStyles.tableWrapper}>
        <table className={CustomTableStyles.table}>
          <thead className={`${CustomTableStyles.tableHead} ${stickyHeader ? CustomTableStyles.stickyHeader : ''}`}>
            <tr className={CustomTableStyles.tableHeadRow}>
              {showCheckbox && (
                <th className={CustomTableStyles.tableHeaderCell}>
                  <div className={CustomTableStyles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isIndeterminate;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className={CustomTableStyles.checkbox}
                    />
                  </div>
                </th>
              )}
              {columns.map((column, index) => {
                // Determine if this is a wide column that needs more padding
                const isWideColumn = column.width && (
                  typeof column.width === 'string' && parseInt(column.width) > 150 ||
                  typeof column.width === 'number' && column.width > 150
                );
                
                // Determine sticky classes and positioning
                let stickyClass = '';
                let stickyStyle: React.CSSProperties = {};
                
                if (column.fixed === 'left') {
                  // Calculate left offset for multiple left sticky columns
                  const leftStickyColumns = columns.filter((col, idx) => idx < index && col.fixed === 'left');
                  const leftOffset = leftStickyColumns.reduce((offset, col) => {
                    const width = typeof col.width === 'string' ? parseInt(col.width) : (col.width || 100);
                    return offset + width;
                  }, 0);
                  
                  stickyClass = CustomTableStyles.stickyHeaderLeft;
                  stickyStyle.left = leftOffset;
                } else if (column.fixed === 'right') {
                  stickyClass = CustomTableStyles.stickyHeaderRight;
                }
                
                return (
                  <th
                    key={String(column.key)}
                    className={`${isWideColumn ? CustomTableStyles.tableHeaderCellWide : CustomTableStyles.tableHeaderCell} ${column.sortable ? CustomTableStyles.sortableHeader : ''} ${stickyClass} ${column.className || ''}`}
                    onClick={() => column.sortable && handleSort(String(column.key))}
                    style={{ width: column.width, ...stickyStyle }}
                  >
                    <div className={CustomTableStyles.headerContent}>
                      <span className={CustomTableStyles.headerText}>{column.title}</span>
                      {column.sortable && (
                        <span className={CustomTableStyles.sortIcon}>
                          {sortConfig?.key === column.key ? (
                            sortConfig.direction === 'asc' ? '↑' : '↓'
                          ) : (
                            '↕'
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
              {showActions && (
                <th className={CustomTableStyles.tableHeaderCell}>
                  <span className={CustomTableStyles.headerText}>Action</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className={CustomTableStyles.tableBody}>
            {paginatedData.length === 0 ? (
              <tr className={CustomTableStyles.emptyRow}>
                <td
                  colSpan={columns.length + (showCheckbox ? 1 : 0) + (showActions ? 1 : 0)}
                  className={CustomTableStyles.emptyCell}
                >
                  <div className={CustomTableStyles.emptyMessage}>{emptyMessage}</div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`${CustomTableStyles.tableRow} ${hoverable ? CustomTableStyles.hoverableRow : ''}`}
                  onClick={() => onRowClick?.(row, startIndex + index)}
                >
                  {showCheckbox && (
                    <td className={CustomTableStyles.tableCell}>
                      <div className={CustomTableStyles.checkboxContainer}>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(startIndex + index)}
                          onChange={(e) => handleSelectRow(startIndex + index, e.target.checked)}
                          className={CustomTableStyles.checkbox}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                  )}
                {columns.map((column, colIndex) => {
                  // Determine if this is a wide column that needs more padding
                  const isWideColumn = column.width && (
                    typeof column.width === 'string' && parseInt(column.width) > 150 ||
                    typeof column.width === 'number' && column.width > 150
                  );
                  
                  // Determine sticky classes and positioning
                  let stickyClass = '';
                  let stickyStyle: React.CSSProperties = {};
                  
                  if (column.fixed === 'left') {
                    // Calculate left offset for multiple left sticky columns
                    const leftStickyColumns = columns.filter((col, idx) => idx < colIndex && col.fixed === 'left');
                    const leftOffset = leftStickyColumns.reduce((offset, col) => {
                      const width = typeof col.width === 'string' ? parseInt(col.width) : (col.width || 100);
                      return offset + width;
                    }, 0);
                    
                    stickyClass = CustomTableStyles.stickyCellLeft;
                    stickyStyle.left = leftOffset;
                  } else if (column.fixed === 'right') {
                    stickyClass = CustomTableStyles.stickyCellRight;
                  }
                  
                  return (
                    <td
                      key={String(column.key)}
                      className={`${isWideColumn ? CustomTableStyles.tableCellWide : CustomTableStyles.tableCell} ${stickyClass} ${column.className || ''}`}
                      style={{ width: column.width, ...stickyStyle }}
                    >
                      {column.render ? (
                        column.render(row[column.key], row, startIndex + index)
                      ) : (
                        <span className={CustomTableStyles.cellText}>
                          {row[column.key] || '-'}
                        </span>
                      )}
                    </td>
                  );
                })}
                  {showActions && (
                    <td className={CustomTableStyles.tableCell}>
                      <div className={CustomTableStyles.actionButton}>
                        <span className={CustomTableStyles.actionIcon}>⋮</span>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className={CustomTableStyles.paginationContainer}>
          <div className={CustomTableStyles.paginationInfo}>
            <span className={CustomTableStyles.paginationText}>
              Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
            </span>
          </div>
          
          <div className={CustomTableStyles.paginationControls}>
            {showRowsPerPage && (
              <div className={CustomTableStyles.rowsPerPageContainer}>
                <span className={CustomTableStyles.rowsPerPageText}>Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={() => {
                    // Handle page size change
                    setCurrentPage(1);
                  }}
                  className={CustomTableStyles.rowsPerPageSelect}
                >
                  <option value={5}>05</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            )}

            <div className={CustomTableStyles.paginationButtons}>
              <button
                className={`${CustomTableStyles.paginationButton} ${currentPage === 1 ? CustomTableStyles.paginationButtonDisabled : ''}`}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ←
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`${CustomTableStyles.paginationButton} ${currentPage === pageNum ? CustomTableStyles.paginationButtonActive : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                className={`${CustomTableStyles.paginationButton} ${currentPage === totalPages ? CustomTableStyles.paginationButtonDisabled : ''}`}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
