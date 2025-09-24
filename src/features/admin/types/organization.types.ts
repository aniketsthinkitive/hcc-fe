// Organization data interface
export interface OrganizationData {
  id: string;
  organization: string;
  status: 'active' | 'inactive';
  timeZone: string;
  usesDST: 'Y' | 'N';
  visibleToAllUsers: 'Y' | 'N';
  defaultPrimaryDrugTest: string;
  defaultAlternateDrugTest: string;
  numActiveClients: number;
  numTotalClients: number;
}
