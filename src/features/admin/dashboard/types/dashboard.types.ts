export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roleAccess?: string[];
}
