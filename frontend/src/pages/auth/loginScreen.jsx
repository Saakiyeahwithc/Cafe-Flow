import { useState } from "react";
import { useNavigate} from "react-router-dom";
import coffee from "../../assets/images/coffee.jpg";

function LoginScreen() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = () => {
    // admin validation
    if (username === "admin" && password.toLowerCase().trim() === "password") {
      navigate("/dashboard");
    }

    // user validation
    else if (username === "user" && password === "456") {
      navigate("/dashboard");
    }

    // invalid
    else {
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="bg-[#F5E6D3] min-h-screen flex items-center justify-center">
      <div className="bg-[#FFF8F1] p-8 rounded-2xl shadow-lg w-100 text-center">
        <div className="inline-block w-20 h-20 mb-3 rounded-full overflow-hidden">
          <img
            src={coffee}
            alt="logo"
            className="object-cover w-full h-full"
          />
        </div>

        <h1 className="text-xl font-bold mb-2 text-[#4B2E2A]">XYZ Cafe</h1>

        <h1 className="rounded-lg mb-3 bg-[#F5E6D3] text-[19px] text-[#4B2E2A] font-medium p-2">
          Login
        </h1>

        <p className="mb-1 font-medium text-lg text-start text-[#4B2E2A]">Username</p>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-10 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
        />

        <p className="mb-1 font-medium text-lg text-start text-[#4B2E2A]">Password</p>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
        />

        <p className="mb-5 font-medium text-sm text-red-600">{msg}</p>

        <button
          onClick={handleLogin}
          className="text-lg px-4 py-1.5 font-medium
          bg-[#4B2E2A] text-[#FFF8F1] rounded-lg hover:bg-[#3B221F]">
          Login
        </button>

        <div className="flex flex-col items-center mt-6 gap-3 mb-1">
          <p className="text-gray-600 font-medium">Don't have an account? Sign up</p>
          <button 
          onClick={()=>navigate("/signup")}
          className="inline-flex px-4 py-1.5 text-lg font-medium items-center justify-center bg-transparent text-[#4B2E2A] rounded-lg hover:bg-[#F5E6D3] border-2 border-[#4B2E2A]">
          Sign up
        </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
