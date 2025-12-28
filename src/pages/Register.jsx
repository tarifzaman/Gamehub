import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-teal-200 to-cyan-200 px-4">
      {/* Main Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-teal-800">Create Account</h2>
          <p className="text-teal-600 mt-2 text-sm">Join our community today</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none placeholder:text-teal-300 transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none placeholder:text-teal-300 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none placeholder:text-teal-300 transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none placeholder:text-teal-300 transition-all"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" className="w-4 h-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
            <span className="text-xs text-gray-600">
              I accept the <button type="button" className="text-teal-700 font-bold hover:underline">Terms of Service</button>
            </span>
          </div>

          {/* Register Button */}
          <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-200 transition-all hover:-translate-y-1 active:scale-[0.98]">
            Create Free Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already a member?{" "}
          <Link to="/login" className="text-teal-700 font-bold hover:text-teal-500 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
