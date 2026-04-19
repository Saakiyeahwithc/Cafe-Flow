import { useState } from "react"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"
import coffee from './assets/coffee.jpg'

function LoginScreen() 
{
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin=()=>{
    if (username === "admin" && password === "123") {
      login("admin");
      navigate("/sidebar");
    } 
    
    else if (username === "user" && password === "456") {
      login("user");
      navigate("/sidebar");
    } 
    
    else {
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="bg-[#F5E6D3] min-h-screen flex items-center justify-center">
        <div className="bg-[#FFF8F1] p-8 rounded-2xl shadow-lg w-90 text-center">
       
            <div className="inline-block w-20 h-20 mb-3 rounded-full overflow-hidden">
                <img src={coffee} alt="cafe logo" className="object-cover w-full h-full" />
            </div>
            
            <h1 className="text-xl font-bold mb-2 text-[#4B2E2A]">
                XYZ Cafe
            </h1>
        
            <h1 className='rounded-lg mb-3 bg-[#F5E6D3] text-[17px] text-[#4B2E2A] font-medium p-2'>
                Logging in....</h1>

            <p className="mb-1 font-medium text-start text-[#4B2E2A]"> Username</p>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 mb-3 border border-solid border-[#4B2E2A] bg-white rounded-lg p-2"/>
        
            <p className="mb-1 font-medium text-start text-[#4B2E2A]">Password</p>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 mb-3 border border-solid border-[#4B2E2A] bg-white rounded-lg p-2"/>

            <button onClick={handleLogin}
                className="w-18 h-8 text-[15px] font-medium inline-flex items-center justify-center bg-[#4B2E2A] text-[#FFF8F1] rounded-lg mr-3 hover:bg-[#3B221F]"
            >Login</button>

            <button onClick={()=>navigate("/")}
                className="w-18 h-8 text-[15px] font-medium inline-flex items-center justify-center bg-[#4B2E2A] text-[#FFF8F1] rounded-lg hover:bg-[#3B221F]">
                Back
            </button>
            <p>{msg}</p>
        </div>
    </div>
  );
}

export default LoginScreen