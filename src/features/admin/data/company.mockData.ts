import { CompanyInformation } from '../types/company.types';

export const mockCompanyInformation: CompanyInformation = {
  id: '1',
  companyName: '5280 Human Care Center',
  companyShortName: '5280HCC',
  address: {
    addressLine1: '41880 Muirfield Loop',
    addressLine2: '',
    city: 'Elizabeth',
    state: 'CO',
    zipCode: '80107-9120',
    country: 'United States',
  },
  paymentAddress: {
    addressLine1: '41880 Muirfield Loop',
    addressLine2: '3891 Ranchview',
    city: 'Elizabeth',
    state: 'CO',
    zipCode: '80107-9120',
    country: 'United States',
  },
  contact: {
    phoneNumber: '(671) 555-0110',
    faxNumber: '888-620-9502',
    email: 'help@5280HCC.com',
    website: 'www.5280humancarecenter.com',
  },
  referral: {
    email: 'referrals@5280HCC.com',
  },
  business: {
    taxId: '',
    licenseNumber: '',
    npiNumber: '',
    taxonomyCode: '',
    stateId: '',
    timeZone: 'Mountain',
    usesDST: true,
  },
  calendar: {
    startTime: '3:00 AM',
    endTime: '10:00 PM',
  },
  settings: {
    defaultCurrency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12 Hour',
    language: 'English',
    defaultClientReceiptType: 'Basic',
    daysBackCallIn: 7,
    daysMustCallIn: 6,
    dateNoteTrackingEnabled: '11/02/2019',
  },
  status: 'active',
  createdAt: '2019-11-02T10:00:00Z',
  updatedAt: '2024-01-20T14:30:00Z',
};

export const timeZones = [
  { value: 'EST', label: 'Eastern Standard Time' },
  { value: 'CST', label: 'Central Standard Time' },
  { value: 'MST', label: 'Mountain Standard Time' },
  { value: 'PST', label: 'Pacific Standard Time' },
  { value: 'AKST', label: 'Alaska Standard Time' },
  { value: 'HST', label: 'Hawaii Standard Time' },
];

export const currencies = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
];

export const dateFormats = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

export const timeFormats = [
  { value: '12 Hour', label: '12 Hour (AM/PM)' },
  { value: '24 Hour', label: '24 Hour' },
];

export const languages = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
];
