function CapexTracker() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Capex Tracker</h1>
      <p className="text-gray-400 mt-2">
        Final project costing with item code, unit price and quantity.
      </p>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-bold">Cost Summary</h2>
          <div className="mt-6 space-y-4">
            <Row label="Material Cost" value="₹86,25,600" />
            <Row label="Installation Cost" value="₹10,12,450" />
            <Row label="Transportation" value="₹3,25,300" />
            <Row label="Other Expenses" value="₹3,01,730" />
          </div>
          <h1 className="text-4xl text-red-500 font-black mt-8">
            ₹1,02,65,080
          </h1>
        </div>

        <div className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-bold">Capex Report</h2>
          <p className="text-gray-400 mt-4">
            Download full cost calculation report.
          </p>
          <button className="mt-8 bg-red-600 px-8 py-4 rounded-xl">
            Download Capex Tracker
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-800 pb-3">
      <span className="text-gray-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default CapexTracker;