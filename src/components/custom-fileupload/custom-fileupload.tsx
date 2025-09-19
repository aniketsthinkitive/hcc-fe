import React, { useState, useRef, useCallback, type DragEvent } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { CloudUpload, Delete, FileUpload, AttachFile } from '@mui/icons-material';
import {
  getFileUploadStyles,
  type FileUploadType,
  type FileUploadSize
} from './custom-fileupload-styles';

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress?: number;
  error?: string;
}

export interface CustomFileUploadProps {
  files?: FileItem[];
  onFilesChange?: (files: FileItem[]) => void;
  onFileAdd?: (file: FileItem) => void;
  onFileRemove?: (fileId: string) => void;
  type?: FileUploadType;
  size?: FileUploadSize;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  hasError?: boolean;
  errorMessage?: string;
  helperText?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  sx?: React.CSSProperties;
  showFileList?: boolean;
  showProgress?: boolean;
  allowDragDrop?: boolean;
  icon?: React.ReactNode;
}

export default function CustomFileUpload({
  files = [],
  onFilesChange,
  onFileAdd,
  onFileRemove,
  type = 'default',
  size = 'md',
  disabled = false,
  multiple = false,
  accept,
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  hasError = false,
  errorMessage,
  helperText,
  placeholder = 'Click to upload or drag and drop files here',
  buttonText = 'Choose Files',
  className,
  sx,
  showFileList = true,
  showProgress = true,
  allowDragDrop = true,
  icon,
}: CustomFileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const styles = getFileUploadStyles(type, size);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | undefined => {
    if (file.size > maxFileSize) {
      return `File size must be less than ${formatFileSize(maxFileSize)}`;
    }
    if (accept && !accept.split(',').some(type => {
      const trimmedType = type.trim();
      if (trimmedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(trimmedType.toLowerCase());
      }
      return file.type.match(trimmedType.replace('*', '.*'));
    })) {
      return 'File type not allowed';
    }
    return undefined;
  };

  const createFileItem = (file: File): FileItem => {
    const error = validateFile(file);
    return {
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: error ? undefined : 0,
      error,
    };
  };

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles || disabled) return;

    const newFiles: FileItem[] = [];
    const fileArray = Array.from(selectedFiles);

    // Check max files limit
    if (files.length + fileArray.length > maxFiles) {
      const errorMsg = `Maximum ${maxFiles} files allowed`;
      // You could show a toast notification here
      console.warn(errorMsg);
      return;
    }

    fileArray.forEach(file => {
      const fileItem = createFileItem(file);
      newFiles.push(fileItem);
    });

    const updatedFiles = [...files, ...newFiles];
    onFilesChange?.(updatedFiles);
    
    newFiles.forEach(fileItem => {
      if (!fileItem.error) {
        onFileAdd?.(fileItem);
      }
    });
  }, [files, disabled, maxFiles, maxFileSize, accept, onFilesChange, onFileAdd]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    if (!disabled && allowDragDrop) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    if (disabled || !allowDragDrop) return;
    
    const droppedFiles = event.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  const handleRemoveFile = (fileId: string) => {
    if (disabled) return;
    
    const updatedFiles = files.filter(file => file.id !== fileId);
    onFilesChange?.(updatedFiles);
    onFileRemove?.(fileId);
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderUploadArea = () => {
    const currentStyles = {
      ...styles.uploadArea,
      ...(isDragOver && styles.uploadAreaHover),
      ...(isFocused && styles.uploadAreaFocus),
      ...(hasError && styles.uploadAreaError),
      ...(disabled && styles.uploadAreaDisabled),
    };

    const labelStyles = {
      ...styles.label,
      ...(isDragOver && styles.labelHover),
      ...(disabled && styles.labelDisabled),
    };

    const iconStyles = {
      ...styles.icon,
      ...(isDragOver && styles.iconHover),
      ...(disabled && styles.iconDisabled),
    };

    if (type === 'button') {
      const buttonStyles = {
        ...styles.button,
        ...(isDragOver && styles.buttonHover),
        ...(isFocused && styles.buttonFocus),
        ...(disabled && styles.buttonDisabled),
      };

      return (
        <button
          style={buttonStyles}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          disabled={disabled}
        >
          {icon || <FileUpload />}
          <Typography sx={{ marginLeft: icon ? '8px' : 0, color: 'inherit' }}>
            {buttonText}
          </Typography>
        </button>
      );
    }

    if (type === 'icon') {
      return (
        <Box
          sx={currentStyles}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {icon || <AttachFile sx={iconStyles} />}
        </Box>
      );
    }

    // Default and drag-drop types
    return (
      <Box
        sx={currentStyles}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {icon || <CloudUpload sx={iconStyles} />}
        <Typography sx={labelStyles}>
          {placeholder}
        </Typography>
        {accept && (
          <Typography sx={styles.helperText}>
            Accepted formats: {accept}
          </Typography>
        )}
        {maxFileSize && (
          <Typography sx={styles.helperText}>
            Max file size: {formatFileSize(maxFileSize)}
          </Typography>
        )}
      </Box>
    );
  };

  const renderFileList = () => {
    if (!showFileList || files.length === 0) return null;

    return (
      <Box sx={styles.fileList}>
        {files.map((fileItem) => (
          <Box key={fileItem.id} sx={styles.fileItem}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Typography sx={styles.fileName}>
                {fileItem.name}
              </Typography>
              <Typography sx={styles.fileSize}>
                {formatFileSize(fileItem.size)}
              </Typography>
            </Box>
            
            {showProgress && fileItem.progress !== undefined && (
              <Box sx={styles.progressBar}>
                <Box 
                  sx={{
                    ...styles.progressFill,
                    width: `${fileItem.progress}%`
                  }}
                />
              </Box>
            )}
            
            {fileItem.error && (
              <Typography sx={styles.errorMessage}>
                {fileItem.error}
              </Typography>
            )}
            
            <IconButton
              sx={styles.removeButton}
              onClick={() => handleRemoveFile(fileItem.id)}
              disabled={disabled}
              size="small"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ ...styles.container, ...sx }} className={className}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        style={styles.input}
        disabled={disabled}
      />
      
      {renderUploadArea()}
      
      {renderFileList()}
      
      {hasError && errorMessage && (
        <Typography sx={styles.errorMessage}>
          {errorMessage}
        </Typography>
      )}
      
      {!hasError && helperText && (
        <Typography sx={styles.helperText}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}