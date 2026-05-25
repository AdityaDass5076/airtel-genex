import { Download } from "lucide-react";
import "./AppLayout.css";

function Reports() {
  const reports = [
    "BOQ.xlsx",
    "BOM.xlsx",
    "MWO.xlsx",
    "Capex_Tracker.xlsx",
    "Cable_Length_Summary.xlsx",
    "Validation_Report.xlsx",
  ];

  return (
    <div className="module-page">
      <h1>Reports</h1>
      <p>Download all generated project documents.</p>

      <div className="reports-grid">
        {reports.map((file) => (
          <div className="report-card" key={file}>
            <div>
              <h2>{file}</h2>
              <p>Not generated yet</p>
            </div>
            <button className="download-btn">
              <Download size={17} />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;