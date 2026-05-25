import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileSearch,
  Download,
  Database,
} from "lucide-react";

import "./Verification.css";

function Verification() {
  const project = JSON.parse(localStorage.getItem("genex-project")) || {};
  const extraction = JSON.parse(localStorage.getItem("genex-extraction")) || {};

  const checks = [
    {
      title: "Project Details",
      description: "Project metadata saved before design upload.",
      status: project.projectName ? "pass" : "warning",
      value: project.projectName || "Project name missing",
    },
    {
      title: "City / Circle Mapping",
      description: "City and circle details verified for report generation.",
      status: project.city && project.circle ? "pass" : "warning",
      value: `${project.city || "City missing"} / ${project.circle || "Circle missing"}`,
    },
    {
      title: "DXF Extraction",
      description: "Drawing data extracted from uploaded design.",
      status: extraction.bom_items ? "pass" : "fail",
      value: extraction.bom_items ? "Extraction completed" : "No extraction data found",
    },
    {
      title: "BOM Items",
      description: "Material items detected from drawing and BOM text.",
      status: extraction.bom_items?.length > 0 ? "pass" : "warning",
      value: `${extraction.bom_items?.length || 0} items detected`,
    },
    {
      title: "Cable Length",
      description: "Cable quantity detected from design.",
      status: extraction.cable_length > 0 ? "pass" : "warning",
      value: `${extraction.cable_length || 0} meters`,
    },
    {
      title: "HP Count",
      description: "Home pass count verified from drawing/project details.",
      status: extraction.hp_count > 0 ? "pass" : "warning",
      value: extraction.hp_count || 0,
    },
    {
      title: "Splitter Count",
      description: "Splitter count checked against ODN requirement.",
      status: extraction.splitter_count > 0 ? "pass" : "warning",
      value: extraction.splitter_count || 0,
    },
    {
      title: "Report Readiness",
      description: "BOQ, BOM, MWO, OSP/ODN and FTTH sheets can be generated.",
      status: extraction.bom_items?.length > 0 ? "pass" : "warning",
      value: extraction.bom_items?.length > 0 ? "Ready" : "Pending upload",
    },
  ];

  const passCount = checks.filter((c) => c.status === "pass").length;
  const warningCount = checks.filter((c) => c.status === "warning").length;
  const failCount = checks.filter((c) => c.status === "fail").length;

  const validationScore = Math.round((passCount / checks.length) * 100);

  const materials = extraction.bom_items || [];

  const downloadValidation = () => {
    window.open("http://127.0.0.1:8000/download/Validation_Report.xlsx", "_blank");
  };

  return (
    <div className="verify-page">
      <div className="verify-header">
        <div>
          <h1>Verification</h1>
          <p>
            Cross-check project inputs, uploaded drawing extraction, material
            quantities and document readiness before final report generation.
          </p>
        </div>

        <button className="verify-download-btn" onClick={downloadValidation}>
          <Download size={18} />
          Download Validation Report
        </button>
      </div>

      <div className="verify-score-card">
        <div className="score-ring">
          <h1>{validationScore}%</h1>
          <span>Validation Score</span>
        </div>

        <div className="score-info">
          <h2>Project Verification Status</h2>
          <p>
            The system compares saved project details with extracted DXF values.
            Missing project data or zero extracted quantities are highlighted
            before report download.
          </p>

          <div className="score-badges">
            <Badge type="pass" label="Passed" value={passCount} />
            <Badge type="warning" label="Warnings" value={warningCount} />
            <Badge type="fail" label="Failed" value={failCount} />
          </div>
        </div>
      </div>

      <div className="verify-summary-grid">
        <Summary icon={<FileSearch />} title="Project Name" value={project.projectName || "Not filled"} />
        <Summary icon={<Database />} title="Drawing Items" value={materials.length} />
        <Summary icon={<ShieldCheck />} title="Cable Length" value={`${extraction.cable_length || 0} m`} />
        <Summary icon={<CheckCircle2 />} title="HP Count" value={extraction.hp_count || 0} />
      </div>

      <div className="verify-main-grid">
        <div className="verify-card">
          <h2>Verification Checklist</h2>

          <div className="check-list">
            {checks.map((check, index) => (
              <div className={`check-row ${check.status}`} key={index}>
                <div className="check-icon">
                  {check.status === "pass" && <CheckCircle2 />}
                  {check.status === "warning" && <AlertTriangle />}
                  {check.status === "fail" && <XCircle />}
                </div>

                <div className="check-content">
                  <h3>{check.title}</h3>
                  <p>{check.description}</p>
                </div>

                <div className="check-value">{check.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="verify-card">
          <h2>Project Input Review</h2>

          <Info label="Project Name" value={project.projectName || "Not filled"} />
          <Info label="Project ID" value={project.projectId || "Auto generated"} />
          <Info label="Work Order No." value={project.workOrderNumber || "Not filled"} />
          <Info label="Circle" value={project.circle || "Not filled"} />
          <Info label="City" value={project.city || "Not filled"} />
          <Info label="Project Type" value={project.projectType || "Not filled"} />
          <Info label="Work Type" value={project.workType || "Not filled"} />
          <Info label="Deployment" value={project.deploymentType || "Not filled"} />
          <Info label="Planner" value={project.plannerName || "Aditya"} />
          <Info label="Vendor" value={project.vendorName || "Not filled"} />
        </div>
      </div>

      <div className="verify-card full">
        <div className="table-top">
          <div>
            <h2>Extracted Material Verification</h2>
            <p>Material quantities detected from uploaded drawing and BOM text.</p>
          </div>

          <span className="verified-tag">
            <ShieldCheck size={17} />
            Review Required
          </span>
        </div>

        <div className="verify-table-wrap">
          <table className="verify-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Material</th>
                <th>Extracted Qty</th>
                <th>UOM</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {materials.length > 0 ? (
                materials.map((item, index) => {
                  const status = Number(item.quantity) > 0 ? "Detected" : "Zero Qty";
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.item}</td>
                      <td>{item.quantity}</td>
                      <td>{item.uom}</td>
                      <td>
                        <span className={status === "Detected" ? "status-pass" : "status-warning"}>
                          {status}
                        </span>
                      </td>
                      <td>
                        {status === "Detected"
                          ? "Ready for report generation"
                          : "Check drawing layer/text/block mapping"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No extracted material data found. Upload and process DXF first.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="verify-bottom-grid">
        <div className="verify-card">
          <h2>Critical Checks</h2>
          <Info label="BOM Extracted" value={materials.length > 0 ? "Yes" : "No"} />
          <Info label="Cable Available" value={extraction.cable_length > 0 ? "Yes" : "No"} />
          <Info label="Splitter Detected" value={extraction.splitter_count > 0 ? "Yes" : "No"} />
          <Info label="HP Available" value={extraction.hp_count > 0 ? "Yes" : "No"} />
        </div>

        <div className="verify-card">
          <h2>Recommended Actions</h2>
          <ul className="recommend-list">
            <li>Verify zero quantity materials before final export.</li>
            <li>Check whether DWG/DXF layers contain correct telecom labels.</li>
            <li>Confirm HP count with project planner before submission.</li>
            <li>Generate final reports after all warnings are resolved.</li>
          </ul>
        </div>

        <div className="verify-card final-status-card">
          <ShieldCheck size={40} />

          <h2>
            {failCount === 0 ? "Verification Completed" : "Verification Failed"}
          </h2>

          <p>
            {failCount === 0
              ? "Project is ready for final review and document generation."
              : "Resolve failed checks before document export."}
          </p>

          <div className="final-score">{validationScore}%</div>
        </div>
      </div>
    </div>
  );
}

function Summary({ icon, title, value }) {
  return (
    <div className="verify-summary-card">
      <div>{icon}</div>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function Badge({ type, label, value }) {
  return (
    <div className={`score-badge ${type}`}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="verify-info-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

export default Verification;