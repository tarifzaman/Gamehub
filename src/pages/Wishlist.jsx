import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Gamepad2 } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider"; // AuthContext ইমপোর্ট করুন

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);

  // প্রতিটি ইউজারের জন্য আলাদা কি তৈরি করা হচ্ছে (যেমন: wishlist-abc@gmail.com)
  const userWishlistKey = `wishlist-${user?.email}`;

  useEffect(() => {
    if (user?.email) {
      const data = JSON.parse(localStorage.getItem(userWishlistKey)) || [];
      setWishlist(data);
    }
  }, [user?.email, userWishlistKey]);

  const handleUninstall = (id) => {
    const updatedWishlist = wishlist.filter((item) => String(item.id) !== String(id));
    setWishlist(updatedWishlist);
    
    // ইউজার স্পেসিফিক কি দিয়ে সেভ করুন
    localStorage.setItem(userWishlistKey, JSON.stringify(updatedWishlist));
    
    toast.error("Game Removed Successfully!", {
      style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' }
    });
  };

  if (!user) return null; // ইউজার না থাকলে কিছু দেখানোর দরকার নেই

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-teal-900 mb-8 uppercase italic tracking-tighter">
          My Wishlist ({wishlist.length})
        </h2>
        
        {wishlist.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] text-center shadow-sm border border-teal-50">
            <Gamepad2 size={60} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest">Your Wishlist is Empty!</p>
            <p className="text-gray-300 text-xs mt-2 uppercase">Logged in as: {user.email}</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {wishlist.map((game) => (
              <div key={game.id} className="bg-white p-6 rounded-[30px] shadow-sm border border-teal-50 flex flex-col md:flex-row items-center gap-6 justify-between transition-hover hover:shadow-md">
                <div className="flex items-center gap-6">
                  <img src={game.coverPhoto} className="w-24 h-24 rounded-2xl object-cover shadow-inner" alt="" />
                  <div>
                    <h3 className="text-xl font-black text-teal-800 uppercase italic tracking-tighter">{game.title}</h3>
                    <p className="text-teal-600 font-bold text-sm uppercase tracking-widest">{game.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleUninstall(game.id)}
                  className="bg-red-50 text-red-500 p-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 font-black uppercase text-xs"
                >
                  <Trash2 size={18} /> Uninstall
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;