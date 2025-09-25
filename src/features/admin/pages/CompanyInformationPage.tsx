import React, { useState } from 'react';
import { Box } from '@mui/material';
import CompanyInformationHeader from '../components/CompanyInformationHeader';
import CompanyInformationContent from '../components/CompanyInformationContent';
import CompanyInformationEditModal from '../components/CompanyInformationEditModal';
import { CompanyInformation, CompanyFormData } from '../types/company.types';
import { mockCompanyInformation } from '../data/company.mockData';

const CompanyInformationPage: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInformation>(mockCompanyInformation);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSubmitEdit = (data: CompanyFormData) => {
    console.log('Company information updated:', data);
    
    // Update the company information state
    const updatedCompanyInfo: CompanyInformation = {
      ...companyInfo,
      companyName: data.companyName,
      companyShortName: data.companyShortName,
      address: {
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
      paymentAddress: {
        addressLine1: data.paymentAddressLine1,
        addressLine2: data.paymentAddressLine2,
        city: data.paymentCity,
        state: data.paymentState,
        zipCode: data.paymentZipCode,
        country: data.paymentCountry,
      },
      contact: {
        phoneNumber: data.phoneNumber,
        faxNumber: data.faxNumber,
        email: data.email,
        website: data.website,
      },
      referral: {
        email: data.referralEmail,
      },
      business: {
        taxId: data.taxId,
        licenseNumber: data.licenseNumber,
        npiNumber: data.npiNumber,
        taxonomyCode: data.taxonomyCode,
        stateId: data.stateId,
        timeZone: data.timeZone,
        usesDST: data.usesDST,
      },
      calendar: {
        startTime: data.calendarStartTime,
        endTime: data.calendarEndTime,
      },
      settings: {
        defaultCurrency: data.defaultCurrency,
        dateFormat: data.dateFormat,
        timeFormat: data.timeFormat,
        language: data.language,
        defaultClientReceiptType: data.defaultClientReceiptType,
        daysBackCallIn: data.daysBackCallIn,
        daysMustCallIn: data.daysMustCallIn,
        dateNoteTrackingEnabled: data.dateNoteTrackingEnabled,
      },
      updatedAt: new Date().toISOString(),
    };

    setCompanyInfo(updatedCompanyInfo);
    
    // Here you would typically make an API call to save the data
    // For now, we'll just log the data
    console.log('Updated company information:', updatedCompanyInfo);
  };

  // Convert CompanyInformation to CompanyFormData for the edit modal
  const getFormDataFromCompanyInfo = (): CompanyFormData => ({
    companyName: companyInfo.companyName,
    companyShortName: companyInfo.companyShortName,
    addressLine1: companyInfo.address.addressLine1,
    addressLine2: companyInfo.address.addressLine2,
    city: companyInfo.address.city,
    state: companyInfo.address.state,
    zipCode: companyInfo.address.zipCode,
    country: companyInfo.address.country,
    paymentAddressLine1: companyInfo.paymentAddress.addressLine1,
    paymentAddressLine2: companyInfo.paymentAddress.addressLine2,
    paymentCity: companyInfo.paymentAddress.city,
    paymentState: companyInfo.paymentAddress.state,
    paymentZipCode: companyInfo.paymentAddress.zipCode,
    paymentCountry: companyInfo.paymentAddress.country,
    phoneNumber: companyInfo.contact.phoneNumber,
    faxNumber: companyInfo.contact.faxNumber,
    email: companyInfo.contact.email,
    website: companyInfo.contact.website,
    referralEmail: companyInfo.referral.email,
    taxId: companyInfo.business.taxId,
    licenseNumber: companyInfo.business.licenseNumber,
    npiNumber: companyInfo.business.npiNumber,
    taxonomyCode: companyInfo.business.taxonomyCode,
    stateId: companyInfo.business.stateId,
    timeZone: companyInfo.business.timeZone,
    usesDST: companyInfo.business.usesDST,
    calendarStartTime: companyInfo.calendar.startTime,
    calendarEndTime: companyInfo.calendar.endTime,
    defaultCurrency: companyInfo.settings.defaultCurrency,
    dateFormat: companyInfo.settings.dateFormat,
    timeFormat: companyInfo.settings.timeFormat,
    language: companyInfo.settings.language,
    defaultClientReceiptType: companyInfo.settings.defaultClientReceiptType,
    daysBackCallIn: companyInfo.settings.daysBackCallIn,
    daysMustCallIn: companyInfo.settings.daysMustCallIn,
    dateNoteTrackingEnabled: companyInfo.settings.dateNoteTrackingEnabled,
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '93vh',
          backgroundColor: '#F6F6F6',
          overflow: 'hidden',
        }}
      >
        {/* Header with title and Edit button */}
        <CompanyInformationHeader onEdit={handleEdit} />

        {/* Company Information Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
          }}
        >
          <CompanyInformationContent companyInfo={companyInfo} />
        </Box>
      </Box>

      {/* Edit Company Information Modal */}
      <CompanyInformationEditModal
        open={isEditModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEdit}
        initialData={getFormDataFromCompanyInfo()}
      />
    </>
  );
};

export default CompanyInformationPage;
