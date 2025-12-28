import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-10 border-b border-base-200">
      {/* Navbar Start: Logo */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-black tracking-tighter text-primary normal-case">
          GAME<span className="text-secondary">HUB</span>
        </Link>
      </div>

      {/* Navbar End: Auth Logic */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-4">
            {/* Desktop Logout Button */}
            <button 
              onClick={handleLogout} 
              className="btn btn-outline btn-error btn-sm hidden md:flex"
            >
              Logout
            </button>

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img 
                    src={user?.photoURL || "https://i.ibb.co/m9YhxZf/user-placeholder.png"} 
                    alt="user profile" 
                  />
                </div>
              </label>
              
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
                <li className="px-4 py-2 font-bold text-gray-500 border-b border-base-200 mb-2">
                  {user?.displayName || "User"}
                </li>
                <li>
                  <button onClick={() => navigate("/profile")} className="flex justify-between">
                    Profile
                    <span className="badge badge-primary badge-xs p-2 uppercase font-bold text-[10px]">New</span>
                  </button>
                </li>
                <li><Link to="/settings">Settings</Link></li>
                <li className="md:hidden">
                  <button onClick={handleLogout} className="text-error font-bold">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm hover:bg-base-200 transition-all duration-300">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm px-6 shadow-md shadow-primary/20">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;