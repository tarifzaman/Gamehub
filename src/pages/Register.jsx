import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; // Google আইকন ইমপোর্ট করুন

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext); // googleLogin যোগ করা হয়েছে
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // ইমেইল-পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    createUser(email, password)
      .then(() => navigate("/"))
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') setError("Email already exists. Login instead.");
        else setError(err.message);
      });
  };

  // গুগল দিয়ে রেজিস্ট্রেশন/লগইন
  const handleGoogleRegister = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-teal-600">
            <UserPlus />
          </div>
          <h2 className="text-3xl font-black text-teal-800 italic uppercase">Create Account</h2>
        </div>

        {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input name="name" type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-400" required />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input name="email" type="email" placeholder="Email" className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-400" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input name="password" type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-400" required />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-teal-600 transition">Register</button>
        </form>

        {/* Divider যোগ করা হয়েছে */}
        <div className="divider my-6 text-xs text-gray-400 font-bold uppercase tracking-widest">OR REGISTER WITH</div>

        {/* Google Register Button */}
        <button 
          onClick={handleGoogleRegister} 
          className="w-full flex items-center justify-center gap-3 border border-teal-100 py-3 rounded-xl hover:bg-teal-50 transition font-bold text-gray-700 shadow-sm"
        >
          <FcGoogle size={24}/> Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already a member? <Link to="/login" className="text-teal-700 font-black hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;