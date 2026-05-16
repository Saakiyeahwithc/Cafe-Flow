import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableReservations from "./tablereservation";
import RoomReservations from "./roomreservation";
import { useRooms } from "../../../hooks/useroom.jsx";
import { useTables } from "../../../hooks/usetable.jsx";

import { privateAPI } from "../../../auth/config/api.js";

function Reservations() {
  const [reservationForm, setReservationForm] = useState(false);
  const [reservationType, setReservationType] = useState("");
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [roomId, setRoomId] = useState("");
  const [tableId, setTableId] = useState("");
  const [view, setView] = useState("table");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [tableReservations, setTableReservations] = useState([]);
  const [roomReservations, setRoomReservations] = useState([]);

  // Pull all tables and rooms from your existing hooks
  const { tables, fetchTables } = useTables();
  const { rooms, fetchRooms } = useRooms();

  const fetchTableReservations = async () => {
    try {
      const res = await privateAPI.get("/table-reservations");
      console.log(res.data.data);

      setTableReservations(res.data.data);
    } catch (error) {
      console.error("Error fetching table reservations:", error);
    }
  };

  const fetchRoomReservations = async () => {
    try {
      const res = await privateAPI.get("/room-reservations");
      console.log(res.data.data);

      setRoomReservations(res.data.data);
    } catch (error) {
      console.error("Error fetching room reservations:", error);
    }
  };

  useState(() => {
    fetchTableReservations();
    fetchRoomReservations();
    fetchTables();
    fetchRooms();
  }, []);

  const deleteTableReservation = async (id) => {
    try {
      await privateAPI.delete(`/table-reservations/${id}`);
      fetchTableReservations();
    } catch (error) {
      console.error("Error deleting table reservation:", error);
    }
  };

  const deleteRoomReservation = async (id) => {
    try {
      await privateAPI.delete(`/room-reservations/${id}`);
      fetchRoomReservations();
    } catch (error) {
      console.error("Error deleting room reservation:", error);
    }
  };

  // Filter tables: status "Available" and capacity >= guestCount
  const availableTables = useMemo(() => {
    if (!guestCount || Number(guestCount) < 1 || !tables) return [];
    return tables.filter(
      (t) =>
        (t.status === "Available" || t.status === "Reserved") &&
        t.capacity >= Number(guestCount),
    );
  }, [tables, guestCount]);

  // Filter rooms: status "available" (lowercase per schema) and capacity >= guestCount
  const availableRooms = useMemo(() => {
    if (!guestCount || Number(guestCount) < 1 || !rooms) return [];
    return rooms.filter(
      (r) =>
        (r.status === "Available" || r.status === "Reserved") &&
        r.capacity >= Number(guestCount),
    );
  }, [rooms, guestCount]);

  const handleGuestCountChange = (e) => {
    setGuestCount(e.target.value);
    // Reset selection when guest count changes
    setTableId("");
    setRoomId("");
  };

  const handleReservationTypeChange = (e) => {
    setReservationType(e.target.value);
    setTableId("");
    setRoomId("");
    setGuestCount("");
    setMsg("");
  };

  const contactRegex = /^9\d{9}$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  const formatTime = (time) => {
    if (!time) return "N/A";
    const [hours, minutes] = time.split(":");
    let h = Number(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
    return `${h}:${minutes} ${ampm}`;
  };

  const resetForm = () => {
    setMsg("");
    setPhone("");
    setGuestName("");
    setRoomId("");
    setTableId("");
    setCheckInDate("");
    setCheckInTime("");
    setGuestCount("");
    setReservationType("");
    setReservationForm(false);
  };

  const formatDateForAPI = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const validateAndSubmit = async () => {
    if (!reservationType) {
      setMsg("Must select reservation type first");
      return;
    }

    if (
      !guestName.trim() ||
      !phone ||
      !checkInDate ||
      !checkInTime ||
      !guestCount
    ) {
      setMsg("All fields are required*");
      return;
    }

    if (!contactRegex.test(phone)) {
      setMsg("Invalid contact number (must start with 9 and be 10 digits)");
      return;
    }

    if (!nameRegex.test(guestName)) {
      setMsg("Name: only letters and spaces allowed");
      return;
    }

    if (Number(guestCount) < 1) {
      setMsg("Guest count must be at least 1");
      return;
    }

    if (reservationType === "room" && !roomId) {
      setMsg("Please select a room");
      return;
    }

    if (reservationType === "table" && !tableId) {
      setMsg("Please select a table");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const payload = {
        guest_name: guestName.trim(),
        phone,
        guest_count: Number(guestCount),
        check_in_date: formatDateForAPI(checkInDate),
        check_in_time: checkInTime,
        reservation_date: formatDateForAPI(checkInDate),
        reservation_time: checkInTime,
      };

      if (reservationType === "room") {
        await privateAPI.post(`/room-reservations/${roomId}/create`, payload);
        fetchRoomReservations();
      } else {
        await privateAPI.post(`/table-reservations/${tableId}/create`, payload);
        fetchTableReservations();
      }

      resetForm();
    } catch (error) {
      const serverMsg = error?.response?.data?.message;
      setMsg(serverMsg || "Error creating reservation. Please try again.");
      console.error("Error creating reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderDropdown = (type) => {
    const isTable = type === "table";
    const list = isTable ? availableTables : availableRooms;
    const selectedId = isTable ? tableId : roomId;
    const setId = isTable ? setTableId : setRoomId;

    if (!guestCount || Number(guestCount) < 1) {
      return (
        <select
          disabled
          className="border-2 p-2 mt-2 mb-3 rounded-lg w-full bg-white opacity-50 cursor-not-allowed"
        >
          <option>Enter guest count first</option>
        </select>
      );
    }

    if (list.length === 0) {
      return (
        <p className="text-sm text-red-400 mt-2 mb-3">
          No available {isTable ? "tables" : "rooms"} for {guestCount} guest(s).
        </p>
      );
    }

    return (
      <select
        className="border-2 p-2 mt-2 mb-3 rounded-lg w-full bg-white"
        value={selectedId}
        onChange={(e) => setId(e.target.value)}
      >
        <option value="">Select a {isTable ? "table" : "room"}</option>
        {list.map((item) =>
          isTable ? (
            <option key={item.table_id} value={item.table_id}>
              Table {item.table_number} — Capacity: {item.capacity}
            </option>
          ) : (
            <option key={item.room_id} value={item.room_id}>
              Room {item.room_number} — {item.category ?? "Standard"} —
              Capacity: {item.capacity} — Rs.{item.price_per_night}/night
            </option>
          ),
        )}
      </select>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Reservation Details</h1>
          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            View and Manage details of customers reserving rooms/tables
          </p>
        </div>
        <button
          onClick={() => setReservationForm(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center
                  gap-1 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <p className="font-medium text-sm md:text-[16px]">Add Reservation</p>
        </button>
      </div>

      {/* View Selection */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setView("table")}
          className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-[15px] md:text-lg font-medium
              ${view === "table" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
        >
          Table
        </button>
        <button
          onClick={() => setView("room")}
          className={`px-8 py-3 rounded-2xl shadow-sm border border-slate-200 text-[15px] md:text-lg font-medium
              ${view === "room" ? "bg-blue-100 border-blue-200" : "bg-white hover:bg-gray-200"}`}
        >
          Room
        </button>
      </div>

      {view === "table" && (
        <TableReservations
          key={tableReservations.table_reservation_id}
          tableReservations={tableReservations}
          deleteTableReservation={deleteTableReservation}
          formatTime={formatTime}
        />
      )}

      {view === "room" && (
        <RoomReservations
          key={roomReservations.room_reservation_id}
          roomReservations={roomReservations}
          deleteRoomReservation={deleteRoomReservation}
          formatTime={formatTime}
        />
      )}

      {/* Reservation Modal */}
      {reservationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 overflow-y-auto max-h-screen">
            <h2 className="text-xl font-bold mb-4">Add Reservation</h2>

            {/* Reservation type */}
            <div className="mb-4">
              <p className="font-medium mb-1">Reservation type:</p>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="resevType"
                    value="table"
                    checked={reservationType === "table"}
                    onChange={handleReservationTypeChange}
                  />
                  Table
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="resevType"
                    value="room"
                    checked={reservationType === "room"}
                    onChange={handleReservationTypeChange}
                  />
                  Room
                </label>
              </div>
            </div>

            {(reservationType === "room" || reservationType === "table") && (
              <div>
                <p className="font-medium">Reserved by:</p>
                <input
                  type="text"
                  placeholder="Eg: Ram Bahadur"
                  className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />

                <p className="font-medium">Contact Number:</p>
                <input
                  type="tel"
                  placeholder="9XXXXXXXXX"
                  className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                {/* Guest count — drives the dropdowns below */}
                <p className="font-medium">Guest Count:</p>
                <input
                  type="number"
                  placeholder="Number of guests"
                  className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                  min={1}
                  value={guestCount}
                  onChange={handleGuestCountChange}
                />

                {reservationType === "table" && (
                  <>
                    <p className="font-medium">Select Table:</p>
                    {renderDropdown("table")}
                  </>
                )}

                {reservationType === "room" && (
                  <>
                    <p className="font-medium">Select Room:</p>
                    {renderDropdown("room")}
                  </>
                )}

                <p className="font-medium">
                  {reservationType === "room"
                    ? "Check-in Time:"
                    : "Guest Arrival Time:"}
                </p>
                <input
                  type="time"
                  className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                />

                <p className="font-medium">
                  {reservationType === "room" ? "Check-in Date:" : "Date:"}
                </p>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select date"
                  className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                  wrapperClassName="w-full"
                  minDate={new Date()}
                />
              </div>
            )}

            {msg && (
              <p className="text-red-500 font-medium text-sm mt-2 mb-3">
                {msg}
              </p>
            )}

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={resetForm}
                disabled={loading}
                className="bg-red-400 text-white font-medium rounded-xl
                          px-3 py-2 hover:bg-red-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={validateAndSubmit}
                disabled={loading}
                className="px-3 py-2 bg-green-400 text-white font-medium
                          rounded-xl hover:bg-green-500 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservations;
