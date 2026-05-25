import { Download, Cable, IndianRupee, CheckCircle2 } from "lucide-react";
import "./OHAccessories.css";

function OHAccessories() {
  const extraction =
    JSON.parse(localStorage.getItem("genex-extraction")) || {};

  const project =
    JSON.parse(localStorage.getItem("genex-project")) || {};

  const cableLength = extraction.cable_length || 3340;

  const items = [
    {
      code: "TNL004213",
      description:
        "Anchoring/Tensioning Clamp - for 10-14 mm Cable dia - PAB 120 to FO 400",
      requiredQty: 524.8,
      orderingQty: 525,
      remarks: "",
      price: 149,
    },
    {
      code: "TNL004221",
      description:
        "Universal Pole Bracket - Single run (for Anchoring/Tensioning)- CASHT",
      requiredQty: 278.8,
      orderingQty: 279,
      remarks: "",
      price: 82,
    },
    {
      code: "TNL004220",
      description:
        "Suspension Clamp - for 8-20mm Cable dia - PSR 8-20 ADSS",
      requiredQty: 262.4,
      orderingQty: 262,
      remarks: "",
      price: 80,
    },
    {
      code: "TNL004212",
      description:
        "Adjustable Cable Storage Bracket - MALICOIL - M",
      requiredQty: 82,
      orderingQty: 82,
      remarks: "",
      price: 575,
    },
    {
      code: "TNL004235",
      description: "FTTH Accessories - SS strap IF - 207",
      requiredQty: 1082.4,
      orderingQty: 1082,
      remarks:
        "To be ordered in 50 Mtrs (In case Of 3340, ordering qty should be 3350)",
      price: 28,
    },
    {
      code: "TNL004217",
      description: "Buckle CHA 20",
      requiredQty: 820,
      orderingQty: 820,
      remarks: "Will be supplied in 100 nos Pack",
      price: 9,
    },
    {
      code: "TNL003767",
      description: "Ratchet type Banding Tool-PCL",
      requiredQty: 1,
      orderingQty: 1,
      remarks:
        "1 No Tool for every 25 KMs or equivalent to number of installation team whichever is higher",
      price: 6500,
    },
  ];

  const processedItems = items.map((item) => ({
    ...item,
    totalPrice: item.orderingQty * item.price,
  }));

  const grandTotal = processedItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div className="oh-page">
      <div className="oh-header">
        <div>
          <h1>OH Accessories</h1>
          <p>
            Overhead accessory calculations and consolidated ordering summary
            generated automatically from extracted route and pole data.
          </p>
        </div>

        <button className="download-btn">
          <Download size={18} />
          Download OH Accessories
        </button>
      </div>

      <div className="oh-top-grid">
        <StatCard
          title="OH Cable Length"
          value={`${cableLength} m`}
        />

        <StatCard
          title="Project Type"
          value={project.projectType || "Flat Bed"}
        />

        <StatCard
          title="Deployment"
          value={project.deploymentType || "Overhead"}
        />

        <StatCard
          title="Total Cost"
          value={`₹ ${grandTotal.toLocaleString("en-IN")}`}
        />
      </div>

      <div className="oh-summary-card">
        <div>
          <h2>
            Consolidated OH Accessories Requirement
          </h2>

          <p>
            Based on cable routing, poles, suspension points,
            anchoring points and overhead rollout extraction.
          </p>
        </div>

        <div className="summary-total">
          <span>Grand Total</span>
          <h1>
            ₹ {grandTotal.toLocaleString("en-IN")}
          </h1>
        </div>
      </div>

      <div className="oh-table-card">
        <div className="table-top">
          <div className="table-title">
            <Cable size={22} />
            <h2>OH Material Consolidated Sheet</h2>
          </div>

          <div className="auto-tag">
            <CheckCircle2 size={16} />
            Auto Calculated
          </div>
        </div>

        <div className="oh-table-wrapper">
          <table className="oh-table">
            <thead>
              <tr>
                <th>Item No</th>
                <th>Description</th>
                <th>Required Qty</th>
                <th>Ordering Qty</th>
                <th>Remarks</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>

            <tbody>
              {processedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.code}</td>

                  <td>{item.description}</td>

                  <td>{item.requiredQty}</td>

                  <td>{item.orderingQty}</td>

                  <td>{item.remarks}</td>

                  <td>
                    ₹ {item.price.toLocaleString("en-IN")}
                  </td>

                  <td className="price-cell">
                    ₹ {item.totalPrice.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="6">TOTAL</td>

                <td className="grand-total-cell">
                  ₹ {grandTotal.toLocaleString("en-IN")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="info-card">
          <h3>OH Deployment Summary</h3>

          <InfoRow
            label="Structured OH Fiber"
            value={`${extraction.cable_length || 0} m`}
          />

          <InfoRow
            label="GI Pole Count"
            value={extraction.pole_count || 0}
          />

          <InfoRow
            label="Joint Closures"
            value={extraction.closure_count || 0}
          />

          <InfoRow
            label="FAT Boxes"
            value={extraction.fat_count || 0}
          />
        </div>

        <div className="info-card">
          <h3>OH Material Analytics</h3>

          <InfoRow
            label="Suspension Points"
            value="262"
          />

          <InfoRow
            label="Anchoring Points"
            value="525"
          />

          <InfoRow
            label="Pole Brackets"
            value="279"
          />

          <InfoRow
            label="Cable Storage Units"
            value="82"
          />
        </div>

        <div className="cost-card">
          <IndianRupee size={32} />

          <h2>Cost Breakdown</h2>

          <div className="cost-line">
            <span>Material Cost</span>
            <b>
              ₹ {grandTotal.toLocaleString("en-IN")}
            </b>
          </div>

          <div className="cost-line">
            <span>Service Cost</span>
            <b>₹ 0</b>
          </div>

          <div className="cost-line">
            <span>Total Cost</span>
            <b>
              ₹ {grandTotal.toLocaleString("en-IN")}
            </b>
          </div>

          <div className="big-total">
            ₹ {grandTotal.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

export default OHAccessories;