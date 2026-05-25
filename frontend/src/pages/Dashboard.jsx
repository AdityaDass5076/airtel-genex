import { useState } from "react";
import {
  LayoutDashboard,
  Upload,
  Database,
  FileSpreadsheet,
  IndianRupee,
  ShieldCheck,
  Download,
  LogOut,
} from "lucide-react";

function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Upload Design", icon: Upload },
    { name: "Material Master", icon: Database },
    { name: "BOQ / BOM / MWO", icon: FileSpreadsheet },
    { name: "Capex Tracker", icon: IndianRupee },
    { name: "Validation Center", icon: ShieldCheck },
    { name: "Reports", icon: Download },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <aside className="w-[280px] bg-[#0f172a]/90 border-r border-gray-800 p-6">
        <h1 className="text-3xl font-bold text-red-500">Airtel GenEx</h1>
        <p className="text-xs text-gray-400 mt-2">
          FTTH Automation Platform
        </p>

        <div className="mt-10 space-y-3">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${
                  activePage === item.name
                    ? "bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </div>

        <button className="absolute bottom-6 flex items-center gap-3 text-gray-400 hover:text-red-500">
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold">{activePage}</h2>
            <p className="text-gray-400 mt-2">
              Intelligent FTTH planning, costing and report automation
            </p>
          </div>

          <div className="bg-[#0f172a] border border-gray-800 rounded-2xl px-5 py-3">
            Airtel Official
          </div>
        </div>

        <div className="mt-8">
          {activePage === "Dashboard" && <DashboardHome />}
          {activePage === "Upload Design" && <UploadDesign />}
          {activePage === "Material Master" && <MaterialMaster />}
          {activePage === "BOQ / BOM / MWO" && <BOQ />}
          {activePage === "Capex Tracker" && <Capex />}
          {activePage === "Validation Center" && <Validation />}
          {activePage === "Reports" && <Reports />}
        </div>
      </main>
    </div>
  );
}

function DashboardHome() {
  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        <Card title="Projects" value="24" />
        <Card title="BOQ Generated" value="132" />
        <Card title="Estimated Cost" value="₹2.4 Cr" />
        <Card title="Validation Score" value="98%" />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <Panel title="Network Extraction Overview" />
        <Panel title="Cost Distribution Analytics" />
      </div>
    </>
  );
}

function UploadDesign() {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-10">
      <h3 className="text-2xl font-bold text-red-500">Upload AutoCAD Design</h3>
      <p className="text-gray-400 mt-2">
        Upload DWG/DXF network plan for automated BOQ, BOM, MWO and Capex generation.
      </p>

      <div className="mt-8 border-2 border-dashed border-red-500/50 rounded-3xl p-16 text-center bg-[#020617]/60">
        <Upload className="mx-auto text-red-500" size={50} />
        <p className="mt-4 text-xl">Drop your DWG/DXF file here</p>
        <input type="file" accept=".dwg,.dxf" className="mt-6" />
      </div>

      <button className="mt-8 bg-red-600 px-8 py-4 rounded-xl font-bold">
        Process Design File
      </button>
    </div>
  );
}

function MaterialMaster() {
  return <Panel title="Material Master: Item Code, UOM, Unit Price and Category" />;
}

function BOQ() {
  return <Panel title="BOQ / BOM / MWO Auto Generation Engine" />;
}

function Capex() {
  return <Panel title="Capex Tracker and Final Cost Calculation" />;
}

function Validation() {
  return <Panel title="Validation Center: Missing Layers, Duplicate Items and Route Errors" />;
}

function Reports() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <DownloadCard title="BOQ Report" />
      <DownloadCard title="BOM Report" />
      <DownloadCard title="MWO Report" />
      <DownloadCard title="Capex Tracker" />
      <DownloadCard title="Validation Report" />
      <DownloadCard title="Final Submission Report" />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 shadow-[0_0_30px_rgba(15,23,42,0.8)]">
      <p className="text-gray-400">{title}</p>
      <h3 className="text-4xl font-bold mt-3">{value}</h3>
    </div>
  );
}

function Panel({ title }) {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8 min-h-[260px]">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-400 mt-3">
        This module will show only its selected feature when clicked from the left menu.
      </p>
    </div>
  );
}

function DownloadCard({ title }) {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-8">
      <h3 className="text-xl font-bold">{title}</h3>
      <button className="mt-6 bg-red-600 px-6 py-3 rounded-xl">
        Download Excel
      </button>
    </div>
  );
}

export default Dashboard;