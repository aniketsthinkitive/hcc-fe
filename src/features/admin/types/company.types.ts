export interface CompanyInformation {
  id: string;
  companyName: string;
  companyShortName: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phoneNumber: string;
    faxNumber?: string;
    email: string;
    website?: string;
  };
  referral: {
    email: string;
  };
  business: {
    taxId: string;
    licenseNumber: string;
    npiNumber?: string;
    taxonomyCode?: string;
    stateId?: string;
    timeZone: string;
    usesDST: boolean;
  };
  calendar: {
    startTime: string;
    endTime: string;
  };
  settings: {
    defaultCurrency: string;
    dateFormat: string;
    timeFormat: string;
    language: string;
    defaultClientReceiptType?: string;
    daysBackCallIn?: number;
    daysMustCallIn?: number;
    dateNoteTrackingEnabled?: string;
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CompanyFormData {
  companyName: string;
  companyShortName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentAddressLine1: string;
  paymentAddressLine2?: string;
  paymentCity: string;
  paymentState: string;
  paymentZipCode: string;
  paymentCountry: string;
  phoneNumber: string;
  faxNumber?: string;
  email: string;
  website?: string;
  referralEmail: string;
  taxId: string;
  licenseNumber: string;
  npiNumber?: string;
  taxonomyCode?: string;
  stateId?: string;
  timeZone: string;
  usesDST: boolean;
  calendarStartTime: string;
  calendarEndTime: string;
  defaultCurrency: string;
  dateFormat: string;
  timeFormat: string;
  language: string;
  defaultClientReceiptType?: string;
  daysBackCallIn?: number;
  daysMustCallIn?: number;
  dateNoteTrackingEnabled?: string;
  // New fields
  sameAsCompanyAddress?: boolean;
  mlNumberLabel?: string;
  otherIdLabel?: string;
  enableVoucherTracking?: boolean;
  setMissedAppointmentsToMissed?: boolean;
  showTreatmentFeesToExternalUsers?: boolean;
  omitClientNamesInSystemEmails?: boolean;
  hideSupervisorNamesFromExternalUsers?: boolean;
  propagateToAllClients?: boolean;
}
