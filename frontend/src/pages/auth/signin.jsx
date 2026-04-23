import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  const titles = ["Manager", "Barista", "Waiter", "Chef"];

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignin = () => {
    // Trim inputs
    const name = fullname.trim();
    const user = username.trim();

    // Regex rules
    const nameRegex = /^[A-Za-z\s]+$/;
    const usernameRegex = /^[A-Za-z0-9._]+$/;

    // Required field check
    if (!name || !user || !title || !salary || !password || !confirmPassword) {
      setMsg("All fields are required");
    }

    // Full name validation (only alphabets + spaces)
    else if (!nameRegex.test(name)) {
      setMsg("Full name can only contain letters and spaces");
    }

    // Username validation (no spaces, only letters, numbers, . and _)
    else if (!usernameRegex.test(user)) {
      setMsg("Username can only contain letters, numbers, . and _");
    }

    // Password length validation
    else if (password.length < 6) {
      setMsg("Password must be at least 6 characters long");
    }

    // Password match validation
    else if (password !== confirmPassword) {
      setMsg("Passwords do not match");
    } else {
      setMsg("");
      navigate("/");
    }
  };
  return (
    <div className="bg-[#F5E6D3] min-h-screen flex items-center justify-center opacity-[0.9]">
      <div className="bg-[#FFF8F1] p-8 rounded-2xl shadow-lg w-100 h-170 flex  justify-center items-center">
        <div className=" w-full text-start ">
          <div className="flex items-center justify-start gap-3 mb-5">
            <UserRoundPlus className="w-5 h-5 text-[#4B2E2A]" />

            <p className="text-[18px] font-bold text-[#4B2E2A]">
              Employee Registration
            </p>
          </div>

          <p className="mb-1 font-medium text-[#4B2E2A]">Full Name*</p>
          <input
            type="text"
            onChange={(e) => setFullname(e.target.value)}
            className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
          />

          <p className="mb-1 font-medium text-[#4B2E2A]">Username*</p>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
          />

          <p className="mb-1 font-medium text-[#4B2E2A]">Job title*</p>
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-9 mb-3 border border-[#4B2E2A] rounded-lg px-2 
          bg-white "
          >
            <option value="">Select title</option>
            {titles.map((title) => (
              <option key={title} value={title.toLowerCase()}>
                {title}
              </option>
            ))}
          </select>

          <p className="mb-1 font-medium text-[#4B2E2A]">Salary*</p>
          <input
            type="number"
            onChange={(e) => setSalary(e.target.value)}
            className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
          />

          <p className="mb-1 font-medium text-[#4B2E2A]">Password*</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
          />

          <p className="mb-1 font-medium text-[#4B2E2A]">Confirm Password*</p>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
          />

          <p className="font-medium text-sm mb-3 text-gray-600">
            Note: Every field with * is required
          </p>

          <p className="mb-5 font-medium text-sm text-red-600">{msg}</p>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSignin}
              className="inline-flex w-20 h-9 px-4 py-3 text-[15px] font-medium items-center justify-center 
            bg-[#4B2E2A] text-white rounded-lg hover:bg-green-400"
            >
              Register
            </button>

            <button
              onClick={() => navigate("/")}
              className="inline-flex w-20 h-9 px-4 py-3 text-[15px] font-medium items-center justify-center bg-transparent 
            text-[#4B2E2A] rounded-lg border-2 border-[#4B2E2A] hover:bg-red-400 hover:text-white hover:border-0 "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signin;
