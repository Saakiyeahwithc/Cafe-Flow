import { useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function StatusForm({ unit, onClose, onConfirm }) {
  const [status, setStatus] = useState(unit.status);
  const [customerName, setCustomerName] = useState(unit.customerName);
  const [guestArrivalDate,setGuestArrivalDate]=useState("");
  const [guestArrivalTime,setGuestArrivalTime]=useState("");
  const [contactNumber,setContactNumber]=useState("");
  const [msg, setMsg] = useState("");

  const nameRegex=/^[a-zA-Z\s]+$/;
  const contactRegex=/^9\d{9}$/;

  const validateStatusForm = () => {
    if(status==="Occupied")
      {
        if(!customerName.trim() || !guestArrivalDate || !guestArrivalTime || !contactNumber)
          {
            setMsg("All fields are required");
            return;
          }

        if (!nameRegex.test(customerName))
          {
            setMsg("Must enter a valid name");
            return;
          }
        if (!contactRegex.test(contactNumber))
          {
            setMsg("Invalid contact number");
            return;
          }
      }
    
    if(status==="Cleaning")
      {
        onConfirm(status, "");
        setMsg("");
        setCustomerName("");
        setStatus("Available");
        return;
      }
      
    onConfirm(status, customerName);
    setMsg("");
    setCustomerName("");
    setStatus("Available");
  }


  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-90">
        <h2 className="text-xl font-bold mb-4">Select {unit.type==="room"?"Room":"Table"} Status</h2>

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
                <p>Occupied</p>
            </div>

            {unit.type==='room' && (
              <div className="flex items-center gap-1">
                <input
                    type="radio"
                    name="status"
                    value="Cleaning"
                    checked={status === "Cleaning"}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <p>Cleaning</p>
              </div>
            )}
        </div>

        {/*Customer details */}
        {(status === "Occupied") && (
          <div className="mb-5">
            <p className="font-medium ">Occupied by:</p>
            <input
              type="text"
              placeholder="Customer name"
              className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            
            <p className="font-medium ">Contact Number:</p>
            <input
              type="tel"
              placeholder="9XXXXXXXXX"
              className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />

            {unit.type==="room" && (
            <>
              <p className="font-medium ">Check-in Time:</p>
              <input
                type="time"
                className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                value={guestArrivalTime}
                onChange={(e) => setGuestArrivalTime(e.target.value)}
              />
            </>
            )}

            <p className="font-medium"> {unit.type==="room"?"Check-in Date:":"Guest Arrival Date:"}</p>
            <DatePicker
                selected={guestArrivalDate}
                onChange={(date) => setGuestArrivalDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
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
            onClick={validateStatusForm}
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