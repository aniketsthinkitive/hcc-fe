import React, { useState } from 'react';
import { CustomTable } from './CustomTable';
import { CustomTableStyles, getBadgeStyle, formatCurrency, formatDate, formatPhone } from './CustomTable.styles';
import { ClientData, TableColumn } from './types';

// Mock data based on the Figma design
const mockClientData: ClientData[] = [
  {
    id: '1',
    clientId: '4526311',
    name: 'Cody Fisher',
    email: 'jessica.hanson@example.com',
    avatar: '/api/placeholder/32/32',
    code: '1001',
    treatment: '2025 Level II DUI Education',
    balanceDue: 145.00,
    group: 'Assigned',
    phoneNumber: '(480) 555-0103',
    dob: '01/28/1996',
    sex: 'Male',
    status: 'intake',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '20th JD',
  },
  {
    id: '2',
    clientId: '4526311',
    name: 'Floyd Miles',
    email: 'jackson.graham@example.com',
    avatar: '/api/placeholder/32/32',
    code: '1002',
    treatment: '2025 DUI Intake Assessment',
    balanceDue: 0.00,
    group: 'Unassigned',
    phoneNumber: '(217) 555-0113',
    dob: '04/04/1994',
    sex: 'Male',
    status: 'active',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '17th JD',
  },
  {
    id: '3',
    clientId: '4526311',
    name: 'Wade Warren',
    email: 'michael.mitc@example.com',
    avatar: '/api/placeholder/32/32',
    code: '1001',
    treatment: '2025 DUI Intake Assessment',
    balanceDue: 0.00,
    group: 'Assigned',
    phoneNumber: '(629) 555-0129',
    dob: '09/18/1990',
    sex: 'Female',
    status: 'hold',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '9th JD',
  },
  {
    id: '4',
    clientId: '4526311',
    name: 'Darlene Robertson',
    email: 'michelle.rivera@example.com',
    avatar: '/api/placeholder/32/32',
    code: '1002',
    treatment: '2025 Level II DUI Education',
    balanceDue: 0.00,
    group: 'Assigned',
    phoneNumber: '(239) 555-0108',
    dob: '04/21/1986',
    sex: 'Male',
    status: 'referral',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '1st JD',
  },
  {
    id: '5',
    clientId: '4526311',
    name: 'Esther Howard',
    email: 'felicia.reid@example.com',
    avatar: '/api/placeholder/32/32',
    code: '1001',
    treatment: '2025 Track D DUI Therapy Program',
    balanceDue: 0.00,
    group: 'Unassigned',
    phoneNumber: '(671) 555-0110',
    dob: '11/07/1993',
    sex: 'Male',
    status: 'discharged',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '17th JD',
  },
  {
    id: '6',
    clientId: '4526311',
    name: 'Jenny Wilson',
    email: 'felicia.reid@example.com',
    avatar: '/api/placeholder/32/32',
    code: '1001',
    treatment: '2025 Track D DUI Therapy Program',
    balanceDue: 0.00,
    group: 'Unassigned',
    phoneNumber: '(671) 555-0110',
    dob: '11/07/1993',
    sex: 'Male',
    status: 'pending',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '17th JD',
  },
];

