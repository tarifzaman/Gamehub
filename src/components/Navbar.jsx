import { Gamepad2, LogOut, Settings, User as UserIcon } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout()
      .then(() => navigate("/login"))
      .catch((error) => console.log(error));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-white/70 backdrop-blur-xl sticky top-0 z-[100] px-4 md:px-12 border-b border-teal-50 shadow-sm">
      {/* Navbar Start: Logo & Brand */}
      <div className="navbar-start">
        <Link
          to="/"
          className="flex items-center gap-2 group transition-all duration-300"
        >
          <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-2 rounded-xl shadow-lg shadow-teal-200 group-hover:rotate-12 transition-transform">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-teal-800 uppercase italic">
            Game<span className="text-cyan-500">Hub</span>
          </span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-teal-900/70">
          <li>
            <Link
              to="/"
              className={`hover:text-teal-600 transition-colors ${
                isActive("/") ? "text-teal-600 border-b-2 border-teal-500" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/all-games"
              className={`hover:text-teal-600 transition-colors ${
                isActive("/all-games")
                  ? "text-teal-600 border-b-2 border-teal-500"
                  : ""
              }`}
            >
              All Games
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-5 py-2 text-sm font-bold text-red-500 border-2 border-red-50 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={16} /> Logout
            </button>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="w-11 rounded-2xl ring-2 ring-teal-400 ring-offset-base-100 ring-offset-2 hover:scale-110 transition-transform">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/m9YhxZf/user-placeholder.png"
                    }
                    alt="user profile"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white/95 backdrop-blur-md rounded-2xl w-60 border border-teal-50 space-y-1"
              >
                <li className="px-4 py-3 mb-2 bg-teal-50 rounded-xl">
                  <span className="text-teal-800 font-black block leading-none">
                    {user?.displayName || "Gamer"}
                  </span>
                  <span className="text-[10px] text-teal-600/70 font-bold truncate">
                    {user?.email}
                  </span>
                </li>

                <li>
                  <li>
                    {/* path টিকে "/my-profile" এ পরিবর্তন করুন */}
                    <Link
                      to="/my-profile"
                      className="flex items-center gap-3 py-2 hover:bg-teal-50 rounded-lg group"
                    >
                      <UserIcon
                        size={18}
                        className="text-teal-500 group-hover:scale-110 transition"
                      />
                      <span className="font-bold text-gray-700">
                        My Profile
                      </span>
                    </Link>
                  </li>
                </li>

                <li>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 py-2 hover:bg-teal-50 rounded-lg group"
                  >
                    <Settings
                      size={18}
                      className="text-teal-500 group-hover:rotate-45 transition"
                    />
                    <span className="font-bold text-gray-700">
                      Account Settings
                    </span>
                  </Link>
                </li>

                <div className="divider my-1"></div>

                <li className="md:hidden">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-500 font-black py-2 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-teal-100 transition-all hover:-translate-y-0.5 active:scale-95 text-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
