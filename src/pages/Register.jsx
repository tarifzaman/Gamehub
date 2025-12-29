import { updateProfile } from "firebase/auth";
import { Lock, Mail, User, Gamepad2 } from "lucide-react"; // Gamepad2 যোগ করা হয়েছে
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        updateProfile(loggedUser, {
          displayName: name,
        })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            setError("Profile update failed: " + err.message);
          });
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("Email already exists. Please login.");
        } else {
          setError(err.message);
        }
      });
  };

  const handleGoogleRegister = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((err) => setError(err.message));
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
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Join the gaming community</p>
        </div>

        {error && (
          <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg mb-4 border border-red-100 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3.5 border border-teal-50 rounded-xl outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50/30 transition-all"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3.5 border border-teal-50 rounded-xl outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50/30 transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input
              name="password"
              type="password"
              placeholder="Create Password"
              className="w-full pl-10 pr-4 py-3.5 border border-teal-50 rounded-xl outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50/30 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-black py-4 rounded-xl shadow-lg shadow-teal-100 hover:shadow-teal-200 transition-all active:scale-95 uppercase tracking-widest italic"
          >
            Register Now
          </button>
        </form>

        <div className="divider my-8 text-[10px] text-gray-400 font-black uppercase tracking-widest">
          Quick Registration
        </div>

        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 border-2 border-teal-50 py-3.5 rounded-xl hover:bg-teal-50 transition-all font-black text-teal-800 text-sm uppercase tracking-tighter"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="mt-10 text-center text-gray-500 font-medium">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-teal-600 font-black hover:text-cyan-600 transition-colors ml-1 underline decoration-2 underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;