import { Plus } from "lucide-react";
import AddUnit from "../layouts/addunit.jsx";
import UnitCard from "../layouts/unitCard.jsx";
import StatusForm from "../layouts/statusform.jsx";
import { useState, useContext } from "react";
import { UnitContext } from "../../context/cafeContext.jsx";

function Rooms() {
  const [showForm, setShowForm] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { units, addUnit, updateUnit, deleteUnit } = useContext(UnitContext);

  const handleAddRoom = (type, number, capacity) => {
    const success = addUnit({
    type: type,
    number: number,
    capacity: capacity,
    });

    if (!success) {
        setShowPopup(true);
    }
  };

  //for filtering rooms from units
  const rooms = units.filter((u) => u.type === "room");

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">

      {/* Header */}
      <div className="flex justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Room Management
          </h1>

          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            Manage room availability  
          </p>      
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center
            gap-1 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <p className="font-medium text-sm md:text-[16px]">Add Room</p>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-gray-600 text-[17px] mb-1 ">Total Rooms</p>
          <p className="text-gray-900 text-[17px]">{rooms.length}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-green-700 text-[17px] mb-1">Available</p>
          <p className="text-green-900 text-[17px]">{rooms.filter((t) => t.status === "Available").length}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-blue-700 text-[17px] mb-1">Reserved</p>
          <p className="text-blue-900 text-[17px]">{rooms.filter((t) => t.status === "Reserved").length}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-red-700 text-[17px] mb-1">Occupied</p>
          <p className="text-red-900 text-[17px]">{rooms.filter((t) => t.status === "Occupied").length}</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg w-full shadow-sm font-medium">
          <p className="text-orange-700 text-[17px] mb-1">Cleaning</p>
          <p className="text-orange-900 text-[17px]">{rooms.filter((t) => t.status === "Cleaning").length}</p>
        </div>
      </div>

      {/* Room Info Form */}
      {showForm && (
        <AddUnit
          type="room"
          onClose={() => setShowForm(false)}
          onConfirm={(type, number, capacity) => {
          handleAddRoom(type, number, capacity);
          setShowForm(false);
          }}
        />
      )}

      {/* Status Inquiry Form */}
      {activeRoom && (
        <StatusForm
          unit={activeRoom}
          onClose={() => setActiveRoom(null)}
          onConfirm={(status, customerName) => {
          updateUnit(activeRoom.id, status, customerName);
          setActiveRoom(null);
          }}
        />
      )}

      {/* Room List */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-15 justify-between mb-12">
          <h3 className="font-bold text-[16px] md:text-[19px]">
            All rooms
          </h3>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center justify-center gap-1">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-sm"></div>
              <p className="font-medium text-xs md:text-sm">Available</p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-sm"></div>
              <p className="font-medium text-xs md:text-sm">Reserved</p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-red-400 rounded-sm"></div>
              <p className="font-medium text-xs md:text-sm">Occupied</p>
            </div>

            <div className="flex items-center justify-center gap-1">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 rounded-sm"></div>
              <p className="font-medium text-xs md:text-sm">Cleaning</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          {rooms.length === 0 ? (
            <p className="text-gray-500 w-full text-center pb-3">
              No rooms added yet
            </p>
          ) : (
            [...rooms]
            .sort((a, b) => a.number - b.number)
            .map((room) => (
              <UnitCard
                key={room.id}
                unit={room}
                onDelete={()=>deleteUnit(room.id)}
                openStatusForm={() => setActiveRoom(room)}
              />
            ))
          )}
        </div>
      </div>
      
       {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-5 rounded-xl shadow-lg text-center h-40 w-80 flex flex-col items-center justify-center">
            <p className="font-medium text-lg md:text-xl mb-4">
              Room already exists
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white text-sm mt-1 font-medium px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    
    </div>
  );
}

export default Rooms