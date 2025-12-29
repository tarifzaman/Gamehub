import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { User, Lock, ArrowLeft, Save } from "lucide-react";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ১. নাম আপডেট করার লজিক
      await updateProfile(user, {
        displayName: name,
      });

      // ২. পাসওয়ার্ড আপডেট করার লজিক (যদি ইনপুট ফিল্ডে কিছু লেখা হয়)
      if (newPassword) {
        if (newPassword.length < 6) {
          toast.error("Password must be at least 6 characters!");
          setLoading(false);
          return;
        }
        await updatePassword(user, newPassword);
      }

      toast.success("Profile & Password Updated!");
      setLoading(false);
      setTimeout(() => navigate("/"), 1500);
      
    } catch (error) {
      // যদি অনেকক্ষণ আগে লগইন করা থাকে, Firebase সিকিউরিটির জন্য 'recent login' চাইতে পারে
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please re-login to change password.");
      } else {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <Toaster />
      
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 md:p-10 border border-white">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-teal-600 font-bold hover:underline"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-teal-900 uppercase italic tracking-tighter">
            Account Settings
          </h2>
          <p className="text-gray-500 font-medium italic">Update your name or secure your account</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-teal-700 ml-2">New Display Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400" size={20} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new name" 
                className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-teal-400 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-teal-700 ml-2">New Password (Optional)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400" size={20} />
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current" 
                className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-teal-400 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 transition-all"
              />
            </div>
            <p className="text-[10px] text-gray-400 ml-2 font-bold uppercase italic">Min. 6 characters long</p>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-teal-100 transition-all flex items-center justify-center gap-3 uppercase italic"
          >
            {loading ? <span className="loading loading-spinner"></span> : <><Save size={20} /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;