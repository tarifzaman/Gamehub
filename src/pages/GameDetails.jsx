import {
    ArrowLeft,
    Clock,
    Download,
    Gamepad2,
    ShieldCheck,
    Star,
    Users,
  } from "lucide-react";
  import { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  
  const GameDetails = () => {
    const { id } = useParams(); // URL থেকে আসা ID (যেমন: /game/18)
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Public ফোল্ডার থেকে games.json ফেচ করা
      fetch("/games.json")
        .then((res) => res.json())
        .then((data) => {
          // লজিক পরিবর্তন: String এ কনভার্ট করে ম্যাচ করা হয়েছে যাতে ডেটা টাইপ নিয়ে সমস্যা না হয়
          const foundGame = data.find((g) => String(g.id) === String(id));
          setGame(foundGame);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch Error:", err);
          setLoading(false);
        });
    }, [id]);
  
    // লোডিং স্টেট
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-bars loading-lg text-teal-500"></span>
            <p className="text-teal-800 font-black animate-pulse">LOADING GAME DATA...</p>
          </div>
        </div>
      );
    }
  
    // গেম খুঁজে না পেলে এই সেকশন দেখাবে
    if (!game) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
          <div className="bg-red-50 p-10 rounded-[40px] text-center border-2 border-dashed border-red-200">
            <h2 className="text-4xl font-black text-red-500 uppercase italic mb-4">
              Game Not Found!
            </h2>
            <p className="text-gray-500 mb-6 font-bold">The game you are looking for might have been removed or the ID is incorrect.</p>
            <button
              onClick={() => navigate("/")}
              className="btn bg-teal-500 hover:bg-teal-600 text-white border-none rounded-2xl px-10"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-white">
        {/* 1. Hero Banner Section */}
        <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
          <img
            src={game.coverPhoto}
            alt={game.title}
            className="w-full h-full object-cover scale-105 blur-[1px]"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-black/30"></div>
  
          {/* Floating Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-8 left-8 bg-white/30 backdrop-blur-xl p-4 rounded-3xl text-white hover:bg-white hover:text-teal-600 transition-all duration-300 z-20 shadow-2xl"
          >
            <ArrowLeft size={28} />
          </button>
        </div>
  
        {/* 2. Main Content Card */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-40 relative z-10 pb-24">
          <div className="bg-white/90 backdrop-blur-3xl rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white p-6 md:p-14">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Left Column: Visuals & Stats */}
              <div className="w-full lg:w-5/12">
                <div className="rounded-[40px] overflow-hidden shadow-3xl border-[6px] border-white group relative">
                  <img
                    src={game.coverPhoto}
                    alt={game.title}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-teal-500/90 backdrop-blur text-white px-5 py-2 rounded-2xl font-black text-xs uppercase tracking-widest">
                    {game.category}
                  </div>
                </div>
  
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-5 mt-8">
                  <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-[30px] border border-teal-100 text-center">
                    <Star className="text-yellow-500 mx-auto mb-2" size={24} fill="currentColor" />
                    <p className="text-2xl font-black text-teal-900">{game.ratings}</p>
                    <p className="text-[10px] uppercase font-black text-teal-600/50 tracking-widest mt-1">Global Rating</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-[30px] border border-cyan-100 text-center">
                    <Users className="text-cyan-600 mx-auto mb-2" size={24} />
                    <p className="text-2xl font-black text-cyan-900">{game.developer || "Studio"}</p>
                    <p className="text-[10px] uppercase font-black text-cyan-600/50 tracking-widest mt-1">Developer</p>
                  </div>
                </div>
              </div>
  
              {/* Right Column: Details & Actions */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-[2px] w-12 bg-teal-500"></span>
                    <span className="text-teal-600 font-black text-xs uppercase tracking-[0.3em]">GameHub Exclusive</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-teal-950 uppercase italic tracking-tighter leading-[0.9] mb-6">
                    {game.title}
                  </h1>
                  <p className="text-gray-500 text-xl leading-relaxed font-medium">
                    {game.description || "Embark on an epic journey with " + game.title + ". This masterfully crafted " + game.category + " experience brings unparalleled graphics and revolutionary gameplay right to your fingertips."}
                  </p>
                </div>
  
                {/* Features List */}
                <div className="flex flex-wrap gap-8 mb-12">
                  <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl">
                    <ShieldCheck size={22} className="text-teal-500" />
                    <span className="font-bold text-gray-700">Scan Verified</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl">
                    <Clock size={22} className="text-teal-500" />
                    <span className="font-bold text-gray-700">Latest Ver. 2024</span>
                  </div>
                </div>
  
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <a
                    href={game.downloadLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-xl font-black py-6 rounded-[28px] shadow-2xl shadow-teal-200 transition-all hover:-translate-y-1.5 flex items-center justify-center gap-4 uppercase italic"
                  >
                    <Download size={28} /> Start Download
                  </a>
                  <button className="px-10 py-6 bg-gray-100 text-gray-800 font-black rounded-[28px] hover:bg-gray-200 transition-all uppercase text-sm tracking-widest">
                    Wishlist
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