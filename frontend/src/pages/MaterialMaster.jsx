function MaterialMaster() {
  const data = [
    ["ATL-FAT-001", "FAT Box 8 Port", "Nos", "1200"],
    ["ATL-ODF-001", "Optical Distribution Frame", "Nos", "3500"],
    ["ATL-OFC-012", "12F Optical Fiber Cable", "Meter", "18"],
    ["ATL-SPL-108", "Splitter 1:8", "Nos", "650"],
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold">Material Master</h1>
      <p className="text-gray-400 mt-2">
        Item code, material name, UOM and unit price database.
      </p>

      <div className="glass rounded-3xl p-8 mt-8">
        <table className="w-full text-left">
          <thead className="text-gray-400">
            <tr>
              <th className="p-3">Item Code</th>
              <th className="p-3">Item Name</th>
              <th className="p-3">UOM</th>
              <th className="p-3">Unit Price ₹</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-t border-gray-800">
                {row.map((col) => (
                  <td className="p-3" key={col}>{col}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaterialMaster;