import React, { useState } from 'react';
import mammoth from 'mammoth';

const FileViewer = () => {
  const [htmlContent, setHtmlContent] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const result = await mammoth.convertToHtml({arrayBuffer: arrayBuffer})
        setHtmlContent(result.value);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div className="file-view" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default FileViewer;
