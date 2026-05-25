import { ShieldCheck } from "lucide-react";

function Validation() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Validation Center</h1>
      <p className="text-gray-400 mt-2">
        Verify drawing layers, missing items and network design errors.
      </p>

      <div className="glass rounded-3xl p-10 mt-8 text-center">
        <ShieldCheck size={90} className="mx-auto text-green-400" />
        <h2 className="text-3xl font-bold text-green-400 mt-6">
          No Critical Errors Found
        </h2>
        <p className="text-gray-400 mt-3">
          Design file validated successfully.
        </p>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="glass rounded-2xl p-6">
            <p className="text-gray-400">Warnings</p>
            <h2 className="text-4xl text-yellow-400 font-bold">3</h2>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-gray-400">Info</p>
            <h2 className="text-4xl text-cyan-400 font-bold">12</h2>
          </div>
        </div>

        <button className="mt-8 bg-red-600 px-8 py-4 rounded-xl">
          Download Validation Report
        </button>
      </div>
    </div>
  );
}

export default Validation;