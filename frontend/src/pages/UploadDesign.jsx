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

const API_BASE = "http://127.0.0.1:8000";

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
      const response = await fetch(`${API_BASE}/upload-design`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend upload request failed");
      }

      const result = await response.json();

      if (result.data?.error) {
        setExtractData(result.data);
        alert("File uploaded, but extraction failed. Check DXF format.");
        return;
      }

      setExtractData(result.data);
      localStorage.setItem("genex-extraction", JSON.stringify(result.data));

      alert("Design uploaded and processed successfully.");
    } catch (error) {
      console.error("Upload Error:", error);
      alert(
        "Upload failed. Open the backend URL once to wake Render, then try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const generateReports = async () => {
    try {
      const response = await fetch(`${API_BASE}/generate-reports`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Report generation failed");
      }

      const result = await response.json();
      setGeneratedFiles(result.files || []);

      alert("Reports generated successfully.");
    } catch (error) {
      console.error("Report Error:", error);
      alert("Report generation failed. Check backend deployment.");
    }
  };

  const downloadFile = (filename) => {
    window.open(`${API_BASE}/download/${filename}`, "_blank");
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
                <ExtractCard 
                  label="FAT Count" 
                  value={extractData.fat_count || 0} 
                />
                <ExtractCard 
                  label="FMS Count" 
                  value={extractData.fms_count || 0} 
                />
                <ExtractCard 
                  label="Splitter Count" 
                  value={extractData.splitter_count || 0} 
                />
                <ExtractCard
                  label="OTB Count"
                  value={extractData.otb_count}
                />
                <ExtractCard
                  label="ODF Count"
                  value={extractData.odf_count}
                />
                <ExtractCard
                  label="Cable Length"
                  value={`${extractData.cable_length || 0} m`}
                />
                <ExtractCard
                  label="HP Count"
                  value={extractData.hp_count}
                />
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
                  {extractData.texts_found?.length > 0 ? (
                    extractData.texts_found.map((text, index) => (
                      <p key={index}>{text}</p>
                    ))
                  ) : (
                    <p>No drawing text detected.</p>
                  )}
                </div>

                <h2>Detected Layers</h2>

                <div className="debug-box">
                  {extractData.layers_found?.length > 0 ? (
                    extractData.layers_found.map((layer, index) => (
                      <p key={index}>{layer}</p>
                    ))
                  ) : (
                    <p>No layers detected.</p>
                  )}
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