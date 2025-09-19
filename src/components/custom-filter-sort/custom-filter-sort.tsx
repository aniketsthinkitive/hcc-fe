import React, { useState, useCallback } from 'react';
import { Box, Typography, Radio, FormControlLabel } from '@mui/material';
import {
  getFilterSortStyles,
  customFilterSortStyles,
  type FilterSortType,
  type FilterSortSize
} from './custom-filter-sort-styles';

export interface FilterField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  placeholder?: string;
  options?: { value: string; label: string }[];
  value?: string;
}

export interface SortOption {
  id: string;
  label: string;
  value: string;
}

export interface SortGroup {
  id: string;
  title: string;
  options: SortOption[];
}

export interface CustomFilterSortProps {
  type?: FilterSortType;
  size?: FilterSortSize;
  title?: string;
  filterFields?: FilterField[];
  sortGroups?: SortGroup[];
  activeFilterField?: string;
  activeSortGroup?: string;
  selectedSortOptions?: Record<string, string>;
  onFilterFieldChange?: (fieldId: string) => void;
  onSortGroupChange?: (groupId: string) => void;
  onSortOptionChange?: (groupId: string, optionId: string) => void;
  onFilterValueChange?: (fieldId: string, value: string) => void;
  onClearAll?: () => void;
  onApply?: (filters: Record<string, string>, sortOptions: Record<string, string>) => void;
  onCancel?: () => void;
  className?: string;
  sx?: React.CSSProperties;
}

