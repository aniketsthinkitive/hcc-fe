import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { CloudUpload, AttachFile, FileUpload } from '@mui/icons-material';
import CustomFileUpload, { type FileItem } from './custom-fileupload';

const CustomFileUploadExample: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<FileItem[]>([]);

  const handleFilesChange = (newFiles: FileItem[]) => {
    setFiles(newFiles);
  };

  const handleFileAdd = (file: FileItem) => {
    console.log('File added:', file);
    // Simulate upload progress
    setUploadingFiles(prev => [...prev, file]);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadingFiles(prev => prev.filter(f => f.id !== file.id));
      }
      
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, progress } : f
      ));
    }, 200);
  };

  const handleFileRemove = (fileId: string) => {
    console.log('File removed:', fileId);
    setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const clearAllFiles = () => {
    setFiles([]);
    setUploadingFiles([]);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
        Custom File Upload Component Examples
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Default Drag & Drop */}
        <Box>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Default Drag & Drop
            </Typography>
            <CustomFileUpload
              files={files}
              onFilesChange={handleFilesChange}
              onFileAdd={handleFileAdd}
              onFileRemove={handleFileRemove}
              type="default"
              size="md"
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              maxFiles={5}
              maxFileSize={5 * 1024 * 1024} // 5MB
              placeholder="Drag and drop files here or click to browse"
              helperText="Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB each)"
              showFileList={true}
              showProgress={true}
            />
          </Paper>
        </Box>

        {/* Button Style */}
        <Box>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Button Style
            </Typography>
            <CustomFileUpload
              files={files}
              onFilesChange={handleFilesChange}
              onFileAdd={handleFileAdd}
              onFileRemove={handleFileRemove}
              type="button"
              size="md"
              multiple={true}
              accept="image/*"
              buttonText="Upload Images"
              icon={<CloudUpload />}
              showFileList={true}
              showProgress={true}
            />
          </Paper>
        </Box>

        {/* Icon Only */}
        <Box>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Icon Only
            </Typography>
            <CustomFileUpload
              files={files}
              onFilesChange={handleFilesChange}
              onFileAdd={handleFileAdd}
              onFileRemove={handleFileRemove}
              type="icon"
              size="lg"
              multiple={false}
              accept=".pdf"
              icon={<AttachFile />}
              showFileList={true}
            />
          </Paper>
        </Box>

        {/* Small Size */}
        <Box>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Small Size
            </Typography>
            <CustomFileUpload
              files={files}
              onFilesChange={handleFilesChange}
              onFileAdd={handleFileAdd}
              onFileRemove={handleFileRemove}
              type="button"
              size="sm"
              multiple={true}
              buttonText="Choose Files"
              icon={<FileUpload />}
              showFileList={false}
            />
          </Paper>
        </Box>

        {/* Error State */}
        <Box>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Error State
            </Typography>
            <CustomFileUpload
              files={files}
              onFilesChange={handleFilesChange}
              onFileAdd={handleFileAdd}
              onFileRemove={handleFileRemove}
              type="default"
              size="md"
              hasError={true}
              errorMessage="Please select a valid file"
              placeholder="Upload failed - try again"
              showFileList={true}
            />
          </Paper>
        </Box>

        {/* Disabled State */}
        <Box>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Disabled State
            </Typography>
            <CustomFileUpload
              files={files}
              onFilesChange={handleFilesChange}
              onFileAdd={handleFileAdd}
              onFileRemove={handleFileRemove}
              type="default"
              size="md"
              disabled={true}
              placeholder="Upload is disabled"
              showFileList={true}
            />
          </Paper>
        </Box>

        {/* Large Size with Custom Styling */}
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Large Size with Custom Styling
            </Typography>
            <CustomFileUpload
              files={files}
              onFilesChange={handleFilesChange}
              onFileAdd={handleFileAdd}
              onFileRemove={handleFileRemove}
              type="default"
              size="lg"
              multiple={true}
              accept="*/*"
              placeholder="Drop any files here for upload"
              helperText="No file type restrictions - upload anything!"
              showFileList={true}
              showProgress={true}
              sx={{
                border: '2px dashed #439322',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#F8FFF8',
              }}
            />
          </Paper>
        </Box>
      </Box>

      {/* File List Summary */}
      {files.length > 0 && (
        <Paper sx={{ padding: 2, marginTop: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant="h6">
              Uploaded Files ({files.length})
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={clearAllFiles}
              size="small"
            >
              Clear All
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {files.map((file) => (
              <Box 
                key={file.id} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: '#F8F9F8',
                  borderRadius: '4px',
                  border: '1px solid #E8EBE8'
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#A9ACA9' }}>
                    {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {uploadingFiles.some(f => f.id === file.id) && (
                    <Typography variant="caption" sx={{ color: '#439322' }}>
                      Uploading...
                    </Typography>
                  )}
                  {file.progress === 100 && (
                    <Typography variant="caption" sx={{ color: '#439322' }}>
                      ✓ Complete
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CustomFileUploadExample;