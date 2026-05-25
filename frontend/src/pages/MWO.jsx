import { Download, FileText, IndianRupee, CheckCircle } from "lucide-react";
import "./MWO.css";

function MWO() {
  const project = JSON.parse(localStorage.getItem("genex-project")) || {};
  const extraction = JSON.parse(localStorage.getItem("genex-extraction")) || {};

  const rows = [
    ["A", "Intra-city Fiber connecting nodes and FTTH splitters", "KM", "0.000"],
    ["B", "Excavation & Restoration Type A - Depth up to 1.0 Mtrs.", "KM", "0.000"],
    ["C", "Excavation & Restoration Type A - Depth up to 0.6 Mtrs.", "KM", "0.000"],
    ["D", "In Building Trenching", "KM", "0.000"],
    ["E", "Open Trenching & restoration", "KM", extraction.cc_trench || 0],
    ["F", "Moulding & restoration", "KM", "0.000"],
    ["G", "Overhead Fiber Rollout", "KM", extraction.cable_length || 0],
    ["H", "IP1 Fiber Rollout", "KM", "0.000"],
    ["I", "Drop fiber cable for Home Connect", "KM", "0.000"],
    ["J", "Fiber pulling and splicing in old/existing ducts", "KM", "0.000"],
    ["K", "Surface Restoration", "KM", "0.000"],
    ["L", "FTTH Routing Inside Building", "Nos", "0"],
    ["M", "Installation of ETSI Rack", "Nos", "0"],
    ["N", "Access Site Build up - Splitter", "Nos", extraction.splitter_count || 0],
    ["O", "Termination - 24F", "Nos", extraction.cable_24f || 0],
    ["P", "Exclusive Splicing of Fiber/Backend Tapping 24F", "Nos", "0"],
    ["Q", "Exclusive Splicing of Fiber/Backend Tapping 96F", "Nos", "0"],
    ["R", "FDF/FMS", "Nos", extraction.fat_count || 0],
    ["S", "Tag Blog Installation", "Nos", "0"],
    ["T", "Installation commissioning of shelf network change", "Nos", "0"],
    ["U", "De-installation of Equipment", "Nos", "0"],
    ["V", "Horizontal cable tray/runway", "Mtr", "0"],
    ["W", "ROW Liaisoning", "KM", "0.000"],
    ["X", "Fiber Swap Programme Management", "KM", "0.000"],
    ["Y", "IP1 Programme Management Charges", "KM", "0.000"],
    ["Z", "Installation/Commissioning of shelf", "Nos", "0"],
    ["AA", "FTTB De-installation including Back Pulling", "Nos", "0"],
    ["AB", "Short Fiberisation", "No.", "0"],
  ];

  const costSummary = [
    ["MWO Material", "0"],
    ["MWO Services", "0"],
    ["ROW Cost", "0"],
    ["Open ROW Cost", "0"],
    ["ODN Material", "0"],
    ["ODN Services", "0"],
    ["ISP Cost", "0"],
    ["INFRA Cost", "0"],
    ["CEN Cost", "0"],
    ["TOTAL COST", "0"],
    ["Cost per HP", "0"],
  ];

  const downloadMWO = () => {
    window.open("https://airtel-genex-backend.onrender.com/download/MWO.xlsx", "_blank");
  };

  return (
    <div className="mwo-page">
      <div className="mwo-header">
        <div>
          <h1>MWO Preview</h1>
          <p>Material Work Order generated from project details and extracted DXF quantities.</p>
        </div>

        <button className="mwo-download-btn" onClick={downloadMWO}>
          <Download size={18} />
          Download MWO.xlsx
        </button>
      </div>

      <div className="mwo-top-grid">
        <div className="mwo-card">
          <h2>Organization Details</h2>
          <Info label="Name of Organization" value="Bharati Airtel Limited" />
          <Info label="City" value={project.city || "Not filled"} />
          <Info label="Site GIS Code" value={project.siteGisCode || "Not filled"} />
          <Info label="M6 Code" value={project.m6Code || "Not filled"} />
          <Info label="Case ID Number" value={project.workOrderNumber || "Not filled"} />
          <Info label="Type of Work" value={project.projectType || "Not filled"} />
          <Info label="Area / Segment" value={project.areaSegment || "Not filled"} />
        </div>

        <div className="mwo-card">
          <h2>Work Order Details</h2>
          <Info label="Budget Capex Code" value={project.budgetCapexCode || "Not filled"} />
          <Info label="NFA No." value={project.nfaNumber || "Not filled"} />
          <Info label="W.O No." value={project.workOrderNumber || "Not filled"} />
          <Info label="Locator ID" value={project.locatorId || "Not filled"} />
          <Info label="TNL FF Locator Code" value={project.tnlFfLocatorCode || "Not filled"} />
          <Info label="Survey By" value={project.surveyBy || "Not filled"} />
          <Info label="Design By" value={project.designBy || "Not filled"} />
        </div>

        <div className="mwo-cost-card">
          <IndianRupee size={34} />
          <p>Total Cost</p>
          <h1>₹ 0</h1>
          <span>Will calculate after rate master integration</span>
        </div>

        <div className="mwo-cost-card">
          <FileText size={34} />
          <p>HP Count</p>
          <h1>{extraction.hp_count || 0}</h1>
          <span>Extracted from drawing / project data</span>
        </div>
      </div>

      <div className="mwo-card full">
        <div className="table-title">
          <h2>MWO Line Items</h2>
          <span><CheckCircle size={16} /> Auto-filled from extraction</span>
        </div>

        <div className="mwo-table-wrap">
          <table className="mwo-table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Description</th>
                <th>UOM</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mwo-bottom-grid">
        <div className="mwo-card">
          <h2>Extracted BOM Summary</h2>

          <div className="mini-bom-list">
            {(extraction.bom_items || []).map((item, index) => (
              <div className="mini-bom-row" key={index}>
                <span>{item.item}</span>
                <b>{item.quantity} {item.uom}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="mwo-card">
          <h2>Cost Summary</h2>

          {costSummary.map((item) => (
            <div className="cost-row" key={item[0]}>
              <span>{item[0]}</span>
              <b>₹ {item[1]}</b>
            </div>
          ))}
        </div>

        <div className="mwo-card">
          <h2>Approval Details</h2>

          <Info label="Initiated by Cluster Project Head" value={project.plannerName || "Aditya"} />
          <Info label="Acceptance by Managed Service Partner" value={project.vendorName || "Not filled"} />
          <Info label="Status" value="Draft Generated" />
          <Info label="Validation" value="Pending Final Verification" />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="mwo-info-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

export default MWO;