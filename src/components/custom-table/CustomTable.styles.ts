// Custom Table Styles based on Figma Design
export const CustomTableStyles = {
  // Main container
  tableContainer: `
    background: #FFFFFF;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    border: 1px solid #E7E9EB;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,

  // Table wrapper for horizontal scroll
  tableWrapper: `
    overflow-x: auto;
    overflow-y: hidden;
    background: #FFFFFF;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    /* Responsive column hiding */
    @media (max-width: 1024px) {
      .hide-on-tablet {
        display: none !important;
      }
    }
    
    @media (max-width: 768px) {
      .hide-on-mobile {
        display: none !important;
      }
      
      /* Mobile table adjustments */
      table {
        min-width: 600px;
      }
    }
    
    @media (max-width: 480px) {
      /* Small mobile adjustments */
      table {
        min-width: 500px;
      }
    }
  `,

  // Main table
  table: `
    width: 100%;
    border-collapse: collapse;
    font-family: 'Helvetica Neue', sans-serif;
    table-layout: fixed;
  `,

  // Table header
  tableHead: `
    background: #F2F2F2;
    border-bottom: 1px solid #E2E5E8;
  `,

  // Sticky column styles
  stickyLeft: `
    position: sticky;
    left: 0;
    z-index: 5;
    background: inherit;
  `,

  stickyRight: `
    position: sticky;
    right: 0;
    z-index: 5;
    background: inherit;
  `,

  stickyHeaderLeft: `
    position: sticky;
    left: 0;
    z-index: 15;
    background: #F2F2F2;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  `,

  stickyHeaderLeftSecond: `
    position: sticky;
    left: 100px;
    z-index: 15;
    background: #F2F2F2;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  `,

  stickyHeaderRight: `
    position: sticky;
    right: 0;
    z-index: 15;
    background: #F2F2F2;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  `,

  stickyCellLeft: `
    position: sticky;
    left: 0;
    z-index: 5;
    background: #FFFFFF;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  `,

  stickyCellLeftSecond: `
    position: sticky;
    left: 100px;
    z-index: 5;
    background: #FFFFFF;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  `,

  stickyCellRight: `
    position: sticky;
    right: 0;
    z-index: 5;
    background: #FFFFFF;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  `,

  stickyHeader: `
    position: sticky;
    top: 0;
    z-index: 10;
  `,

  tableHeadRow: `
    height: 40px;
  `,

  tableHeaderCell: `
    padding: 8px 16px;
    text-align: left;
    border-right: 1px solid #E2E5E8;
    background: #F2F2F2;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
  `,

  // Wider columns (like Treatment, Client Name) get more padding
  tableHeaderCellWide: `
    padding: 8px 24px;
    text-align: left;
    border-right: 1px solid #E2E5E8;
    background: #F2F2F2;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
  `,

  sortableHeader: `
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
    
    &:hover {
      background: #E7E9EB;
    }
  `,

  headerContent: `
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  headerText: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.2;
    color: #757775;
    text-transform: uppercase;
    letter-spacing: 0.8%;
  `,

  sortIcon: `
    font-size: 12px;
    color: #757775;
    margin-left: 4px;
  `,

  // Table body
  tableBody: `
    background: #FFFFFF;
  `,

  tableRow: `
    height: 44px;
    border-bottom: 1px solid #F2F2F2;
    transition: background-color 0.2s ease;
  `,

  hoverableRow: `
    cursor: pointer;
    
    &:hover {
      background: #F9FAF9;
    }
  `,

  tableCell: `
    padding: 12px 16px;
    border-right: 1px solid #F2F2F2;
    vertical-align: middle;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 1.15;
    color: #2C2D2C;
  `,

  // Wider columns get more padding
  tableCellWide: `
    padding: 12px 24px;
    border-right: 1px solid #F2F2F2;
    vertical-align: middle;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 1.15;
    color: #2C2D2C;
  `,

  cellText: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.15;
    color: #2C2D2C;
    letter-spacing: 0.8%;
  `,

  // Checkbox styles
  checkboxContainer: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  checkbox: `
    width: 16px;
    height: 16px;
    border: 1px solid #A9ACA9;
    border-radius: 4px;
    background: #FFFFFF;
    cursor: pointer;
    appearance: none;
    position: relative;
    
    &:checked {
      background: #439322;
      border-color: #439322;
    }
    
    &:checked::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 10px;
      font-weight: bold;
    }
    
    &:indeterminate {
      background: #439322;
      border-color: #439322;
    }
    
    &:indeterminate::after {
      content: '−';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  `,

  // Action button
  actionButton: `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
      background: #F2F2F2;
    }
  `,

  actionIcon: `
    font-size: 16px;
    color: #2C2D2C;
    font-weight: bold;
  `,

  // Empty state
  emptyRow: `
    height: 200px;
  `,

  emptyCell: `
    text-align: center;
    vertical-align: middle;
    border: none;
  `,

  emptyMessage: `
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    color: #757775;
  `,

  // Loading state
  loadingContainer: `
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    background: #FAFAFA;
    border-radius: 10px;
  `,

  loadingSpinner: `
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    color: #757775;
  `,

  // Pagination - Updated to match Figma design
  paginationContainer: `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8px 12px 16px;
    background: #FFFFFF;
    border-top: 1px solid #E7E9EB;
    border-radius: 0 0 10px 10px;
    gap: 16px;
    margin-top: auto;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;
      padding: 12px;
    }
    
    @media (max-width: 480px) {
      padding: 8px;
      gap: 8px;
    }
  `,

  paginationInfo: `
    display: flex;
    align-items: center;
  `,

  paginationText: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.2;
    color: #2C2D2C;
  `,

  paginationControls: `
    display: flex;
    align-items: center;
    gap: 16px;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
    
    @media (max-width: 480px) {
      gap: 8px;
    }
  `,

  rowsPerPageContainer: `
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 4px;
    background: #FFFFFF;
    border-radius: 2px;
    width: 135px;
    
    @media (max-width: 480px) {
      width: 120px;
    }
  `,

  rowsPerPageText: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.2;
    color: #2C2D2C;
  `,

  rowsPerPageSelect: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.2;
    color: #2C2D2C;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  `,

  paginationButtons: `
    display: flex;
    align-items: center;
    gap: 6px;
    
    @media (max-width: 480px) {
      gap: 4px;
    }
  `,

  paginationButton: `
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Figtree', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.66;
    color: #202120;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background: #F2F2F2;
    }
    
    @media (max-width: 480px) {
      width: 36px;
      height: 36px;
      font-size: 11px;
    }
  `,

  paginationButtonActive: `
    background: #EFFFE3;
    color: #439322;
    font-weight: 500;
    border-radius: 100px;
  `,

  paginationButtonDisabled: `
    opacity: 0.38;
    cursor: not-allowed;
    color: #4D4F4D;
  `,

  // Special cell styles for different data types
  avatarCell: `
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  avatar: `
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  `,

  avatarContent: `
    display: flex;
    flex-direction: column;
    gap: 2px;
  `,

  avatarName: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    color: #439322;
  `,

  avatarEmail: `
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.2;
    color: #989998;
  `,

  // Badge styles for status
  badge: `
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px 2px 8px;
    border-radius: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.2;
  `,

  badgeIntake: `
    background: #DBEAFF;
    color: #1859B4;
  `,

  badgeActive: `
    background: #EFFFE3;
    color: #1AA23A;
  `,

  badgeHold: `
    background: #FFF0F0;
    color: #B51C1C;
  `,

  badgeReferral: `
    background: #D8FDFD;
    color: #067A7A;
  `,

  badgeDischarged: `
    background: #F2F2F2;
    color: #757775;
  `,

  badgePending: `
    background: #FAE7DB;
    color: #BF550F;
  `,

  badgeIcon: `
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  // Currency formatting
  currency: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.15;
    color: #2C2D2C;
  `,

  // Date formatting
  date: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.15;
    color: #2C2D2C;
  `,

  // Phone number formatting
  phone: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.15;
    color: #2C2D2C;
  `,

  // ID formatting
  id: `
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.15;
    color: #2C2D2C;
  `,
};

// Helper function to get badge style based on status
export const getBadgeStyle = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'intake':
      return `${CustomTableStyles.badge} ${CustomTableStyles.badgeIntake}`;
    case 'active':
      return `${CustomTableStyles.badge} ${CustomTableStyles.badgeActive}`;
    case 'hold':
      return `${CustomTableStyles.badge} ${CustomTableStyles.badgeHold}`;
    case 'referral':
      return `${CustomTableStyles.badge} ${CustomTableStyles.badgeReferral}`;
    case 'discharged':
      return `${CustomTableStyles.badge} ${CustomTableStyles.badgeDischarged}`;
    case 'pending':
      return `${CustomTableStyles.badge} ${CustomTableStyles.badgePending}`;
    default:
      return `${CustomTableStyles.badge} ${CustomTableStyles.badgeDischarged}`;
  }
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Helper function to format date
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(dateObj);
};

// Helper function to format phone number
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};
