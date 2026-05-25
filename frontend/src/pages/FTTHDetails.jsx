import { Download, Router, Home, IndianRupee, CheckCircle2 } from "lucide-react";
import "./FTTHDetails.css";

function FTTHDetails() {
  const project = JSON.parse(localStorage.getItem("genex-project")) || {};
  const extraction = JSON.parse(localStorage.getItem("genex-extraction")) || {};

  const hp = extraction.hp_count || 1952;

  const details = [
    ["GIS Code", project.siteGisCode || "CFJ"],
    ["M6 Code", project.m6Code || "VIZ/CFJ/901"],
    ["Site Address", project.areaSegment || "RR Venkatapuram Simhachalam VIZ423 Fiber Pop"],
    ["CEN Required", "0"],
    ["Home Pass", hp],
    ["Chassis", "Tejas"],
    ["Chassis / OLT Type", "Nokia / ZTE 1U OLT"],
    ["GPON Cards 16 Port", "0"],
    ["GPON Cards 8 Port", "4"],
    ["ZTE OLT/Nokia", "ZTEFN16PC"],
    ["GPON Ports", "32"],
    ["TPT WO", "NA"],
  ];

  const costRows = [
    ["CEN Required", 0, 200000, 0],
    ["Home Pass", hp, 0, 0],
    ["Chassis", 1, 250000, 250000],
    ["GPON Cards 8 Port", 4, 85000, 340000],
    ["GPON Ports", 32, 0, 0],
    ["Installation / Commissioning", 1, 150000, 150000],
  ];

  const total = costRows.reduce((sum, row) => sum + row[3], 0);

  const downloadReport = () => {
    window.open("https://airtel-genex-backend.onrender.com/download/FTTH_Details.xlsx", "_blank");
  };

  return (
    <div className="ftth-page">
      <div className="ftth-header">
        <div>
          <h1>FTTH Details</h1>
          <p>
            FTTH planning details generated from project metadata and extracted
            home-pass/design quantities.
          </p>
        </div>

        <button className="ftth-download-btn" onClick={downloadReport}>
          <Download size={18} />
          Download FTTH Details
        </button>
      </div>

      <div className="ftth-summary-grid">
        <SummaryCard icon={<Home />} title="Home Pass" value={hp} />
        <SummaryCard icon={<Router />} title="GPON Ports" value="32" />
        <SummaryCard icon={<CheckCircle2 />} title="OLT Type" value="ZTE / Nokia" />
        <SummaryCard icon={<IndianRupee />} title="Total Cost" value={`₹ ${total.toLocaleString("en-IN")}`} />
      </div>

      <div className="ftth-main-grid">
        <div className="ftth-card">
          <div className="card-title">
            <h2>FTTH Details Sheet</h2>
            <span>Auto Filled</span>
          </div>

          <div className="ftth-table-wrap">
            <table className="ftth-table">
              <tbody>
                {details.map((row, index) => (
                  <tr key={index}>
                    <th>{row[0]}</th>
                    <td>{row[1]}</td>
                  </tr>
                ))}

                <tr className="total-row">
                  <th>Total</th>
                  <td>₹ {total.toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="ftth-card">
          <div className="card-title">
            <h2>Cost Calculation</h2>
            <span>Live</span>
          </div>

          <div className="cost-table-wrap">
            <table className="cost-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {costRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>₹ {row[2].toLocaleString("en-IN")}</td>
                    <td>₹ {row[3].toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="3">Grand Total</td>
                  <td>₹ {total.toLocaleString("en-IN")}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="ftth-bottom-grid">
        <div className="ftth-card">
          <h2>Project Mapping</h2>
          <Info label="Project Name" value={project.projectName || "Not filled"} />
          <Info label="City" value={project.city || "Not filled"} />
          <Info label="Area / Segment" value={project.areaSegment || "Not filled"} />
          <Info label="Fiber POP" value={project.fiberPopName || "Not filled"} />
        </div>

        <div className="ftth-card">
          <h2>Extracted Network Inputs</h2>
          <Info label="FAT / FMS" value={extraction.fat_count || 0} />
          <Info label="OTB" value={extraction.otb_count || 0} />
          <Info label="Splitter" value={extraction.splitter_count || 0} />
          <Info label="Cable Length" value={`${extraction.cable_length || 0} m`} />
        </div>

        <div className="ftth-card highlight-card">
          <h2>FTTH Status</h2>
          <div className="status-badge">Draft Generated</div>
          <p>
            FTTH details are prepared using saved project data and DXF extraction
            values. Final values can be exported after verification.
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="ftth-summary-card">
      <div>{icon}</div>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="ftth-info-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

export default FTTHDetails;