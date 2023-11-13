import React, { useState } from 'react';
import FileRow from './Filerow';

const FileDashboard = () => {
  const [files, setFiles] = useState([]);
  const [newFileName, setNewFileName] = useState('');

  const handleAddFile = () => {
    if (newFileName.trim() !== '') {
      setFiles([...files, newFileName]);
      setNewFileName('');
    }
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="file-dashboard">
      <div className="file-input">
        <input
          type="text"
          placeholder="Enter file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button onClick={handleAddFile}>Add File</button>
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          <FileRow key={index} fileName={file} onDelete={() => handleDeleteFile(index)} />
        ))}
      </div>
    </div>
  );
};

export default FileDashboard;
