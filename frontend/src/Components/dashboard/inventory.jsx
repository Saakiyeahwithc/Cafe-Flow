import { useState } from "react"
import { Plus, Trash2, Phone, Mail, MapPin } from 'lucide-react';

function Inventory() {

    const [supplierName,setSupplierName]=useState("");
    const [category,setCategory]=useState("");
    const [contactNumber,setContactNumber]=useState("");
    const [email, setEmail]=useState("");
    const [location, setLocation]=useState("");
    const [showForm,setShowForm]=useState(false);
    const [msg,setMsg]=useState("");

    return(
        <div className="flex-1 min-h-screen p-8 bg-gray-50">

            {/* Header */}
            <div className="flex justify-between gap-3 mb-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold">
                        Inventory Management
                    </h1>
                    <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
                        Manage your supplier and dealer information
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-2 py-2 rounded-lg flex items-center
                        gap-1 hover:bg-blue-700"
                        >
                        <Plus className="w-4 h-4 md:w-5 md:h-5"  />
                        <p className="font-medium text-sm md:text-[16px]">Add Supplier</p>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* {dealers.map((dealer) => ( */}
                <div /* key={dealer.id}  */className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                                    {/* {dealer.name} */}Name
                                </h3>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium text-xs md:text-sm">
                                {/* {dealer.category} */} Fruits & Vegetables
                                </span>
                            </div>

                            <p className="text-slate-600 font-medium mb-3 text-sm md:text-[17px]">
                                {/* {dealer.company} */}XYZ Company
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* {dealer.phone && ( */}
                                <div className="flex items-center gap-2 text-slate-600">
                                <Phone size={16} />
                                <span className="text-sm">{/* {dealer.phone} */}1111111111</span>
                                </div>
                            {/* )} */}

                            {/* {dealer.email && ( */}
                                <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={16} />
                                <span className="text-sm">{/* {dealer.email} */}xyz@gmail.com</span>
                                </div>
                            {/* )} */}
                            
                            {/* {dealer.address && ( */}
                                <div className="flex items-center gap-2 text-slate-600">
                                <MapPin size={16} />
                                <span className="text-sm">{/* {dealer.address} */}xyz road, xyz city</span>
                                </div>
                            {/* )} */}
                            </div>
                        </div>
                        <button
                            /* onClick={() => handleDeleteDealer(dealer.id)} */
                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Delete supplier"
                        >
                            <Trash2 className='w-4.5 h-4.5 md:w-5.5 md:h-5.5'/>
                        </button>
                    </div>

                    
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                                    Name2
                                </h3>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium text-xs md:text-sm">
                                Meat & Poultry
                                </span>
                            </div>

                            <p className="text-slate-600 font-medium mb-3 text-sm md:text-[17px]">
                                ABC Company
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* {dealer.phone && ( */}
                                <div className="flex items-center gap-2 text-slate-600">
                                <Phone size={16} />
                                <span className="text-sm">2222222222</span>
                                </div>
                            {/* )} */}

                            {/* {dealer.email && ( */}
                                <div className="flex items-center gap-2 text-slate-600">
                                <Mail size={16} />
                                <span className="text-sm">{/* {dealer.email} */}Abc@gmail.com</span>
                                </div>
                            {/* )} */}
                            
                            {/* {dealer.address && ( */}
                                <div className="flex items-center gap-2 text-slate-600">
                                <MapPin size={16} />
                                <span className="text-sm">{/* {dealer.address} */}abc path, mno city</span>
                                </div>
                            {/* )} */}
                            </div>
                        </div>
                        <button
                            /* onClick={() => handleDeleteDealer(dealer.id)} */
                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Delete supplier"
                        >
                            <Trash2 className='w-4.5 h-4.5 md:w-5.5 md:h-5.5'/>
                        </button>
                    </div>

                    
                </div>
                {/* ))} */}
            </div>

         {/*    {dealers.length === 0 && (
                <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500">No dealers added yet. Click "Add Dealer" to get started.</p>
                </div>
            )} */}
            {showForm && (
                 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

                    <div className="bg-white p-6 rounded-2xl w-90">
                        <h2 className="text-xl font-bold mb-4">Add Supplier</h2>

                        <div>
                            <p className="font-medium ">Supplier Name:</p>
                            <input
                            type="text"
                            placeholder="Eg: Ram Bahadur"
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            />

                            <p className="font-medium ">Category:</p>
                            <input
                            type="text"
                            placeholder="Eg: Fruits/ Meat/ Poultry..."
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            />

                            <p className="font-medium ">Contact Number:</p>
                            <input
                            type="tel"
                            placeholder="9XXXXXXXXX"
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            />

                            <p className="font-medium ">Email Address:</p>
                            <input
                            type="email"
                            placeholder="example@email.com"
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />

                            <p className="font-medium ">Location:</p>
                            <input
                            type="text"
                            placeholder="street, city"
                            className="border-2 p-2 mt-2 mb-3 rounded-lg w-full"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                

                        <p className="text-red-500 font-medium text-sm mt-2 mb-5">{msg}</p>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={()=>setShowForm(false)}
                                className="bg-red-400 text-white font-medium rounded-xl 
                                px-3 py-2 hover:bg-red-500">
                                Cancel
                            </button>

                            <button
                                onClick={()=>setShowForm(false)}
                                className="px-3 py-2 bg-green-400 text-white font-medium 
                                rounded-xl hover:bg-green-500">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
    );
}

export default Inventory