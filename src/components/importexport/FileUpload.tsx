import React, { useState, useRef } from 'react';
import { MicroInteraction } from '../animations/MicroInteraction';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in bytes
  onFileSelect: (file: File) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = '.csv,.xlsx,.txt,.json',
  maxSize = 10 * 1024 * 1024, // 10MB default
  onFileSelect,
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type && !file.name.includes('.')) {
      setError('File has no type and no extension');
      return;
    }
    
    if (maxSize && file.size > maxSize) {
      setError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
      return;
    }
    
    setError(null);
    onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:border-primary-700' : 'border-gray-300 hover:border-primary-300 dark:border-gray-600 dark:hover:border-primary-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        <div className="text-4xl mb-3">📁</div>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Drag and drop your file here, or click to browse
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Accepted formats: {accept.replace(/\./g, '').replace(/,/g, ', ')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Maximum size: {maxSize / (1024 * 1024)}MB
        </p>
      </div>
      {error && (
        <MicroInteraction type="both">
          <div className="mt-2 text-error-500 text-sm">{error}</div>
        </MicroInteraction>
      )}
    </div>
  );
};

export default FileUpload;
