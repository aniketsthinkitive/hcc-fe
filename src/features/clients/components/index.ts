// Export all client components
export { default as ClientHeader } from './ClientHeader/ClientHeader';
export { default as FilterTabs } from './FilterTabs/FilterTabs';
export { default as ClientTable } from './ClientTable/ClientTable';
export { default as StatusBadge } from './StatusBadge/StatusBadge';

// Export types
export type { ClientData, ClientTableProps } from './ClientTable/types';
export type { ClientStatus } from './StatusBadge/StatusBadge';
export type { FilterTab, FilterTabsProps } from './FilterTabs/FilterTabs';
export type { ClientHeaderProps } from './ClientHeader/ClientHeader';