export default function CustomFilterSort({
  type = 'filter',
  size = 'md',
  title,
  filterFields = [],
  sortGroups = [],
  activeFilterField,
  activeSortGroup,
  selectedSortOptions = {},
  onFilterFieldChange,
  onSortGroupChange,
  onSortOptionChange,
  onFilterValueChange,
  onClearAll,
  onApply,
  onCancel,
  className,
  sx
}: CustomFilterSortProps) {
  const [localFilterValues, setLocalFilterValues] = useState<Record<string, string>>({});
  const [localSortOptions, setLocalSortOptions] = useState<Record<string, string>>(selectedSortOptions);

  const styles = getFilterSortStyles(type, size);

  const handleFilterFieldClick = useCallback((fieldId: string) => {
    onFilterFieldChange?.(fieldId);
  }, [onFilterFieldChange]);

  const handleSortGroupClick = useCallback((groupId: string) => {
    onSortGroupChange?.(groupId);
  }, [onSortGroupChange]);

  const handleSortOptionChange = useCallback((groupId: string, optionId: string) => {
    const newSortOptions = { ...localSortOptions, [groupId]: optionId };
    setLocalSortOptions(newSortOptions);
    onSortOptionChange?.(groupId, optionId);
  }, [localSortOptions, onSortOptionChange]);

  const handleFilterValueChange = useCallback((fieldId: string, value: string) => {
    const newFilterValues = { ...localFilterValues, [fieldId]: value };
    setLocalFilterValues(newFilterValues);
    onFilterValueChange?.(fieldId, value);
  }, [localFilterValues, onFilterValueChange]);

  const handleClearAll = useCallback(() => {
    setLocalFilterValues({});
    setLocalSortOptions({});
    onClearAll?.();
  }, [onClearAll]);

  const handleApply = useCallback(() => {
    onApply?.(localFilterValues, localSortOptions);
  }, [localFilterValues, localSortOptions, onApply]);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const renderFilterSidebar = () => {
    if (type !== 'filter' || filterFields.length === 0) return null;

    return (
      <Box sx={styles.sidebar}>
        {filterFields.map((field) => (
          <Box
            key={field.id}
            sx={activeFilterField === field.id ? styles.sidebarItemActive : styles.sidebarItem}
            onClick={() => handleFilterFieldClick(field.id)}
          >
            <Typography sx={activeFilterField === field.id ? styles.sidebarItemTextActive : styles.sidebarItemText}>
              {field.label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const renderSortSidebar = () => {
    if (type !== 'sort' || sortGroups.length === 0) return null;

    return (
      <Box sx={styles.sidebar}>
        {sortGroups.map((group) => (
          <Box
            key={group.id}
            sx={activeSortGroup === group.id ? styles.sidebarItemActive : styles.sidebarItem}
            onClick={() => handleSortGroupClick(group.id)}
          >
            <Typography sx={activeSortGroup === group.id ? styles.sidebarItemTextActive : styles.sidebarItemText}>
              {group.title}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const renderFilterContent = () => {
    if (type !== 'filter') return null;

    const activeField = filterFields.find(field => field.id === activeFilterField);
    if (!activeField) return null;

    return (
      <Box sx={styles.filterSection}>
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#424342' }}>
            {activeField.label}
          </Typography>
          <input
            type={activeField.type === 'number' ? 'number' : 'text'}
            placeholder={activeField.placeholder || `Enter ${activeField.label.toLowerCase()}`}
            value={localFilterValues[activeField.id] || ''}
            onChange={(e) => handleFilterValueChange(activeField.id, e.target.value)}
            style={styles.filterInput}
          />
          <button
            onClick={() => handleFilterValueChange(activeField.id, '')}
            style={styles.filterResetButton}
          >
            Reset
          </button>
        </Box>
      </Box>
    );
  };

  const renderSortContent = () => {
    if (type !== 'sort') return null;

    const activeGroup = sortGroups.find(group => group.id === activeSortGroup);
    if (!activeGroup) return null;

    return (
      <Box sx={styles.sortSection}>
        {sortGroups.map((group, index) => (
          <React.Fragment key={group.id}>
            <Box sx={styles.sortGroup}>
              <Typography sx={styles.sortGroupTitle}>
                {group.title}
              </Typography>
              <Box sx={styles.sortOptions}>
                {group.options.map((option) => (
                  <Box
                    key={option.id}
                    sx={styles.sortOption}
                    onClick={() => handleSortOptionChange(group.id, option.id)}
                  >
                    <input
                      type="radio"
                      name={group.id}
                      value={option.id}
                      checked={localSortOptions[group.id] === option.id}
                      onChange={() => handleSortOptionChange(group.id, option.id)}
                      style={localSortOptions[group.id] === option.id ? styles.radioButtonChecked : styles.radioButton}
                    />
                    <Typography sx={styles.radioButtonLabel}>
                      {option.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            {index < sortGroups.length - 1 && <hr style={styles.divider} />}
          </React.Fragment>
        ))}
      </Box>
    );
  };

  const getDefaultTitle = () => {
    return type === 'filter' ? 'Filters' : 'Sort';
  };

  const hasChanges = () => {
    if (type === 'filter') {
      return Object.values(localFilterValues).some(value => value.trim() !== '');
    } else {
      return Object.keys(localSortOptions).length > 0;
    }
  };

  return (
    <Box sx={customFilterSortStyles}>
      <Box sx={{ ...styles.container, ...sx }} className={className}>
        {/* Header */}
        <Box sx={styles.header}>
          <Typography sx={styles.title}>
            {title || getDefaultTitle()}
          </Typography>
          <button
            onClick={handleClearAll}
            style={styles.clearButton}
          >
            Clear All
          </button>
        </Box>

        {/* Content */}
        <Box sx={styles.content}>
          {/* Sidebar */}
          {type === 'filter' ? renderFilterSidebar() : renderSortSidebar()}
          
          {/* Main Content */}
          <Box sx={styles.mainContent}>
            {type === 'filter' ? renderFilterContent() : renderSortContent()}
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={styles.footer}>
          <Box sx={styles.footerButtons}>
            <button
              onClick={handleCancel}
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              style={hasChanges() ? styles.applyButton : styles.applyButtonDisabled}
              disabled={!hasChanges()}
            >
              Apply
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
