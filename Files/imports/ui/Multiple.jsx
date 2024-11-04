import React, { useState } from "react";
import { Files } from "/imports/api/Files.js";

export default () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files
  const [previewUrls, setPreviewUrls] = useState([]); // Store preview URLs

  const handleFileChange = (e) => {
    if (e.currentTarget.files) {
      const filesArray = Array.from(e.currentTarget.files); // Convert FileList to Array
      setSelectedFiles(filesArray);

      // Generate preview URLs for each file
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(previews);
    }
  };

  const handleFileUpload = () => {
    if (selectedFiles.length === 0) {
      alert("No files selected for upload.");
      return;
    }

    selectedFiles.forEach((file) => {
      const upload = Files.insert(
        {
          file: file,
          chunkSize: "dynamic",
        },
        false
      );

      upload.on("start", function () {
        console.log(`Upload started for ${file.name}...`);
      });

      upload.on("end", function (error, fileObj) {
        if (error) {
          alert(`Error during upload of ${file.name}: ${error}`);
        } else {
          alert(`File "${fileObj.name}" successfully uploaded`);
        }
      });

      upload.start();
    });
  };

  return (
    <div>
      <input
        type="file"
        multiple // Allow multiple file selection
        onChange={handleFileChange} // Only set the files, no upload yet
      />
      <button onClick={handleFileUpload}>Upload</button>

      {previewUrls.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Image Previews:</h4>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index}`}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  border: "1px solid #ddd",
                  padding: "10px",
                  margin: "5px",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
