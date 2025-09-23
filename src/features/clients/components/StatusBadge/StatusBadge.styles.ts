export const StatusBadgeStyles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 6px 2px 8px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '1.2',
    transition: 'all 0.2s ease-in-out',
    userSelect: 'none' as const,
    minHeight: '20px',
    maxWidth: 'fit-content',
  },

  badgeText: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '1.2',
    whiteSpace: 'nowrap' as const,
  },

  dropdownIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '12px',
    height: '12px',
    marginLeft: '2px',
  },
};