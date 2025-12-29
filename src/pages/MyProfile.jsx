import {
    Calendar,
    Camera,
    LogOut,
    Mail,
    ShieldCheck,
    User,
  } from "lucide-react";
  import { useContext } from "react";
  import { useNavigate } from "react-router-dom";
  import { AuthContext } from "../provider/AuthProvider";
  
  const MyProfile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout()
        .then(() => navigate("/login"))
        .catch((err) => console.log(err));
    };
  
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg text-teal-500"></div>
            <p className="mt-4 text-teal-800 font-bold italic uppercase">
              Loading Gamer Profile...
            </p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20 relative">
            {/* Cover Background */}
            <div className="h-48 bg-gradient-to-r from-teal-500 to-cyan-500 relative">
              <div className="absolute inset-0 opacity-20 pattern-grid-lg"></div>
            </div>
  
            <div className="px-8 pb-10">
              {/* Avatar Section */}
              <div className="relative -mt-24 mb-6 flex justify-center md:justify-start">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-[35px] ring-8 ring-white overflow-hidden shadow-xl bg-white">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/m9YhxZf/user-placeholder.png"
                      }
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-teal-600 text-white p-2.5 rounded-2xl shadow-lg hover:scale-110 transition-transform border-4 border-white">
                    <Camera size={20} />
                  </button>
                </div>
              </div>
  
              {/* Profile Info Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-black text-teal-900 tracking-tighter uppercase italic">
                    {user?.displayName || "Pro Gamer"}
                  </h1>
                  <p className="text-teal-600 font-bold flex items-center justify-center md:justify-start gap-2 mt-1">
                    <ShieldCheck size={18} /> Verified Member
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => navigate("/settings")}
                    className="btn btn-outline border-teal-200 hover:bg-teal-50 text-teal-700 rounded-2xl px-6"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn bg-red-50 hover:bg-red-100 border-none text-red-600 rounded-2xl px-6"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
  
              <div className="divider my-10 before:bg-teal-50 after:bg-teal-50"></div>
  
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Account Details */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-teal-800 uppercase tracking-[0.2em] mb-4">
                    Account Information
                  </h3>
  
                  <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-3xl border border-teal-50">
                    <div className="bg-white p-3 rounded-2xl text-teal-600 shadow-sm">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Username
                      </p>
                      <p className="font-bold text-gray-800">
                        {user?.displayName || "N/A"}
                      </p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-3xl border border-teal-50">
                    <div className="bg-white p-3 rounded-2xl text-teal-600 shadow-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Email Address
                      </p>
                      <p className="font-bold text-gray-800">{user?.email}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-3xl border border-teal-50">
                    <div className="bg-white p-3 rounded-2xl text-teal-600 shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Member Since
                      </p>
                      <p className="font-bold text-gray-800">
                        {user?.metadata?.creationTime
                          ? new Date(
                              user.metadata.creationTime
                            ).toLocaleDateString()
                          : "Recently Joined"}
                      </p>
                    </div>
                  </div>
                </div>
  
                {/* Gaming Status */}
                <div className="bg-teal-900 rounded-[35px] p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                  <h3 className="text-sm font-black text-teal-400 uppercase tracking-[0.2em] mb-6">
                    GameHub Stats
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-gray-400 font-bold">
                        Games Explored
                      </span>
                      <span className="text-2xl font-black italic">20+</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-gray-400 font-bold">
                        Account Status
                      </span>
                      <span className="bg-teal-500 text-[10px] px-3 py-1 rounded-full font-black uppercase">
                        Active
                      </span>
                    </div>
                    <div className="pt-4">
                      <button className="w-full bg-white text-teal-900 font-black py-4 rounded-2xl hover:bg-teal-50 transition-colors uppercase italic tracking-tighter">
                        Upgrade to Premium
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MyProfile;
  