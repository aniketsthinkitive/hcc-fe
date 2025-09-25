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

// Organization form data interface
export interface OrganizationFormData {
  organizationName: string;
  organizationShortName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  faxNumber: string;
  contactPersonName: string;
  organizationTimeZone: string;
  usesDaylightSavings: boolean;
  allTreatmentsAvailable: boolean;
  attachComplianceReports: boolean;
  clientsVisibleToAllUsers: boolean;
  externalUsersCanManageVouchers: boolean;
  enableGrantFunding: boolean;
}