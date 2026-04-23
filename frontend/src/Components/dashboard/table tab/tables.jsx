import { useState } from "react";
import { Plus } from "lucide-react";
import AddTable from "./addtable.jsx";
import TableCard from "./tablecard.jsx";
import StatusForm from "./statusform.jsx";

function Tables() {
  const [showForm, setShowForm] = useState(false);
  const [tables, setTables] = useState([]);
  const [activeTable, setActiveTable] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTable = (tableNumber, seats) => {
    const exists = tables.some(t => t.tableNumber === tableNumber);
    if (exists) {
      setShowPopup(true);
      return;
    }

    const newTable = {
      id: Date.now(),
      tableNumber,
      seats,
      customerName: "",
      status: "Available",
    };

    setTables(prev => [...prev, newTable]);
    setShowForm(false);
  };

  const updateTable = (id, newStatus, newCustomerName) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: newStatus, customerName: newCustomerName }
          : t
      )
    );

    setActiveTable(null);
  };

  const handleDelete = (id) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Table Management
          </h1>

          <p className="text-[15px] text-gray-400 font-medium mt-1">
            Manage table availability and reservations  
          </p>      
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-2 py-2 rounded-lg flex items-center
            gap-1 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <p className="font-medium">Add Table</p>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-gray-600 text-sm mb-1 ">Total Tables</p>
          <p className="text-gray-900">{tables.length}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-green-700 text-sm mb-1">Available</p>
          <p className="text-green-900">{tables.filter((t) => t.status === "Available").length}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-blue-700 text-sm mb-1">Reserved</p>
          <p className="text-blue-900">{tables.filter((t) => t.status === "Reserved").length}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-red-700 text-sm mb-1">Occupied</p>
          <p className="text-red-900">{tables.filter((t) => t.status === "Occupied").length}</p>
        </div>
      </div>

      {/* Table Info Form */}
      {showForm && (
        <AddTable
          onClose={() => setShowForm(false)}
          onConfirm={handleAddTable}
        />
      )}

      {/* Status Inquiry Form */}
      {activeTable && (
        <StatusForm
          table={activeTable}
          onClose={() => setActiveTable(null)}
          onConfirm={updateTable}
        />
      )}

      {/* Table List */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <div className="flex items-center justify-between mb-12">
          <h3 className="font-bold text-[17px]">
            All tables
          </h3>

          <div className="flex gap-3">
            <div className="flex items-center justify-center gap-1">
              <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
              <p className="font-medium text-sm">Available</p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
              <p className="font-medium text-sm">Reserved</p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
              <p className="font-medium text-sm">Occupied</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          {tables.length === 0 ? (
            <p className="text-gray-500 w-full text-center p-3">
              No tables added yet
            </p>
          ) : (
            [...tables]
            .sort((a, b) => a.tableNumber - b.tableNumber)
            .map((table) => (
              <TableCard
                key={table.id}
                table={table}
                onDelete={handleDelete}
                openStatusForm={() => setActiveTable(table)}
              />
            ))
          )}
        </div>
      </div>
      
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-5 rounded-xl shadow-lg text-center">
            <p className="font-medium mb-4">
              Table number already exists
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    
    </div>
  );
}

export default Tables