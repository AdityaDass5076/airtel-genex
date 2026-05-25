function BOQGenerator() {
  return (
    <div>
      <h1 className="text-4xl font-bold">BOQ / BOM / MWO Generator</h1>
      <p className="text-gray-400 mt-2">
        Auto-generated material reports from uploaded network design.
      </p>

      <div className="glass rounded-3xl p-8 mt-8">
        <table className="w-full text-left">
          <thead className="text-gray-400">
            <tr>
              <th className="p-3">Report</th>
              <th className="p-3">Description</th>
              <th className="p-3">Records</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {["BOQ.xlsx", "BOM.xlsx", "MWO.xlsx"].map((file) => (
              <tr key={file} className="border-t border-gray-800">
                <td className="p-3">{file}</td>
                <td className="p-3">Generated Excel Report</td>
                <td className="p-3">198</td>
                <td className="p-3 text-green-400">Completed</td>
                <td className="p-3">
                  <button className="bg-red-600 px-4 py-2 rounded-lg">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BOQGenerator;