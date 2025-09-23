// Custom Table Component Exports
export { CustomTable } from './CustomTable';
export { CustomTableStyles, getBadgeStyle, formatCurrency, formatDate, formatPhone } from './CustomTable.styles';
export type {
  TableColumn,
  TableConfig,
  TableData,
  PaginationConfig,
  SortConfig,
  FilterConfig,
  ClientData,
  StatusBadgeConfig,
  AvatarConfig,
  ActionConfig,
  TableEventHandlers,
  TableTheme,
} from './types';
export { defaultTableTheme } from './types';

// Default export
export { CustomTable as default } from './CustomTable';
