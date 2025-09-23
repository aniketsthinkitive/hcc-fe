export const FilterTabsStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px', // Exact padding from Figma
    backgroundColor: '#FFFFFF', // Solid/White from Figma
    gap: '109px', // Exact gap from Figma
    width: '100%',
    '@media (max-width: 1024px)': {
      gap: '20px',
    },
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '16px',
      padding: '12px',
    },
  },

  tabsContainer: {
    // Container for the tabs with Figma background styling
    backgroundColor: '#ECF2F3', // Background/BG 3 from Figma
    border: '1px solid #F9FAF9', // Neutral/1 from Figma
    borderRadius: '14px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: 'fit-content',
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'center',
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        height: '4px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#C5C9C5',
        borderRadius: '2px',
      },
    },
  },

  searchSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 'fit-content',
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },

  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px', // Exact gap from Figma
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'center',
    },
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '12px',
    },
  },

  searchInput: {
    width: '320px', // Exact width from Figma
    '@media (max-width: 1024px)': {
      width: '280px',
    },
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '400px',
    },
    '@media (max-width: 480px)': {
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      height: '42px', // Match tabs height exactly
      backgroundColor: '#FFFFFF',
      border: '1px solid #CDD0CD', // Neutral/20 from Figma
      borderRadius: '6px',
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Shadow/xs from Figma
      '&:hover': {
        borderColor: '#A9ACA9',
      },
      '&.Mui-focused': {
        borderColor: '#439322',
        boxShadow: '0px 0px 0px 3px rgba(67, 147, 34, 0.1)',
      },
      '& fieldset': {
        border: 'none', // Remove default border
      },
    },
    '& .MuiInputBase-input': {
      padding: '4px 8px', // Exact padding from Figma
      fontSize: '14px',
      fontFamily: '"Helvetica Neue", "Inter", sans-serif', // Font from Figma
      lineHeight: '1.6', // Line height from Figma
      height: '24px', // Match content height
      '&::placeholder': {
        color: '#A9ACA9', // Neutral/40 from Figma
        opacity: 1,
      },
    },
    '& .MuiInputAdornment-root': {
      marginLeft: '8px',
      marginRight: '0px',
    },
  },

  filterButton: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #C5C9C5', // Neutral/30 from Figma
    borderRadius: '6px',
    padding: '10px', // Exact padding from Figma
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Shadow/xs from Figma
    width: '40px', // Match Figma dimensions
    height: '40px',
    '&:hover': {
      backgroundColor: '#F9FAF9',
      borderColor: '#A9ACA9',
    },
    '& .MuiSvgIcon-root': {
      color: '#2C2D2C', // Neutral/80 from Figma
      fontSize: '18px', // 18px icon from Figma (filter_alt)
    },
    '@media (max-width: 480px)': {
      width: '100%',
      height: '42px',
    },
  },
};