// Custom render functions
const renderClientName = (value: any, row: ClientData) => (
  <div className={CustomTableStyles.avatarCell}>
    <div className={CustomTableStyles.avatar}>
      {row.avatar ? (
        <img src={row.avatar} alt={row.name} className={CustomTableStyles.avatar} />
      ) : (
        <div 
          className={CustomTableStyles.avatar}
          style={{ 
            backgroundColor: '#E7E9EB', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#757775',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          {row.name.split(' ').map(n => n[0]).join('')}
        </div>
      )}
    </div>
    <div className={CustomTableStyles.avatarContent}>
      <div className={CustomTableStyles.avatarName}>{row.name}</div>
      <div className={CustomTableStyles.avatarEmail}>{row.email}</div>
    </div>
  </div>
);

const renderStatus = (value: string) => (
  <div className={getBadgeStyle(value)}>
    <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
    <span className={CustomTableStyles.badgeIcon}>▼</span>
  </div>
);

const renderBalance = (value: number) => (
  <span className={CustomTableStyles.currency}>
    {formatCurrency(value)}
  </span>
);

const renderDate = (value: string) => (
  <span className={CustomTableStyles.date}>
    {value}
  </span>
);

const renderPhone = (value: string) => (
  <span className={CustomTableStyles.phone}>
    {value}
  </span>
);

const renderId = (value: string) => (
  <span className={CustomTableStyles.id}>
    {value}
  </span>
);

// Table columns configuration
const columns: TableColumn<ClientData>[] = [
  {
    key: 'clientId',
    title: 'Client ID',
    width: '120px',
    sortable: true,
    render: renderId,
  },
  {
    key: 'name',
    title: 'Client Name',
    width: '250px',
    sortable: true,
    render: renderClientName,
  },
  {
    key: 'code',
    title: 'Code',
    width: '80px',
    sortable: true,
  },
  {
    key: 'treatment',
    title: 'Treatment',
    width: '200px',
    sortable: true,
  },
  {
    key: 'balanceDue',
    title: 'Balance Due',
    width: '120px',
    sortable: true,
    render: renderBalance,
  },
  {
    key: 'group',
    title: 'Group',
    width: '100px',
    sortable: true,
  },
  {
    key: 'phoneNumber',
    title: 'Phone Number',
    width: '140px',
    sortable: true,
    render: renderPhone,
  },
  {
    key: 'dob',
    title: 'DOB',
    width: '100px',
    sortable: true,
    render: renderDate,
  },
  {
    key: 'sex',
    title: 'Sex',
    width: '80px',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    width: '120px',
    sortable: true,
    render: renderStatus,
  },
  {
    key: 'mlDoc',
    title: 'ML/DOC',
    width: '100px',
    sortable: true,
    render: renderId,
  },
  {
    key: 'assignedOffice',
    title: 'Assigned Office',
    width: '120px',
    sortable: true,
  },
  {
    key: 'primaryOrg',
    title: 'Primary Org',
    width: '100px',
    sortable: true,
  },
];

export const CustomTableExample: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRowSelect = (rows: ClientData[]) => {
    setSelectedRows(rows);
    console.log('Selected rows:', rows);
  };

  const handleRowClick = (row: ClientData, index: number) => {
    console.log('Row clicked:', row, 'Index:', index);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '24px', background: '#FAFAFA', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontFamily: 'Helvetica Neue', 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#2C2D2C',
          marginBottom: '8px'
        }}>
          Custom Table Example
        </h1>
        <p style={{ 
          fontFamily: 'Helvetica Neue', 
          fontSize: '14px', 
          color: '#757775',
          marginBottom: '16px'
        }}>
          Based on the Human Care Center Figma design
        </p>
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <button
            onClick={handleRefresh}
            style={{
              padding: '8px 16px',
              background: '#439322',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'Helvetica Neue',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Refresh Data
          </button>
          
          {selectedRows.length > 0 && (
            <div style={{
              padding: '8px 16px',
              background: '#EFFFE3',
              color: '#439322',
              borderRadius: '6px',
              fontFamily: 'Helvetica Neue',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {selectedRows.length} row(s) selected
            </div>
          )}
        </div>
      </div>

      <CustomTable
        data={mockClientData}
        columns={columns}
        config={{
          showCheckbox: true,
          showActions: true,
          showPagination: true,
          pageSize: 5,
          showRowsPerPage: true,
          stickyHeader: true,
          hoverable: true,
        }}
        onRowSelect={handleRowSelect}
        onRowClick={handleRowClick}
        loading={loading}
        emptyMessage="No clients found"
      />
    </div>
  );
};

export default CustomTableExample;
