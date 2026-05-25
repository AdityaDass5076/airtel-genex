import { useState } from "react";
import {
  Save,
  RotateCcw,
  FileText,
  MapPin,
  Building2,
  CalendarDays,
  User,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import "./Project.css";

const initialForm = {
  projectName: "",
  workOrderNumber: "",
  circle: "",
  city: "",
  areaSegment: "",
  fiberPopName: "",
  plannerName: "Aditya",
  vendorName: "",
  surveyBy: "",
  designBy: "",

  projectType: "",
  workType: "",
  deploymentType: "",

  surveyDate: "",
  latitude: "",
  longitude: "",
  condition: "",

  budgetCapexCode: "",
  nfaNumber: "",
  cwipId: "",
  locatorId: "",
  tnlFfLocatorCode: "",
  grId: "",
  m6Code: "",
  siteGisCode: "",
};

function Project() {
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  const projectId =
    "GENEX-" +
    (form.city ? form.city.slice(0, 3).toUpperCase() : "PRJ") +
    "-" +
    new Date().getFullYear() +
    "-" +
    "0001";

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "genex-project",
      JSON.stringify({
        projectId,
        ...form,
      })
    );

    setSaved(true);
    alert("Project details saved successfully. You can now upload the DWG design.");
  };

  const handleReset = () => {
    setForm(initialForm);
    setSaved(false);
  };

  return (
    <div className="project-page">
      <div className="project-header">
        <div>
          <h1>Project Setup</h1>
          <p>
            Fill project metadata before uploading the DWG design. Quantities
            like cable length, FAT, OTB, splitter and duct will be extracted
            automatically from the drawing later.
          </p>
        </div>

        <div className="project-status-card">
          <FileText size={28} />
          <div>
            <span>Project ID</span>
            <h3>{projectId}</h3>
          </div>
        </div>
      </div>

      <div className="project-layout">
        <div className="project-form-area">
          <Section
            icon={<Briefcase />}
            title="1. Project Information"
            description="Basic project and planning details used for BOQ, BOM, MWO and CAPEX documents."
          >
            <div className="form-grid">
              <Input label="Project Name" value={form.projectName} onChange={(v) => updateField("projectName", v)} placeholder="Example: Medha infra NLCB IRIS" />
              <Input label="Work Order Number" value={form.workOrderNumber} onChange={(v) => updateField("workOrderNumber", v)} placeholder="Enter W.O. number" />
              <Select label="Circle" value={form.circle} onChange={(v) => updateField("circle", v)} options={["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra", "Delhi NCR"]} />
              <Input label="City" value={form.city} onChange={(v) => updateField("city", v)} placeholder="Example: Vizag" />
              <Input label="Area / Segment" value={form.areaSegment} onChange={(v) => updateField("areaSegment", v)} placeholder="Example: RR Venkatapuram" />
              <Input label="Fiber POP Name" value={form.fiberPopName} onChange={(v) => updateField("fiberPopName", v)} placeholder="Example: Vizag Fiber POP" />
              <Input label="Planner Name" value={form.plannerName} onChange={(v) => updateField("plannerName", v)} placeholder="Planner name" />
              <Input label="Vendor Name" value={form.vendorName} onChange={(v) => updateField("vendorName", v)} placeholder="Vendor / Partner name" />
              <Input label="Survey By" value={form.surveyBy} onChange={(v) => updateField("surveyBy", v)} placeholder="Survey engineer name" />
              <Input label="Design By" value={form.designBy} onChange={(v) => updateField("designBy", v)} placeholder="Design engineer name" />
            </div>
          </Section>

          <Section
            icon={<Building2 />}
            title="2. Project Type"
            description="These fields define validation rules and document structure."
          >
            <div className="form-grid three">
              <Select label="Project Type" value={form.projectType} onChange={(v) => updateField("projectType", v)} options={["Flatbed", "High Rise", "Mid Rise", "Villa", "Enterprise", "B2B"]} />
              <Select label="Work Type" value={form.workType} onChange={(v) => updateField("workType", v)} options={["New ODN", "Augmentation", "Quality", "Cutover", "Migration", "Expansion"]} />
              <Select label="Deployment Type" value={form.deploymentType} onChange={(v) => updateField("deploymentType", v)} options={["Overhead", "Underground", "Mixed"]} />
            </div>
          </Section>

          <Section
            icon={<MapPin />}
            title="3. Survey Details"
            description="Survey and geographical references for project tracking."
          >
            <div className="form-grid">
              <Input type="date" label="Survey Date" value={form.surveyDate} onChange={(v) => updateField("surveyDate", v)} />
              <Input label="Latitude" value={form.latitude} onChange={(v) => updateField("latitude", v)} placeholder="Optional / Auto later" />
              <Input label="Longitude" value={form.longitude} onChange={(v) => updateField("longitude", v)} placeholder="Optional / Auto later" />
              <Select label="Condition" value={form.condition} onChange={(v) => updateField("condition", v)} options={["External", "Internal", "Terrace", "Shaft", "Road Crossing"]} />
            </div>
          </Section>

          <Section
            icon={<CalendarDays />}
            title="4. Airtel Planning Codes"
            description="These fields map project data into Airtel-style MWO and CAPEX templates."
          >
            <div className="form-grid">
              <Input label="Budget Capex Code" value={form.budgetCapexCode} onChange={(v) => updateField("budgetCapexCode", v)} placeholder="Enter budget capex code" />
              <Input label="NFA Number" value={form.nfaNumber} onChange={(v) => updateField("nfaNumber", v)} placeholder="Enter NFA number" />
              <Input label="CWIP ID" value={form.cwipId} onChange={(v) => updateField("cwipId", v)} placeholder="Enter CWIP ID" />
              <Input label="Locator ID" value={form.locatorId} onChange={(v) => updateField("locatorId", v)} placeholder="Enter locator ID" />
              <Input label="TNL FF Locator Code" value={form.tnlFfLocatorCode} onChange={(v) => updateField("tnlFfLocatorCode", v)} placeholder="Enter TNL FF locator code" />
              <Input label="GR ID" value={form.grId} onChange={(v) => updateField("grId", v)} placeholder="Enter GR ID" />
              <Input label="M6 Code" value={form.m6Code} onChange={(v) => updateField("m6Code", v)} placeholder="Enter M6 code" />
              <Input label="Site GIS Code" value={form.siteGisCode} onChange={(v) => updateField("siteGisCode", v)} placeholder="Enter GIS code" />
            </div>
          </Section>

          <div className="project-actions">
            <button className="save-project-btn" onClick={handleSave}>
              <Save size={18} />
              Save Project Details
            </button>

            <button className="reset-project-btn" onClick={handleReset}>
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        </div>

        <div className="project-preview-panel">
          <div className="preview-card glow-card">
            <h2>Project Summary</h2>

            <PreviewRow label="Project ID" value={projectId} />
            <PreviewRow label="Project Name" value={form.projectName || "Not entered"} />
            <PreviewRow label="Circle" value={form.circle || "Not selected"} />
            <PreviewRow label="City" value={form.city || "Not entered"} />
            <PreviewRow label="Project Type" value={form.projectType || "Not selected"} />
            <PreviewRow label="Work Type" value={form.workType || "Not selected"} />
            <PreviewRow label="Deployment" value={form.deploymentType || "Not selected"} />
          </div>

          <div className="preview-card">
            <h2>DWG Extraction Plan</h2>

            <ul className="extraction-list">
              <li><CheckCircle /> Cable lengths will be extracted from DWG polylines.</li>
              <li><CheckCircle /> FAT, OTB, splitter and closure counts will be detected from blocks/text.</li>
              <li><CheckCircle /> HP count and route labels will be detected from drawing annotations.</li>
              <li><CheckCircle /> BOQ, BOM, MWO and CAPEX will use these project details.</li>
            </ul>
          </div>

          <div className="preview-card zero-card">
            <h2>Auto Extraction Values</h2>

            <div className="zero-grid">
              <MiniZero label="FAT" />
              <MiniZero label="OTB" />
              <MiniZero label="Splitters" />
              <MiniZero label="Cable Length" />
              <MiniZero label="Duct" />
              <MiniZero label="HP" />
            </div>

            <p>
              Values will remain zero until a DWG file is uploaded and processed.
            </p>
          </div>

          {saved && (
            <div className="saved-alert">
              <CheckCircle />
              Project saved. Go to Upload Design.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, description, children }) {
  return (
    <section className="project-section">
      <div className="section-title">
        <div className="section-icon">{icon}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select {label}</option>
        {options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="preview-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function MiniZero({ label }) {
  return (
    <div className="mini-zero">
      <h3>0</h3>
      <span>{label}</span>
    </div>
  );
}

export default Project;