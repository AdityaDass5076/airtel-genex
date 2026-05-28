import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import "./AppLayout.css";

const API_BASE = "http://127.0.0.1:8000";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/reports-data`)
      .then((res) => res.json())
      .then((data) => {
        setReports(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const downloadFile = (fileName) => {
    window.open(`${API_BASE}/download/${fileName}`, "_blank");
  };

  if (loading) {
    return <h2>Loading Reports...</h2>;
  }

  return (
    <div className="module-page">
      <h1>Reports</h1>
      <p>Download generated project reports.</p>

      <div className="reports-grid">
        {reports.map((report, index) => (
          <div className="report-card" key={index}>
            <div>
              <h2>{report.name}</h2>
              <p>{report.status}</p>
            </div>

            <button
              className="download-btn"
              onClick={() => downloadFile(report.name)}
            >
              <Download size={18} />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;