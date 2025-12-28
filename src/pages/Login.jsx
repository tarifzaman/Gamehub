import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, LogIn } from "lucide-react"; // icons

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
      .catch((err) => setError("Invalid email or password. Please try again."));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-teal-300 to-cyan-200 px-4 py-12">
      
      {/* Background Decorations (Same as Register) */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-10 border border-white/20">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-teal-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-teal-800 tracking-tight italic uppercase">
            Welcome Back
          </h2>
          <p className="text-teal-600/70 mt-2 text-sm font-medium">
            Enter your credentials to access GameHub
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl animate-pulse">
            <p className="text-red-700 text-xs font-bold">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5 transition-colors group-focus-within:text-teal-700" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all placeholder:text-teal-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5 transition-colors group-focus-within:text-teal-700" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all placeholder:text-teal-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-xs text-teal-700 font-bold hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-200 transition-all hover:-translate-y-1 active:scale-[0.98]">
            Login to Account
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-teal-100"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/0 px-2 text-teal-500 font-bold">OR LOGIN WITH</span>
          </div>
        </div>

        {/* Social Login */}
        <button 
          onClick={handleGoogleLogin} 
          className="w-full flex items-center justify-center gap-3 bg-white border border-teal-100 py-3 rounded-xl shadow-sm hover:bg-teal-50 transition-all font-semibold text-gray-700 active:scale-95"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-700 font-extrabold hover:text-teal-500 transition-colors hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;