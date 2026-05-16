import { useState } from "react";
import { privateAPI } from "../../../auth/config/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TableStatusForm({ table, changeTableStatus, close }) {
  const [status, setStatus] = useState(table.status);
  const [customerName, setCustomerName] = useState("");
  const [guestArrivalDate, setGuestArrivalDate] = useState(null);
  const [msg, setMsg] = useState("");

  const nameRegex = /^[a-zA-Z\s]+$/;

  const resetForm = () => {
    setMsg("");
    setCustomerName("");
    setGuestArrivalDate(null);
    setStatus(table.status);
    close();
  };

  const confirmStatus = async () => {
    try {
      await changeTableStatus(table.table_id, status); // only this
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-90">
        <h2 className="text-xl font-bold mb-4">Select Table Status</h2>

        {/* Status Selection */}
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
              value="Occupied"
              checked={status === "Occupied"}
              onChange={(e) => setStatus(e.target.value)}
            />
            {status === "Occupied" ? <p>Occupied</p> : <p>Occupy</p>}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={resetForm}
            className="bg-red-400 text-white font-medium rounded-xl 
            px-3 py-2 hover:bg-red-500"
          >
            Cancel
          </button>

          <button
            onClick={confirmStatus}
            className="px-3 py-2 bg-green-400 text-white font-medium 
            rounded-xl hover:bg-green-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableStatusForm;
