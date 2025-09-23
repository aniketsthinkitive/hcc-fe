// TypeScript types for Custom Table component
import * as React from 'react';

export interface TableColumn<T = any> {
  key: keyof T | string;
  title: string;
  width?: string | number;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
}

export interface TableConfig {
  showCheckbox?: boolean;
  showActions?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  showRowsPerPage?: boolean;
  stickyHeader?: boolean;
  hoverable?: boolean;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

export interface TableData {
  [key: string]: any;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  pageSizeOptions?: number[];
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  key: string;
  value: any;
  operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
}

// Client-specific types based on the Figma design
export interface ClientData {
  id: string;
  clientId: string;
  name: string;
  email: string;
  avatar?: string;
  code: string;
  treatment: string;
  balanceDue: number;
  group: string;
  phoneNumber: string;
  dob: string;
  sex: string;
  status: 'intake' | 'active' | 'hold' | 'referral' | 'discharged' | 'pending';
  mlDoc: string;
  assignedOffice: string;
  primaryOrg: string;
}

// Status badge configuration
export interface StatusBadgeConfig {
  type: 'intake' | 'active' | 'hold' | 'referral' | 'discharged' | 'pending';
  label: string;
  color: string;
  backgroundColor: string;
  icon?: string;
}

// Avatar configuration for client rows
export interface AvatarConfig {
  src?: string;
  alt: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Action button configuration
export interface ActionConfig {
  type: 'menu' | 'button' | 'link';
  label?: string;
  icon?: string;
  onClick: (row: any, index: number) => void;
  disabled?: boolean;
  visible?: boolean;
}

// Table event handlers
export interface TableEventHandlers<T = any> {
  onRowSelect?: (selectedRows: T[]) => void;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onSort?: (sortConfig: SortConfig) => void;
  onFilter?: (filterConfig: FilterConfig[]) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

// Table theme configuration
export interface TableTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    borderLight: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Export default theme based on Figma design
export const defaultTableTheme: TableTheme = {
  colors: {
    primary: '#439322',
    secondary: '#757775',
    success: '#1AA23A',
    warning: '#BF550F',
    error: '#B51C1C',
    info: '#1859B4',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#2C2D2C',
    textSecondary: '#757775',
    border: '#DDE0DD',
    borderLight: '#F2F2F2',
  },
  typography: {
    fontFamily: 'Helvetica Neue, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '10px',
  },
  shadows: {
    sm: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    md: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 23, 40, 0.1)',
    lg: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};
