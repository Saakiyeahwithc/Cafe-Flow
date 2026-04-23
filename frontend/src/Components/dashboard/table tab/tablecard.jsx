import { X, UtensilsCrossed } from "lucide-react";

function TableCard({ table, onDelete, openStatusForm}) {
  const status = table.status;
  return (
    <div className="relative group">

      {/* Delete button */}
      <button
        onClick={() => onDelete(table.id)}
        className="absolute -top-2 -right-2 z-10 bg-red-400 hover:bg-red-500 text-white 
        rounded-full w-5 h-5 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Card */}
      <div 
        onClick={openStatusForm}
        className={`w-29 h-40 rounded-lg flex flex-col items-center 
        justify-center p-4 hover:scale-103 transition-all shadow-sm
        ${status === "Available" ? "bg-green-400" 
            : status === "Reserved" ? "bg-blue-400"
              : "bg-red-400"}
        `}>

        <p className="text-white font-medium text-sm mb-1">
          {table.customerName}
        </p>

        <UtensilsCrossed className="w-6 h-6 text-white" />

        <p className="text-white font-medium mt-1">
          Table {table.tableNumber}
        </p>

        <p className="text-gray-50 font-medium text-[14px]">
          {table.seats} seats
        </p>

        <p className="text-white mt-2 mb-2 font-medium text-sm">
          {table.status}
        </p>

      </div>

    </div>
  );
}

export default TableCard;