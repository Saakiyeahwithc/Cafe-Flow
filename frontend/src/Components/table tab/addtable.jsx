import { useState } from "react";

function AddTable({ onClose, onConfirm }) {
  const [seats, setSeats] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-80">
        <h2 className="text-xl font-bold mb-4">Add New Table</h2>

        <p className="font-medium mb-2 text-gray-600">Table Number</p>

        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="w-full border-2 p-2 mb-3 rounded-lg"
        />
        <p className="font-medium mb-2 text-gray-600">Seating Capacity</p>

        <input
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
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
              if (!seats) {
                setMsg("Must enter the number of seats");
                return;
              }
              onConfirm(tableNumber, seats);
              setTableNumber("");
              setSeats("");
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

export default AddTable