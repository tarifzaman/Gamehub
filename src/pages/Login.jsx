import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, Gamepad2 } from "lucide-react"; // Gamepad2 ইমপোর্ট করা হয়েছে

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    loginUser(email, password)
      .then(() => navigate("/"))
      .catch(() => setError("Invalid email or password."));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
        
        {/* Header Section: Logo & Brand */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2 group">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-2xl shadow-lg shadow-teal-200 group-hover:rotate-12 transition-transform">
              <Gamepad2 className="text-white w-8 h-8" />
            </div>
            <span className="text-4xl font-black tracking-tighter text-teal-800 uppercase italic">
              Game<span className="text-cyan-500">Hub</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Login to your account</p>
        </div>

        {error && (
          <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg mb-4 border border-red-100 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-10 pr-4 py-3.5 border border-teal-50 rounded-xl outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50/30 transition-all" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-10 pr-4 py-3.5 border border-teal-50 rounded-xl outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50/30 transition-all" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-black py-4 rounded-xl shadow-lg shadow-teal-100 hover:shadow-teal-200 transition-all active:scale-95 uppercase tracking-widest italic"
          >
            Login
          </button>
        </form>

        <div className="divider my-8 text-[10px] text-gray-400 font-black uppercase tracking-widest">Secure Social Login</div>

        <button 
          onClick={handleGoogleLogin} 
          className="w-full flex items-center justify-center gap-3 border-2 border-teal-50 py-3.5 rounded-xl hover:bg-teal-50 transition-all font-black text-teal-800 text-sm uppercase tracking-tighter"
        >
          <FcGoogle size={24}/> Continue with Google
        </button>

        <p className="mt-10 text-center text-gray-500 font-medium">
          New to the hub? <Link to="/register" className="text-teal-600 font-black hover:text-cyan-600 transition-colors ml-1 underline decoration-2 underline-offset-4">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;