import { UserRoundPlus } from 'lucide-react'
import { useState } from 'react'

function Signin(){
    const positions = ["Manager", "Barista", "Waiter", "Chef"];
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignin = () => {

    // 
    if (role === "admin" && username === "admin" && password === "123") {
      login("admin");
      navigate("/sidebar");
    }

    // 
    else if (role === "user" && username === "user" && password === "456") {
      login("user");
      navigate("/sidebar");
    }

    // 
    else {
      setMsg("Invalid credentials");
    }
  };
    return(
        <div className="bg-black min-h-screen flex items-center justify-center opacity-[0.9]">
            <div className="bg-[#FFF8F1] p-8 rounded-2xl shadow-lg w-100 text-start">
                <div className="flex items-center justify-start gap-3 mb-3">
                    <UserRoundPlus className="w-5 h-5 text-[#4B2E2A]" />

                    <p className="text-[18px] font-bold text-[#4B2E2A]">
                        Employee Registration
                    </p>
                </div>

                <p className="mb-1 font-medium text-[#4B2E2A]">Full Name*</p>
                <input type="text"
                onChange={(e) => setFullname(e.target.value)}
                className="w-full h-10 mb-3 border border-solid border-[#4B2E2A] bg-white rounded-lg p-2"
                />

                <p className="mb-1 font-medium text-[#4B2E2A]">Username*</p>
                <input type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 mb-3 border border-solid border-[#4B2E2A] bg-white rounded-lg p-2"
                />

                <p className="mb-1 font-medium text-[#4B2E2A]">Position*</p>
                <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full h-10 mb-3 border border-[#4B2E2A] rounded-lg p-2"
                >
                <option value="">Select position</option>
                {positions.map((pos) => (
                    <option key={pos} value={pos.toLowerCase()}>
                    {pos}
                    </option>
                ))}
                </select>

                <p className="mb-1 font-medium text-[#4B2E2A]">Salary*</p>
                <input type="number"
                onChange={(e) => setSalary(e.target.value)}
                className="w-full h-10 mb-3 border border-solid border-[#4B2E2A] bg-white rounded-lg p-2"
                />

                <p className="mb-1 font-medium text-[#4B2E2A]">Password*</p>
                <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 mb-3 border border-solid border-[#4B2E2A] bg-white rounded-lg p-2"
                />

                <p className="mb-1 font-medium text-[#4B2E2A]">Confirm Password*</p>
                <input type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-10 mb-3 border border-solid border-[#4B2E2A] bg-white rounded-lg p-2"
                />
            
             <p className='font-medium text-sm mb-5 text-gray-600'>Note: Every field with * is required</p>

            <div className='flex justify-between items-center'>
                <button 
                className="inline-flex w-20 h-9 px-4 py-3 text-[15px] font-medium items-center justify-center bg-[#4B2E2A] text-white rounded-lg hover:bg-[#361f1c]">
                Register
                </button>

                <button 
                onClick={()=>navigate("/")}
                className="inline-flex w-20 h-9 px-4 py-3 text-[15px] font-medium items-center justify-center bg-transparent text-[#4B2E2A] rounded-lg hover:bg-[#F5E6D3] border-2 border-[#4B2E2A]">
                Cancel
                </button>
            </div>
                
            </div>
        
        </div>
    )
}
export default Signin