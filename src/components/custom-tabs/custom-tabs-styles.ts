export type TabType = 
  | 'button-primary' 
  | 'button-gray' 
  | 'button-white-border' 
  | 'button-white-border-icon-only'
  | 'button-white-border-figma'
  | 'underline' 
  | 'underline-filled';

export type TabSize = 'sm' | 'md';

export type TabState = 'default' | 'hover' | 'focus' | 'active';

export interface TabStyles {
  container: React.CSSProperties;
  tab: React.CSSProperties;
  tabActive: React.CSSProperties;
  tabHover: React.CSSProperties;
  tabFocus: React.CSSProperties;
  tabDisabled: React.CSSProperties;
  tabText: React.CSSProperties;
  tabTextActive: React.CSSProperties;
  tabTextDisabled: React.CSSProperties;
  badge: React.CSSProperties;
  badgeActive: React.CSSProperties;
  underline: React.CSSProperties;
  underlineActive: React.CSSProperties;
}

export const getTabStyles = (type: TabType, size: TabSize, fullWidth: boolean = false): TabStyles => {
  const baseFontFamily = '"Inter", "Geist", "Helvetica Neue", "Roboto", "Arial", sans-serif';
  
  // Size configurations
  const sizeConfig = {
    sm: {
      padding: '8px 12px',
      fontSize: '14px',
      lineHeight: '20px',
      minHeight: '36px',
      gap: '6px',
    },
    md: {
      padding: '12px 16px',
      fontSize: '16px',
      lineHeight: '24px',
      minHeight: '48px',
      gap: '8px',
    }
  };

  const currentSize = sizeConfig[size];

  // Base tab styles
  const baseTab: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: currentSize.gap,
    padding: currentSize.padding,
    minHeight: currentSize.minHeight,
    fontFamily: baseFontFamily,
    fontSize: currentSize.fontSize,
    lineHeight: currentSize.lineHeight,
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '6px',
    position: 'relative',
    flex: fullWidth ? 1 : 'none',
    whiteSpace: 'nowrap',
  };


  // Type-specific styles
  const typeStyles = {
    'button-primary': {
      default: {
        ...baseTab,
        backgroundColor: '#F2F2F2', // Neutral/5
        color: '#2C2D2C', // Neutral/80
        border: '1px solid transparent',
      },
      active: {
        backgroundColor: '#439322', // Primary Green
        color: '#FFFFFF',
        border: '1px solid #439322',
      },
      hover: {
        backgroundColor: '#E8F5E8', // Light green
        color: '#439322',
        border: '1px solid #E8F5E8',
      },
      focus: {
        backgroundColor: '#F2F2F2',
        color: '#2C2D2C',
        border: '1px solid #439322',
        boxShadow: '0 0 0 2px rgba(67, 147, 34, 0.2)',
      }
    },
    'button-gray': {
      default: {
        ...baseTab,
        backgroundColor: '#F2F2F2', // Neutral/5
        color: '#2C2D2C', // Neutral/80
        border: '1px solid transparent',
      },
      active: {
        backgroundColor: '#2C2D2C', // Neutral/80
        color: '#FFFFFF',
        border: '1px solid #2C2D2C',
      },
      hover: {
        backgroundColor: '#E5E5E5', // Light gray
        color: '#2C2D2C',
        border: '1px solid #E5E5E5',
      },
      focus: {
        backgroundColor: '#F2F2F2',
        color: '#2C2D2C',
        border: '1px solid #2C2D2C',
        boxShadow: '0 0 0 2px rgba(44, 45, 44, 0.2)',
      }
    },
    'button-white-border': {
      default: {
        ...baseTab,
        backgroundColor: '#FFFFFF',
        color: '#2C2D2C', // Neutral/80
        border: '1px solid #DDE0DD', // Neutral/10
      },
      active: {
        backgroundColor: '#439322', // Primary Green
        color: '#FFFFFF',
        border: '1px solid #439322',
      },
      hover: {
        backgroundColor: '#F8F9F8', // Very light gray
        color: '#2C2D2C',
        border: '1px solid #CDD0CD', // Neutral/20
      },
      focus: {
        backgroundColor: '#FFFFFF',
        color: '#2C2D2C',
        border: '1px solid #439322',
        boxShadow: '0 0 0 2px rgba(67, 147, 34, 0.2)',
      }
    },
    'button-white-border-icon-only': {
      default: {
        ...baseTab,
        backgroundColor: '#FFFFFF',
        color: '#2C2D2C', // Neutral/80
        border: '1px solid #DDE0DD', // Neutral/10
        padding: '8px', // Square padding for icon-only
        minWidth: currentSize.minHeight,
      },
      active: {
        backgroundColor: '#439322', // Primary Green
        color: '#FFFFFF',
        border: '1px solid #439322',
      },
      hover: {
        backgroundColor: '#F8F9F8', // Very light gray
        color: '#2C2D2C',
        border: '1px solid #CDD0CD', // Neutral/20
      },
      focus: {
        backgroundColor: '#FFFFFF',
        color: '#2C2D2C',
        border: '1px solid #439322',
        boxShadow: '0 0 0 2px rgba(67, 147, 34, 0.2)',
      }
    },
    'button-white-border-figma': {
      default: {
        ...baseTab,
        backgroundColor: 'transparent',
        color: '#424342', // Neutral/70
        border: 'none',
        borderRadius: '12px',
        padding: '8px 16px', // Increased padding for longer tabs
        minHeight: '32px',
        minWidth: '60px', // Increased minimum width for longer tabs
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
        fontSize: '14px',
        lineHeight: '1.2',
        fontWeight: 500, // Increased font weight
      },
      active: {
        backgroundColor: '#FFFFFF !important',
        color: '#439322 !important', // Primary/70 (Main)
        border: 'none !important',
        borderRadius: '12px',
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 23, 40, 0.1) !important',
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
        fontSize: '14px',
        lineHeight: '1.2',
        fontWeight: '600 !important', // Increased font weight for active state
      },
      hover: {
        backgroundColor: 'transparent',
        color: '#424342', // Neutral/70
        border: 'none',
      },
      focus: {
        backgroundColor: 'transparent',
        color: '#424342',
        border: 'none',
        boxShadow: 'none',
      }
    },
    'underline': {
      default: {
        ...baseTab,
        backgroundColor: 'transparent',
        color: '#A9ACA9', // Neutral/40
        border: 'none',
        borderBottom: '2px solid transparent',
        borderRadius: '0',
        padding: `${currentSize.padding} 0`,
        minHeight: 'auto',
      },
      active: {
        backgroundColor: 'transparent',
        color: '#439322', // Primary Green
        borderBottom: '2px solid #439322',
      },
      hover: {
        backgroundColor: 'transparent',
        color: '#2C2D2C', // Neutral/80
        borderBottom: '2px solid #CDD0CD', // Neutral/20
      },
      focus: {
        backgroundColor: 'transparent',
        color: '#439322',
        borderBottom: '2px solid #439322',
        boxShadow: 'none',
      }
    },
    'underline-filled': {
      default: {
        ...baseTab,
        backgroundColor: 'transparent',
        color: '#A9ACA9', // Neutral/40
        border: 'none',
        borderBottom: '2px solid transparent',
        borderRadius: '0',
        padding: `${currentSize.padding} 0`,
        minHeight: 'auto',
      },
      active: {
        backgroundColor: '#E8F5E8', // Light green background
        color: '#439322', // Primary Green
        borderBottom: '2px solid #439322',
        borderRadius: '6px 6px 0 0',
      },
      hover: {
        backgroundColor: 'transparent',
        color: '#2C2D2C', // Neutral/80
        borderBottom: '2px solid #CDD0CD', // Neutral/20
      },
      focus: {
        backgroundColor: '#E8F5E8',
        color: '#439322',
        borderBottom: '2px solid #439322',
        borderRadius: '6px 6px 0 0',
        boxShadow: 'none',
      }
    }
  };

  const currentTypeStyles = typeStyles[type];

  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4px',
      width: '100%',
    },
    tab: currentTypeStyles.default,
    tabActive: currentTypeStyles.active,
    tabHover: currentTypeStyles.hover,
    tabFocus: currentTypeStyles.focus,
    tabDisabled: {
      ...currentTypeStyles.default,
      backgroundColor: '#F2F2F2', // Neutral/5
      color: '#A9ACA9', // Neutral/40
      cursor: 'not-allowed',
      opacity: 0.6,
    },
    tabText: {
      fontFamily: baseFontFamily,
      fontSize: currentSize.fontSize,
      lineHeight: currentSize.lineHeight,
      fontWeight: 500,
      color: 'inherit',
    },
    tabTextActive: {
      fontFamily: baseFontFamily,
      fontSize: currentSize.fontSize,
      lineHeight: currentSize.lineHeight,
      fontWeight: 600,
      color: 'inherit',
    },
    tabTextDisabled: {
      fontFamily: baseFontFamily,
      fontSize: currentSize.fontSize,
      lineHeight: currentSize.lineHeight,
      fontWeight: 500,
      color: '#A9ACA9', // Neutral/40
    },
    badge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '20px',
      height: '20px',
      padding: '2px 6px',
      backgroundColor: '#F2F2F2', // Neutral/5
      color: '#2C2D2C', // Neutral/80
      borderRadius: '10px',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '16px',
      fontFamily: baseFontFamily,
    },
    badgeActive: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '20px',
      height: '20px',
      padding: '2px 6px',
      backgroundColor: '#FFFFFF',
      color: '#439322', // Primary Green
      borderRadius: '10px',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '16px',
      fontFamily: baseFontFamily,
    },
    underline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: 'transparent',
    },
    underlineActive: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: '#439322', // Primary Green
    }
  };

  // Special handling for button-white-border-figma type
  if (type === 'button-white-border-figma') {
    const figmaStyles = typeStyles['button-white-border-figma'];
    return {
      container: customTabsStyles.tabsContainer,
      tab: figmaStyles.default,
      tabActive: figmaStyles.active,
      tabHover: figmaStyles.hover,
      tabFocus: figmaStyles.focus,
      tabDisabled: figmaStyles.default,
      tabText: {
        fontFamily: baseFontFamily,
        fontSize: currentSize.fontSize,
        lineHeight: currentSize.lineHeight,
        fontWeight: 500,
        color: 'inherit',
      },
      tabTextActive: {
        fontFamily: baseFontFamily,
        fontSize: currentSize.fontSize,
        lineHeight: currentSize.lineHeight,
        fontWeight: 600,
        color: 'inherit',
      },
      tabTextDisabled: {
        fontFamily: baseFontFamily,
        fontSize: currentSize.fontSize,
        lineHeight: currentSize.lineHeight,
        fontWeight: 400,
        color: 'inherit',
        opacity: 0.5,
      },
      badge: {
        backgroundColor: '#F2F2F2',
        color: '#2C2D2C',
        borderRadius: '12px',
        padding: '2px 8px',
        fontSize: '12px',
        fontWeight: 500,
        minWidth: '20px',
        textAlign: 'center',
      },
      badgeActive: {
        backgroundColor: '#439322',
        color: '#FFFFFF',
        borderRadius: '12px',
        padding: '2px 8px',
        fontSize: '12px',
        fontWeight: 500,
        minWidth: '20px',
        textAlign: 'center',
      },
      underline: {
        height: '2px',
        backgroundColor: 'transparent',
        borderRadius: '1px',
      },
      underlineActive: {
        height: '2px',
        backgroundColor: '#439322',
        borderRadius: '1px',
      },
    };
  }

  // Return styles for regular types
  const regularTypeStyles = typeStyles[type];
  return {
    container: customTabsStyles.tabsContainer,
    tab: { ...baseTab, ...regularTypeStyles.default },
    tabActive: { ...baseTab, ...regularTypeStyles.active },
    tabHover: { ...baseTab, ...regularTypeStyles.hover },
    tabFocus: { ...baseTab, ...regularTypeStyles.focus },
    tabDisabled: { ...baseTab, ...regularTypeStyles.default, opacity: 0.5, cursor: 'not-allowed' },
    tabText: {
      fontFamily: baseFontFamily,
      fontSize: currentSize.fontSize,
      lineHeight: currentSize.lineHeight,
      fontWeight: 500,
      color: 'inherit',
    },
    tabTextActive: {
      fontFamily: baseFontFamily,
      fontSize: currentSize.fontSize,
      lineHeight: currentSize.lineHeight,
      fontWeight: 600,
      color: 'inherit',
    },
    tabTextDisabled: {
      fontFamily: baseFontFamily,
      fontSize: currentSize.fontSize,
      lineHeight: currentSize.lineHeight,
      fontWeight: 400,
      color: 'inherit',
      opacity: 0.5,
    },
    badge: {
      backgroundColor: '#F2F2F2',
      color: '#2C2D2C',
      borderRadius: '12px',
      padding: '2px 8px',
      fontSize: '12px',
      fontWeight: 500,
      minWidth: '20px',
      textAlign: 'center',
    },
    badgeActive: {
      backgroundColor: '#439322',
      color: '#FFFFFF',
      borderRadius: '12px',
      padding: '2px 8px',
      fontSize: '12px',
      fontWeight: 500,
      minWidth: '20px',
      textAlign: 'center',
    },
    underline: {
      height: '2px',
      backgroundColor: 'transparent',
      borderRadius: '1px',
    },
    underlineActive: {
      height: '2px',
      backgroundColor: '#439322',
      borderRadius: '1px',
    },
  };
};

export const customTabsStyles = {
  // Container styles
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: '4px',
    width: '100%',
    overflowX: 'auto' as const,
    '&::-webkit-scrollbar': {
      height: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#F2F2F2',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#CDD0CD',
      borderRadius: '2px',
    },
  },
  
  // Tab wrapper styles
  tabWrapper: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  },
  
  // Icon styles
  tabIcon: {
    width: '20px',
    height: '20px',
    color: 'inherit',
    flexShrink: 0,
  },
  
  // Responsive styles
  responsive: {
    '@media (max-width: 768px)': {
      tabsContainer: {
        gap: '2px',
      }
    }
  }
};
