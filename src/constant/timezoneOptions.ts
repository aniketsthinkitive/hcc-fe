export interface TimezoneOption {
  key: string;
  value: string;
}

export const timezoneOptions: TimezoneOption[] = [
  { key: 'EST', value: 'Eastern Standard Time (EST)' },
  { key: 'CST', value: 'Central Standard Time (CST)' },
  { key: 'MST', value: 'Mountain Standard Time (MST)' },
  { key: 'PST', value: 'Pacific Standard Time (PST)' },
  { key: 'AKST', value: 'Alaska Standard Time (AKST)' },
  { key: 'HST', value: 'Hawaii Standard Time (HST)' },
];
