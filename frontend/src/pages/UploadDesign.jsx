import { useState } from "react";
import {
  UploadCloud,
  FileCheck,
  Loader2,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import "./AppLayout.css";

function UploadDesign() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [extractData, setExtractData] = useState(null);
  const [generatedFiles, setGeneratedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setExtractData(null);
    setGeneratedFiles([]);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a DXF file first.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-design", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setExtractData(result.data);
      localStorage.setItem("genex-extraction", JSON.stringify(result.data));
      alert("Design uploaded and processed successfully.");
    } catch (error) {
      alert("Upload failed. Check if backend is running.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const generateReports = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-reports", {
        method: "POST",
      });

      const result = await response.json();
      setGeneratedFiles(result.files);
      alert("Reports generated successfully.");
    } catch (error) {
      alert("Report generation failed.");
      console.error(error);
    }
  };

  const downloadFile = (filename) => {
    window.open(`http://127.0.0.1:8000/download/${filename}`, "_blank");
  };

  return (
    <div className="module-page">
      <h1>Upload Design</h1>

      <p>
        Upload your AutoCAD DXF design file. The backend will extract telecom
        quantities and prepare BOQ, BOM, MWO and validation reports.
      </p>

      <div className="upload-panel">
        <UploadCloud size={64} />

        <h2>Upload DXF Design File</h2>
        <p>Recommended file format: DXF</p>

        <input type="file" accept=".dxf" onChange={handleFileChange} />

        {selectedFile && (
          <div className="selected-file">
            <FileCheck size={18} />
            <span>{selectedFile.name}</span>
          </div>
        )}

        <button onClick={uploadFile} disabled={uploading}>
          {uploading ? (
            <>
              <Loader2 size={18} className="spin" />
              Processing...
            </>
          ) : (
            "Upload & Process Design"
          )}
        </button>
      </div>

      {extractData && (
        <div className="module-card">
          <h2>Extraction Result</h2>

          {extractData.error ? (
            <div className="error-box">
              <AlertCircle />
              <p>{extractData.error}</p>
            </div>
          ) : (
            <>
              <div className="extraction-grid">
                <ExtractCard label="FAT/FMS Count" value={extractData.fat_count} />
                <ExtractCard label="OTB Count" value={extractData.otb_count} />
                <ExtractCard label="ODF Count" value={extractData.odf_count} />
                <ExtractCard label="Splitter Count" value={extractData.splitter_count} />
                <ExtractCard label="Cable Length" value={`${extractData.cable_length} m`} />
                <ExtractCard label="HP Count" value={extractData.hp_count} />
              </div>

              <div className="bom-section">
                <h2>Extracted BOM Items</h2>

                <div className="bom-table-wrap">
                  <table className="bom-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>UOM</th>
                      </tr>
                    </thead>

                    <tbody>
                      {extractData.bom_items?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.item}</td>
                          <td>{item.quantity}</td>
                          <td>{item.uom}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button className="generate-btn" onClick={generateReports}>
                Generate BOQ / BOM / MWO Reports
              </button>

              <div className="debug-section">
                <h2>Detected Drawing Text</h2>
                <div className="debug-box">
                  {extractData.texts_found?.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>

                <h2>Detected Layers</h2>
                <div className="debug-box">
                  {extractData.layers_found?.map((layer, index) => (
                    <p key={index}>{layer}</p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {generatedFiles.length > 0 && (
        <div className="module-card">
          <h2>Generated Reports</h2>

          <div className="generated-list">
            {generatedFiles.map((file) => (
              <div className="generated-item" key={file}>
                <div>
                  <CheckCircle size={18} />
                  <span>{file}</span>
                </div>

                <button onClick={() => downloadFile(file)}>
                  <Download size={16} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExtractCard({ label, value }) {
  return (
    <div className="extract-card">
      <p>{label}</p>
      <h2>{value ?? 0}</h2>
    </div>
  );
}

export default UploadDesign;