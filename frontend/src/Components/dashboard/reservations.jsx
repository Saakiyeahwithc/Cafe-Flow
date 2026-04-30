import { useState } from 'react';
import { BookCheck, SlidersHorizontal, Minus, Plus, Check} from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Reservations(){

    const [reservationForm,setReservationForm]=useState(false);
    const [reservationType,setReservationType]=useState("");
    const [customerName,setCustomerName]=useState("");
    const [contactNumber,setContactNumber]=useState("");
    const [arrivalTime,setArrivalTime]=useState("");
    const [arrivalDate,setArrivalDate]=useState("");
    const [roomNumber,setRoomNumber]=useState("");
    const [tableNumber,setTableNumber]=useState("");
    const [msg,setMsg]=useState("");

    const contactRegex=/^9\d{9}$/;
    const nameRegx = /^[a-zA-Z\s]+$/;

    const validateReservationForm = () => {
        if (!reservationType) {
            setMsg("Must select reservation type first");
            return;
        }

        if (!customerName.trim() || !contactNumber || !arrivalDate || !arrivalTime) {
            setMsg("All fields are required*");
            return;
        }

        if (!contactRegex.test(contactNumber)) {
            setMsg("Invalid contact number");
            return;
        }

        if (!nameRegx.test(customerName)) {
            setMsg("Only letters and spaces allowed");
            return;
        }

        // room validation
        if (reservationType === "room") {
            if (!roomNumber) {
            setMsg("Room number is required");
            return;
            }
        }

        // table validation
        if (reservationType === "table") {
            if (!tableNumber) {
            setMsg("Table number is required");
            return;
            }
        }

        setMsg("");
        setReservationForm(false);
    };

return(
     <div className="flex-1 bg-gray-50 p-8 min-h-screen">
      
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold">
                    Reservation Details
                </h1>
                <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
                    View ans Manage details of customers reserving rooms/tables
                </p>
            </div>
            <div className="flex items-center justify-center">
                <button
                    onClick={() => setReservationForm(true)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center
                    gap-1 hover:bg-blue-700">
                    <Plus className="w-5 h-5" />
                    <p className="font-medium text-sm md:text-[16px]">Add Reservation</p>
                </button>
            </div>
        </div>

        {/* Table Reservations */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 mb-6">
            <div className='flex justify-between p-6 border-b border-gray-100 '>
                <div className="flex items-center gap-2">
                    <BookCheck className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
                    <h3  className="font-bold text-[17px] md:text-[19px] ">
                    Table Reservations
                    </h3>
                </div>

                <button className='flex items-center gap-1 text-gray-600 hover:text-black'>
                    Filter
                    <SlidersHorizontal className='w-5 h-5'/>
                </button>
            </div>

            <div className="w-full max-h-130 overflow-auto">
                <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            #TR
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            Table
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            Customer Name
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Reservation Date
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Start time
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            End time
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Contact No.
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-600 text-sm">
                            1
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            Table 5
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            Name
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            2026-04-28
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            7:00 pm
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            <Minus className="w-5 h-5"/>
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            1111111111
                        </td>
                        
                        <td className="px-6 py-3 text-gray-600 text-sm">
                            <button className='flex items-center justify-center text-green-500 gap-1
                            hover:bg-green-400 hover:text-white py-1 px-2 md:py-2 md:px-3 rounded-4xl'>
                                <Check className='w-6 h-6 xl:w-5 xl:h-5'/>
                                Free Table
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        {/* Room Reservations */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className='flex justify-between p-6 border-b border-gray-100 '>
                <div className="flex items-center gap-2">
                    <BookCheck className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
                    <h3  className="font-bold text-[17px] md:text-[19px] ">
                    Room Reservations
                    </h3>
                </div>

                <button className='flex items-center gap-1 text-gray-600 hover:text-black'>
                    Filter
                    <SlidersHorizontal className='w-5 h-5'/>
                </button>
            </div>

            <div className="w-full max-h-130 overflow-auto">
                <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            #RR
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            Room
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            Customer Name
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Check-in Date
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Check-in time
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Check-out Date
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Check-out time
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Contact No.
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-600 text-sm">
                            1
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            Room 5
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            Name
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            2026-04-28
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            7:30 AM
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            <Minus className="w-5 h-5"/>
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            <Minus className="w-5 h-5"/>
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            1111111111
                        </td>
                        
                        <td className="px-6 py-3 text-gray-600 text-sm">
                            <button className='flex items-center justify-center text-green-500 gap-1
                            hover:bg-green-400 hover:text-white py-1 px-2 md:py-2 md:px-3 rounded-4xl'>
                                <Check className='w-6 h-6 xl:w-5 xl:h-5'/>
                                Free Room
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    
    {reservationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

            <div className="bg-white p-6 rounded-2xl w-90">
                <h2 className="text-xl font-bold mb-4">Add Resevation</h2>
                
                {/* Reservation type */}
                <div className='mb-4'>
                    <p className='font-medium mb-1'>Reservation type:</p>
                    <div className='flex items-center gap-2'>
                        <input
                            type="radio"
                            name="resevType"
                            value="table"
                            checked={reservationType==="table"}
                            onChange={(e)=>{
                                setReservationType(e.target.value);
                                setMsg("");
                            }}
                        /> Table
                       
                        <input
                            type="radio"
                            name="resevType"
                            value="room"
                            checked={reservationType==="room"}
                            onChange={(e)=>{
                                setReservationType(e.target.value);
                                setMsg("");
                            }}
                        /> Room
                    </div>
                </div>

            {/*Customer details */}
            {(reservationType==="room" || reservationType==="table") && (
                <div>
                    <p className="font-medium ">Reserved by:</p>
                    <input
                    type="text"
                    placeholder="Eg: Ram Bahadur"
                    className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    />
                    
                    <p className="font-medium"> Contact Number:</p>
                    <input
                    type="tel"
                    placeholder="9XXXXXXXXX"
                    className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    />

                    {reservationType==="room" && (
                    <>
                        <p className="font-medium"> Room Number:</p>
                        <input
                        type="number"
                        placeholder='X'
                        className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(Number(e.target.value))}
                        />
                    </>
                    )}

                    {reservationType=="table" && (
                    <>
                        <p className="font-medium"> Table Number:</p>
                            <input
                            type="number"
                            placeholder='X'
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(Number(e.target.value))}
                            />
                    </>
                    )}

                    <p className="font-medium ">{reservationType==="room"?"Check-in Time:":"Guest Arrival Time:"}</p>
                        <input
                        type="time"
                        placeholder=""
                        className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        />

                    <p className="font-medium ">{reservationType==="room"?"Check-in Date:":"Guest Arrival Date:"}</p>
                    <DatePicker
                        selected={arrivalDate}
                        onChange={(date) => setArrivalDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select date"
                        className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                    />
                </div>
            )}

                <p className="text-red-500 font-medium text-sm mt-2 mb-5">{msg}</p>

                <div className="flex justify-between items-center">
                    <button
                        onClick={()=>{setReservationForm(false);
                            setReservationType("");
                        }}
                        className="bg-red-400 text-white font-medium rounded-xl 
                        px-3 py-2 hover:bg-red-500">
                        Cancel
                    </button>

                    <button
                        onClick={validateReservationForm}
                        className="px-3 py-2 bg-green-400 text-white font-medium 
                        rounded-xl hover:bg-green-500">
                        Confirm
                    </button>
                </div>

            </div>

        </div>
    )}

    </div>

)
}

export default Reservations