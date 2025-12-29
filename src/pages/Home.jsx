import { ArrowRight, Star, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

// Swiper imports
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Home = () => {
  const [allGames, setAllGames] = useState([]);
  const [displayGames, setDisplayGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        setAllGames(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!loading && allGames.length > 0) {
      if (user) {
        // লগইন থাকলে সব ২০টি দেখাবে
        setDisplayGames(allGames);
      } else {
        // লগইন না থাকলে টপ ৩টি দেখাবে
        const top3 = [...allGames]
          .sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings))
          .slice(0, 3);
        setAllGames(allGames); // Keep original data
        setDisplayGames(top3);
      }
    }
  }, [user, allGames, loading]);

  const handleCardClick = (id) => {
    if (!user) {
      setShowModal(true);
    } else {
      navigate(`/game/${id}`);
    }
  };

  // নতুন মেম্বার চেক করার ফাংশন
  const isNewMember =
    user?.metadata?.creationTime === user?.metadata?.lastSignInTime;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Slider */}
      <section className="h-[400px] md:h-[500px] w-full mb-12 shadow-xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-full w-full"
        >
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600"
                className="w-full h-full object-cover"
                alt="Slide 1"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center px-12 italic uppercase font-black text-white text-3xl md:text-5xl">
                Experience <span className="text-teal-400 ml-2">Next-Gen</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600"
                className="w-full h-full object-cover"
                alt="Slide 2"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center italic uppercase font-black text-white text-3xl md:text-5xl">
                Top <span className="text-cyan-400 ml-2">Rated</span> Hits
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b border-teal-100 pb-5 gap-4">
          <div>
            <h1 className="text-3xl font-black text-teal-800 uppercase italic">
              {user ? "All Gaming Library" : "Popular Games"}
            </h1>

            {/* Conditional Welcome Message */}
            <p className="text-gray-500 text-sm font-medium mt-1">
              {user
                ? isNewMember
                  ? `Welcome to GameHub, ${user.displayName}! Explore our premium collection.`
                  : `Welcome back, ${user.displayName}! Showing all 20 games.`
                : "Login to unlock 20+ premium games."}
            </p>
          </div>

          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-sm bg-teal-500 border-none text-white hover:bg-teal-600"
            >
              Show More Games
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayGames.map((game) => (
            <div
              key={game.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-teal-50"
              onClick={() => handleCardClick(game.id)}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold">
                  <Star size={12} className="text-yellow-500 fill-yellow-500" />{" "}
                  {game.ratings}
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">
                  {game.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-1 truncate">
                  {game.title}
                </h3>
                <div className="mt-4 flex items-center text-teal-600 font-bold text-xs uppercase tracking-tighter">
                  Details <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-teal-600">
                <Star size={32} />
              </div>
              <h3 className="text-2xl font-black text-teal-800 uppercase italic">
                Login Required
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                Please login to see all 20 games and download links.
              </p>
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-teal-500 text-white font-bold py-3 rounded-xl hover:bg-teal-600 transition"
                >
                  Login Now
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full bg-white border-2 border-teal-500 text-teal-600 font-bold py-3 rounded-xl"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
