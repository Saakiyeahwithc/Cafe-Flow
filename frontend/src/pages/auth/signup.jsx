import { UserRoundPlus, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const titles = ["Manager", "Barista", "Waiter", "Chef"];

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSignup = () => {
    // Trim inputs
    const name = fullname.trim();
    const user = username.trim();

    // Regex rules
    const nameRegex = /^[A-Za-z\s]+$/;
    const usernameRegex = /^[A-Za-z0-9._]+$/;

    // Required field check
    if (!name || !user || !title || !password || !confirmPassword) {
      setMsg("All fields are required*");
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
    <div className="bg-[#F5E6D3] h-screen flex items-center justify-end">
      <img
        src="./src/assets/images/piqsels.jpg"
        alt="image"
        className="w-full
        h-full
        object-cover absolute inset-0 blur-xs"
      />
      <div className="backdrop-blur-3xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg w-100 text-center mr-50">
        <div className=" w-full text-start ">
          <div className="flex items-center justify-start gap-3 mb-5">
            <UserRoundPlus className="w-5 h-5 text-white" />

            <p className="text-[18px] font-bold text-white">
              Employee Registration
            </p>
          </div>

          <p className="mb-1 font-medium text-white">Full Name*</p>
          <input
            type="text"
            placeholder="Eg: Ram Bahadur"
            onChange={(e) => setFullname(e.target.value)}
            className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
          />

          <p className="mb-1 font-medium text-white">Username*</p>
          <input
            type="text"
            placeholder="Eg: rambahadur"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-9 mb-3 border border-[#4B2E2A] bg-white rounded-lg p-2"
          />

          <p className="mb-1 font-medium text-white">Job title*</p>
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 border border-[#4B2E2A] rounded-lg bg-white p-2"
          >
            <option value="" hidden>
              Select Job title
            </option>
            {titles.map((title) => (
              <option key={title} value={title.toLowerCase()}>
                {title}
              </option>
            ))}
          </select>

          <p className="mb-1 font-medium text-white">Password*</p>

          <div className="mb-3 border border-[#4B2E2A] bg-white rounded-lg flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-full p-2 rounded-lg"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-600 p-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p className="mb-1 font-medium text-white">Confirm Password*</p>
          <div className="mb-3 border border-[#4B2E2A] bg-white rounded-lg flex items-center ">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-full rounded-lg p-2"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-600 p-2"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="font-medium text-sm mb-3 text-gray-50">
            Note: Every field with * is required
          </p>

          <p className="mb-5 font-medium text-sm text-black">{msg}</p>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSignup}
              className="inline-flex w-20 h-9 px-4 py-3 text-[15px] font-medium items-center justify-center 
            bg-[#4B2E2A] text-white rounded-lg hover:bg-[#ccc0be] hover:text-[#4B2E2A]"
            >
              Register
            </button>

            <button
              onClick={() => navigate("/")}
              className="inline-flex w-20 h-9 px-4 py-3 text-[15px] font-medium items-center justify-center bg-transparent 
            text-white rounded-lg border-2 border-white hover:bg-[#ccc0be] hover:text-[#4B2E2A] hover:border-[#4B2E2A]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
