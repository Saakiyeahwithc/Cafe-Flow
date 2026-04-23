import { useState } from "react";

function StatusForm({ table, onClose, onConfirm }) {
  const [status, setStatus] = useState(table.status);
  const [customerName, setCustomerName] = useState(table.customerName);
  const [msg, setMsg] = useState("");

  const customerRegex=/^[a-zA-Z\s]+$/;


  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-80">
        <h2 className="text-xl font-bold mb-4">Select Table Status</h2>

        <div className="flex items-center gap-3 mb-5"> 
            <div className="flex items-center gap-1">
                <input
                    type="radio"
                    name="status"
                    value="Available"
                    checked={status === "Available"}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <p>Available</p>
            </div>

            <div className="flex items-center gap-1">
                <input
                    type="radio"
                    name="status"
                    value="Reserved"
                    checked={status === "Reserved"}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <p>Reserved</p>
            </div>

            <div className="flex items-center gap-1">
                <input
                    type="radio"
                    name="status"
                    value="Occupied"
                    checked={status === "Occupied"}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <p>Occupied</p>
            </div>
        </div>

        {(status === "Reserved" || status === "Occupied") && (
          <div className="mb-5">
            <p className="font-medium">{status==="Reserved"?"Reserved for:":"Occupied by:"}</p>
            <input
              type="text"
              placeholder="Enter name"
              className="border-2 p-2 mt-2 rounded-lg w-full"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <p className="text-red-500 font-medium text-sm mt-2">{msg}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-red-400 text-white font-medium rounded-xl 
            px-3 py-2 hover:bg-red-500">
            Cancel
          </button>

          <button
            onClick={()=>{
              if ((status==="Reserved" || status==="Occupied") && (!customerName || !customerRegex.test(customerName))) 
              {
                setMsg("Must enter a valid name");
                return;
              }
            onConfirm(table.id, status, customerName);
            setMsg("");
            setCustomerName("");
            setStatus("Available");
            }}
            className="px-3 py-2 bg-green-400 text-white font-medium 
            rounded-xl hover:bg-green-500">
            Confirm
          </button>
        </div>

      </div>

    </div>
  );
}

export default StatusForm