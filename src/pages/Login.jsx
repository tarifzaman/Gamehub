import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, LogIn } from "lucide-react";

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
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-teal-600"><LogIn /></div>
          <h2 className="text-3xl font-black text-teal-800 italic uppercase">Welcome Back</h2>
        </div>

        {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-400" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-400" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-teal-600 transition">Login</button>
        </form>

        <div className="divider my-6 text-xs text-gray-400 font-bold">OR</div>

        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border border-teal-100 py-3 rounded-xl hover:bg-teal-50 transition font-bold">
          <FcGoogle size={20}/> Google Login
        </button>

        <p className="mt-8 text-center text-sm">New here? <Link to="/register" className="text-teal-700 font-black hover:underline">Register Now</Link></p>
      </div>
    </div>
  );
};

export default Login;