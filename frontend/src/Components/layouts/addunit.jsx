import { useState } from "react";

function AddUnit({ type, onClose, onConfirm }) {
  const [capacity, setCapacity] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-80">
        <h2 className="text-xl font-bold mb-4">Add New {type === "room" ? "Room" : "Table"}</h2>

        <p className="font-medium mb-2 text-gray-600">{type === "room" ? "Room" : "Table"} Number</p>

        <input
          type="number"
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
          className="w-full border-2 p-2 mb-3 rounded-lg"
        />
        <p className="font-medium mb-2 text-gray-600">{type === "room" ? "Number of beds" : "Seating Capacity"}</p>

        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full border-2 p-2 mb-3 rounded-lg"
        />

        <p className="text-red-500 font-medium text-sm mb-6">{msg}</p>

        <div className="flex justify-between items-center">

          <button
            onClick={onClose}
            className="bg-red-400 text-white font-medium rounded-xl 
            px-3 py-2 hover:bg-red-500">
            Cancel
          </button>

          <button
            onClick={() => {
              if (!capacity || !unitNumber) {
                setMsg("Must enter all the fields");
                return;
              }
              onConfirm(type.toLowerCase().trim(), unitNumber, capacity);
              setUnitNumber("");
              setCapacity("");
              setMsg("");
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

export default AddUnit