import React, { useState } from 'react';
import { CommonSnackbar } from './index';

const SnackbarExample: React.FC = () => {
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    status: 'success' | 'error';
  }>({
    isOpen: false,
    message: '',
    status: 'success'
  });

  const showSuccessSnackbar = () => {
    setSnackbar({
      isOpen: true,
      message: 'Operation completed successfully!',
      status: 'success'
    });
  };

  const showErrorSnackbar = () => {
    setSnackbar({
      isOpen: true,
      message: 'Something went wrong. Please try again.',
      status: 'error'
    });
  };

  const showCustomMessage = () => {
    setSnackbar({
      isOpen: true,
      message: 'This is a custom message with auto-close after 10 seconds.',
      status: 'success'
    });
  };

  const handleClose = () => {
    setSnackbar(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Common Snackbar Example</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={showSuccessSnackbar}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0ea5e9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Success Snackbar
        </button>
        
        <button
          onClick={showErrorSnackbar}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Error Snackbar
        </button>
        
        <button
          onClick={showCustomMessage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Custom Message
        </button>
      </div>

     
      <CommonSnackbar
        message={snackbar.message}
        status={snackbar.status}
        isOpen={snackbar.isOpen}
        onClose={handleClose}
        autoClose={true}
        autoCloseDelay={10000}
        // position="bottom-right"
      />
    </div>
  );
};

export default SnackbarExample;
