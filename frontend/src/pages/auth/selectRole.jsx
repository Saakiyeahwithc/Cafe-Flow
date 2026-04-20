import coffee from '../../assets/images/coffee.jpg'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5E6D3] min-h-screen flex items-center justify-center">
      <div className="bg-[#FFF8F1] p-8 rounded-2xl shadow-lg w-90 text-center">

        <div className="inline-block w-20 h-20 mb-3 rounded-full overflow-hidden">
          <img src={coffee} alt="cafe logo" className="object-cover w-full h-full" />
        </div>

        <h1 className="text-xl font-bold mb-2 text-[#4B2E2A]">
          XYZ Cafe
        </h1>

        <p className="text-[#4B2E2A] mb-6">
          Select your role
        </p>

        <button
          onClick={() => navigate("/login", { state: { role: "admin" } })}
          className="w-full h-12 font-medium flex items-center justify-center bg-[#4B2E2A] text-[#FFF8F1] rounded-lg mb-3 hover:bg-[#3B221F]"
        >
          Admin Login
        </button>

        <button
          onClick={() => navigate("/login", { state: { role: "user" } })}
          className="w-full h-12 font-medium flex items-center justify-center bg-[#D8B08C] text-[#4B2E2A] rounded-lg mb-3 hover:bg-[#E3C2A0]"
        >
          User Login
        </button>

        <button 
          onClick={()=>navigate("/signin")}
          className="inline-flex w-18 h-8 text-[15px] font-medium items-center justify-center bg-transparent text-[#4B2E2A] rounded-lg hover:bg-[#F5E6D3] border-2 border-[#4B2E2A]">
          Sign in
        </button>

      </div>
    </div>
  );
}

export default Login