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

export interface ClientTableProps {
  data: ClientData[];
  loading?: boolean;
  onRowClick?: (client: ClientData) => void;
  onEdit?: (client: ClientData) => void;
  onDelete?: (client: ClientData) => void;
  className?: string;
}