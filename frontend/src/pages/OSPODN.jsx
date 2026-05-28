import { Download, Network, IndianRupee, CheckCircle } from "lucide-react";
import "./OSPODN.css";
import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

function OSPODN() {
  const [ospData, setOspData] = useState({});
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`${API_BASE}/osp-data`)
    .then((res) => res.json())
    .then((data) => {
      setOspData(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);

if (loading) {
  return <h2>Loading OSP & ODN Data...</h2>;
}

const project = ospData.project || {};
const extraction = ospData.extraction || ospData || {};

  const hp = extraction.hp_count || 1952;

  const items = [
    ["Splitters for ODF/Rack compatible SC-APC 2:8", "Nos", "TNL003671", 479, extraction.splitter_count || 0],
    ["FAT Box with 1:8 Splitter", "Nos", "BOHRFAXK8", 996, extraction.fat_count || 0],
    ["FTTH Flat Optical Fiber Joint Closure, 96F", "Nos", "TNL004250", 1998, extraction.closure_count || 0],
    ["FMS 24F Rack Mount", "Nos", "FDM000003", 1998, extraction.fat_count || 0],
    ["OFC 24F ADSS Cable", "Km", "NET000476", 28125, ((extraction.cable_24f || 0) / 1000).toFixed(2)],
    ["OFC 12F MLT Universal Cable", "Km", "OFC000080", 13900, ((extraction.cable_12f || 0) / 1000).toFixed(2)],
    ["HDPE Duct 40/34.2mm", "Km", "DUC000058", 29050, ((extraction.duct_length || 0) / 1000).toFixed(2)],
    ["Optical Fiber Joint Closure, 24F Branch Joint", "Nos", "JCL000004", 900, extraction.closure_count || 0],
    ["Installation of OTB with Splicing, Termination and Testing", "Nos", "TNL004236", 300, extraction.otb_count || 0],
    ["Structured Overhead Fiber Rollout", "Mtrs", "TNL003738", 80, extraction.cable_length || 0],
    ["Supply & Installation of GI Pole", "Nos", "NET006465", 5650, extraction.pole_count || 0],
    ["Trenching & HDD Fiber Rollout", "Mtrs", "TNL004407", 270, extraction.cc_trench || 0],
    ["25MM PVC Conduit", "Mtrs", "TNL004419", 70, extraction.pvc_25mm || 0],
  ];

  const finalItems = items.map((row) => {
    const qty = Number(row[4]) || 0;
    const price = Number(row[3]) || 0;
    return {
      desc: row[0],
      uom: row[1],
      code: row[2],
      unitPrice: price,
      quantity: qty,
      finalPrice: Math.round(price * qty),
    };
  });

  const supplyTotal = finalItems
    .filter((i) => ["Nos", "Km"].includes(i.uom))
    .reduce((sum, i) => sum + i.finalPrice, 0);

  const serviceTotal = finalItems
    .filter((i) => ["Mtrs", "Each"].includes(i.uom))
    .reduce((sum, i) => sum + i.finalPrice, 0);

  const total = supplyTotal + serviceTotal;
  const costPerHp = hp > 0 ? Math.round(total / hp) : 0;

  const downloadReport = () => {
    window.open("http://https://airtel-genex-backend.onrender.com/download/OSP_ODN.xlsx", "_blank");
  };

  return (
    <div className="osp-page">
      <div className="osp-header">
        <div>
          <h1>OSP & ODN</h1>
          <p>Auto-filled OSP/ODN material and service summary based on uploaded DXF extraction.</p>
        </div>

        <button className="osp-download-btn" onClick={downloadReport}>
          <Download size={18} />
          Download OSP_ODN.xlsx
        </button>
      </div>

      <div className="osp-summary-grid">
        <SummaryCard title="OH HPs" value={hp} />
        <SummaryCard title="UG HPs" value="0" />
        <SummaryCard title="Type" value={project.projectType || "Flat Bed"} />
        <SummaryCard title="Total Cost" value={`₹ ${total.toLocaleString("en-IN")}`} />
      </div>

      <div className="osp-card project-info-card">
        <div>
          <h2>{project.areaSegment || "RR Venkatapuram Simhachalam VIZ423 Fiber Pop"}</h2>
          <p>{project.city || "Vizag"} | {project.deploymentType || "Overhead / ODN"}</p>
        </div>

        <div className="hp-box">
          <span>Over All HPs</span>
          <h1>{hp}</h1>
        </div>
      </div>

      <div className="osp-card">
        <div className="table-heading">
          <div>
            <h2>Item Description: Materials & Services</h2>
            <p>Item codes, unit prices, quantities and final prices are calculated automatically.</p>
          </div>

          <span>
            <CheckCircle size={17} />
            Auto Calculated
          </span>
        </div>

        <div className="osp-table-wrap">
          <table className="osp-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item Description</th>
                <th>U/N</th>
                <th>Item Code</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Final Price</th>
              </tr>
            </thead>

            <tbody>
              {finalItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.desc}</td>
                  <td>{item.uom}</td>
                  <td>{item.code}</td>
                  <td>₹ {item.unitPrice.toLocaleString("en-IN")}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {item.finalPrice.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="osp-bottom-grid">
        <div className="osp-card">
          <h2>Extracted ODN Quantities</h2>
          <Info label="24F Cable" value={`${extraction.cable_24f || 0} m`} />
          <Info label="12F Cable" value={`${extraction.cable_12f || 0} m`} />
          <Info label="Duct" value={`${extraction.duct_length || 0} m`} />
          <Info label="C.C Trench" value={`${extraction.cc_trench || 0} m`} />
          <Info label="25MM PVC" value={`${extraction.pvc_25mm || 0} m`} />
        </div>

        <div className="osp-card">
          <h2>Network Components</h2>
          <Info label="FAT / FMS" value={extraction.fat_count || 0} />
          <Info label="OTB" value={extraction.otb_count || 0} />
          <Info label="ODF" value={extraction.odf_count || 0} />
          <Info label="Splitter" value={extraction.splitter_count || 0} />
          <Info label="Closure" value={extraction.closure_count || 0} />
        </div>

        <div className="osp-card cost-summary-card">
          <Network size={32} />
          <h2>Cost Summary</h2>

          <Info label="Supply" value={`₹ ${supplyTotal.toLocaleString("en-IN")}`} />
          <Info label="Service" value={`₹ ${serviceTotal.toLocaleString("en-IN")}`} />
          <Info label="Total" value={`₹ ${total.toLocaleString("en-IN")}`} />
          <Info label="Cost Per HP" value={`₹ ${costPerHp.toLocaleString("en-IN")}`} />

          <div className="total-price">
            <IndianRupee size={20} />
            {total.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="osp-summary-card">
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="osp-info-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

export default OSPODN;