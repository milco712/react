import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Files } from "/imports/api/Files.js";

export default () => {
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file
  const [previewUrl, setPreviewUrl] = useState(null); // Store the preview URL

  const handleFileChange = (e) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      setSelectedFile(file);

      // Create a URL for the selected file to display as preview
      console.log(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("No file selected for upload.");
      return;
    }

    const upload = Files.insert(
      {
        file: selectedFile,
        chunkSize: "dynamic",
      },
      false
    );

    upload.on("start", function () {
      console.log("Upload started...");
    });

    upload.on("end", function (error, fileObj) {
      if (error) {
        alert(`Error during upload: ${error}`);
      } else {
        alert(`File "${fileObj.name}" successfully uploaded`);
      }
    });

    upload.start();
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange} // Only set the file, no upload yet
      />
      <button onClick={handleFileUpload}>Upload</button>

      {previewUrl && (
        <div style={{ marginTop: "20px" }}>
          <h4>Image Preview:</h4>
          <img
            src={previewUrl}
            alt="Selected preview"
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
};
