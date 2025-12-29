import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // বাটনের স্টেট: 'idle', 'downloading', 'downloaded'
  const [downloadStatus, setDownloadStatus] = useState("idle");

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const foundGame = data.find((g) => String(g.id) === String(id));
        setGame(foundGame);
        
        // --- রিফ্রেশ দিলেও স্টেট ধরে রাখার লজিক ---
        const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isAlreadyExist = existingWishlist.find((item) => String(item.id) === String(id));
        
        if (isAlreadyExist) {
          setDownloadStatus("downloaded"); // অলরেডি থাকলে বাটনটি 'Downloaded' দেখাবে
        }
        // -------------------------------------------

        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDownloadAndWishlist = () => {
    if (downloadStatus === "downloaded") return;

    setDownloadStatus("downloading");
    toast.loading("Starting Download...", { id: "download-toast" });

    setTimeout(() => {
      const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const isAlreadyExist = existingWishlist.find((item) => String(item.id) === String(game.id));

      if (!isAlreadyExist) {
        const newWishlist = [...existingWishlist, game];
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      }

      setDownloadStatus("downloaded");
      toast.success(`${game.title} Downloaded Successfully!`, { id: "download-toast" });
    }, 1500);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <span className="loading loading-bars loading-lg text-teal-500"></span>
    </div>
  );

  if (!game) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 font-black text-2xl uppercase">
      Game Not Found!
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      
      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
        <img src={game.coverPhoto} alt={game.title} className="w-full h-full object-cover scale-105 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-black/30"></div>
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-8 bg-white/20 backdrop-blur-xl p-4 rounded-3xl text-white z-20 hover:bg-white hover:text-teal-600 transition-all shadow-xl"
        >
          <ArrowLeft size={28} />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-40 relative z-10 pb-24">
        <div className="bg-white/95 backdrop-blur-3xl rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white p-6 md:p-14">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="w-full lg:w-5/12">
              <div className="rounded-[40px] overflow-hidden border-[6px] border-white shadow-2xl">
                <img src={game.coverPhoto} alt={game.title} className="w-full h-auto" />
              </div>
            </div>

            <div className="w-full lg:w-7/12 flex flex-col justify-center">
              <h1 className="text-5xl font-black text-teal-950 uppercase italic mb-6 leading-none tracking-tighter">
                {game.title}
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed mb-10 font-medium italic">
                {game.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={handleDownloadAndWishlist}
                  disabled={downloadStatus !== "idle"}
                  className={`flex-1 text-xl font-black py-6 rounded-[28px] shadow-2xl transition-all flex items-center justify-center gap-4 uppercase italic tracking-wider
                    ${downloadStatus === "idle" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-teal-200 hover:-translate-y-1" : ""}
                    ${downloadStatus === "downloading" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                    ${downloadStatus === "downloaded" ? "bg-green-50 text-green-600 border-2 border-green-200" : ""}
                  `}
                >
                  {downloadStatus === "idle" && <><Download size={28} /> Start Download</>}
                  {downloadStatus === "downloading" && <><span className="loading loading-spinner loading-md"></span> Downloading...</>}
                  {downloadStatus === "downloaded" && <><CheckCircle size={28} /> Downloaded</>}
                </button>

                <button
                  onClick={() => navigate("/wishlist")}
                  className="px-10 py-6 bg-gray-100 text-gray-800 font-black rounded-[28px] hover:bg-gray-200 transition-all uppercase text-sm tracking-widest"
                >
                  View Wishlist
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;