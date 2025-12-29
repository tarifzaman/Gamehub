import { updateProfile } from "firebase/auth"; // ইউজারের নাম আপডেট করার জন্য এটি প্রয়োজন
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // রেজিস্ট্রেশন হ্যান্ডলার
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // পাসওয়ার্ড ভ্যালিডেশন
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // ১. নতুন ইউজার তৈরি করা
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;

        // ২. ইউজারের প্রোফাইলে 'DisplayName' আপডেট করা
        updateProfile(loggedUser, {
          displayName: name,
        })
          .then(() => {
            console.log("Profile updated with name:", name);
            navigate("/"); // সফলভাবে নাম আপডেট হলে হোমে নিয়ে যাবে
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

  // গুগল রেজিস্ট্রেশন
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
          <h2 className="text-3xl font-black text-teal-800 italic uppercase">
            Create Account
          </h2>
        </div>

        {error && (
          <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg mb-4 text-center">
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
              className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-400"
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
              className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-teal-600 transition duration-300"
          >
            Register Now
          </button>
        </form>

        <div className="divider my-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
          OR REGISTER WITH
        </div>

        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 border border-teal-100 py-3 rounded-xl hover:bg-teal-50 transition font-bold text-gray-700 shadow-sm"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-600 font-medium">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-teal-700 font-black hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
