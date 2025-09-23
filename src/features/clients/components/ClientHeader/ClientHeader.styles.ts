export const ClientHeaderStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '14px 16px 12px',
    backgroundColor: '#FAFAFA',
    '@media (max-width: 768px)': {
      padding: '12px 12px 10px',
    },
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '12px',
    },
  },

  title: {
    fontFamily: 'Helvetica Neue, sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '1.2',
    color: '#2C2D2C',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '16px',
      textAlign: 'center',
    },
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '8px',
    },
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      width: '100%',
      gap: '8px',
    },
  },

  downloadButton: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #C5C9C5',
    color: '#2C2D2C',
    '&:hover': {
      backgroundColor: '#F9FAF9',
      borderColor: '#A9ACA9',
    },
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },

  newClientButton: {
    backgroundColor: '#439322',
    border: '1px solid #439322',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#3A7F1E',
      borderColor: '#3A7F1E',
    },
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },
};