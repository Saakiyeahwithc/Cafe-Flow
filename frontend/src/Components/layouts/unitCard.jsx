import { X, UtensilsCrossed } from "lucide-react";
import { BsFillDoorOpenFill } from "react-icons/bs";

function UnitCard({ unit, onDelete, openStatusForm}) {
  const status = unit.status;
  const type = unit.type;

  return (
    <div className="relative group">

      {/* Delete button */}
      <button
        onClick={() => onDelete(unit.id)}
        className="absolute -top-2.5 -right-2.5 z-10 
        w-6 h-6 rounded-full bg-gray-700 hover:bg-red-500 text-white
        opacity-0 group-hover:opacity-100 transition-opacity shadow-md
        grid place-items-center"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Card */}
      <div 
        onClick={openStatusForm}
        className={`w-29 h-40 aspect-square rounded-lg flex flex-col items-center 
        justify-center p-4 hover:scale-103 transition-all shadow-sm
        ${status === "Available" ? "bg-green-400" 
            : status === "Reserved" ? "bg-blue-400"
              : status === "Occupied" ? "bg-red-400" : "bg-orange-400"}
        `}>

        <p className="text-white font-medium text-sm mb-1">
          {unit.customerName}
        </p>

        {type === "room" ? (
          <BsFillDoorOpenFill className="w-6 h-6 text-white" />
        ) : (
          <UtensilsCrossed className="w-6 h-6 text-white" />
        )}

        <p className="text-white font-medium mt-1">
          {type === "room" ? "Room" : "Table"} {unit.number}
        </p>

        <p className="text-white font-medium text-sm">
          {type === "room"
            ? `${unit.capacity===1? `${unit.capacity} bed`:`${unit.capacity} beds`}`
            : `${unit.capacity===1? `${unit.capacity} seat`:`${unit.capacity} seats`}`}
        </p>

        <p className="text-white mt-2 mb-1 font-medium text-sm">
          {unit.status}
        </p>

      </div>

    </div>
  );
}

export default UnitCard