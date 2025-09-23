import React, { useState, useMemo } from 'react';
import { Box, Divider, useMediaQuery, useTheme } from '@mui/material';
import PageLayout from '../../../layout/PageLayout';
import ClientHeader from '../components/ClientHeader/ClientHeader';
import FilterTabs from '../components/FilterTabs/FilterTabs';
import ClientTable from '../components/ClientTable/ClientTable';
import type { ClientData } from '../components/ClientTable/types';
import type { ClientStatus } from '../components/StatusBadge/StatusBadge';

// Mock data for demonstration
const mockClients: ClientData[] = [
  {
    id: '1',
    clientId: '4526311',
    name: 'Cody Fisher',
    email: 'jessica.hanson@example.com',
    avatar: '',
    code: '1001',
    treatment: '2025 Level II DUI Education',
    balanceDue: 145.00,
    group: 'Assigned',
    phoneNumber: '4805550103',
    dob: '1996-01-28',
    sex: 'Male',
    status: 'intake',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '20th JD',
  },
  {
    id: '2',
    clientId: '4526312',
    name: 'Floyd Miles',
    email: 'jackson.graham@example.com',
    avatar: '',
    code: '1002',
    treatment: '2025 DUI Intake Assessment',
    balanceDue: 0.00,
    group: 'Unassigned',
    phoneNumber: '2175550113',
    dob: '1994-04-04',
    sex: 'Male',
    status: 'active',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '17th JD',
  },
  {
    id: '3',
    clientId: '4526313',
    name: 'Wade Warren',
    email: 'michael.mitc@example.com',
    avatar: '',
    code: '1001',
    treatment: '2025 DUI Intake Assessment',
    balanceDue: 0.00,
    group: 'Assigned',
    phoneNumber: '6295550129',
    dob: '1990-09-18',
    sex: 'Female',
    status: 'hold',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '9th JD',
  },
  {
    id: '4',
    clientId: '4526314',
    name: 'Darlene Robertson',
    email: 'michelle.rivera@example.com',
    avatar: '',
    code: '1002',
    treatment: '2025 Level II DUI Education',
    balanceDue: 0.00,
    group: 'Assigned',
    phoneNumber: '2395550108',
    dob: '1986-04-21',
    sex: 'Male',
    status: 'referral',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '1st JD',
  },
  {
    id: '5',
    clientId: '4526315',
    name: 'Esther Howard',
    email: 'felicia.reid@example.com',
    avatar: '',
    code: '1001',
    treatment: '2025 Track D DUI Therapy Program',
    balanceDue: 0.00,
    group: 'Unassigned',
    phoneNumber: '6715550110',
    dob: '1993-11-07',
    sex: 'Male',
    status: 'discharged',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '17th JD',
  },
  {
    id: '6',
    clientId: '4526316',
    name: 'Jenny Wilson',
    email: 'felicia.reid@example.com',
    avatar: '',
    code: '1001',
    treatment: '2025 Track D DUI Therapy Program',
    balanceDue: 0.00,
    group: 'Unassigned',
    phoneNumber: '6715550110',
    dob: '1993-11-07',
    sex: 'Male',
    status: 'pending',
    mlDoc: '4512369',
    assignedOffice: 'Main',
    primaryOrg: '17th JD',
  },
];

const ClientListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Filter tabs configuration
  const filterTabs = [
    { id: 'all', label: 'All', count: mockClients.length },
    { id: 'intake', label: 'Intake', count: mockClients.filter(c => c.status === 'intake').length },
    { id: 'active', label: 'Active', count: mockClients.filter(c => c.status === 'active').length },
    { id: 'hold', label: 'Hold', count: mockClients.filter(c => c.status === 'hold').length },
    { id: 'referral', label: 'Referral', count: mockClients.filter(c => c.status === 'referral').length },
    { id: 'discharged', label: 'Discharged', count: mockClients.filter(c => c.status === 'discharged').length },
  ];

  // Filter data based on active tab
  const filteredClients = useMemo(() => {
    if (activeTab === 'all') {
      return mockClients;
    }
    return mockClients.filter(client => client.status === activeTab);
  }, [activeTab]);

  // Event handlers
  const handleDownloadCSV = () => {
    // Design placeholder - CSV download functionality
  };

  const handleNewClient = () => {
    // Design placeholder - New client navigation
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleRowClick = (client: ClientData) => {
    // Design placeholder - Client detail navigation
  };

  const handleEdit = (client: ClientData) => {
    // Design placeholder - Edit client functionality
  };

  const handleDelete = (client: ClientData) => {
    // Design placeholder - Delete client functionality
  };

  const handleStatusChange = (client: ClientData, newStatus: ClientStatus) => {
    // Design placeholder - Status change functionality
  };

  return (
    <PageLayout>
      {/* Header Section */}
      <ClientHeader
        onDownloadCSV={handleDownloadCSV}
        onNewClient={handleNewClient}
      />

      {/* Divider */}
      <Divider sx={{ borderColor: '#E7E9EB' }} />

      {/* Filter Tabs */}
      <FilterTabs
        tabs={filterTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Divider */}
      <Divider sx={{ borderColor: '#E7E9EB' }} />

      {/* Client Table */}
      <Box sx={{ 
        flex: 1, 
        overflow: isMobile ? 'auto' : 'hidden',
      }}>
        <ClientTable
          data={filteredClients}
          loading={loading}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </Box>
    </PageLayout>
  );
};

export default ClientListPage;
