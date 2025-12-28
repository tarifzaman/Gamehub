import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Star, ArrowRight, X } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home = () => {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const topGames = data
          .sort((a, b) => parseFloat(b.ratings) - parseFloat(a.ratings))
          .slice(0, 3);
        setGames(topGames);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardClick = (id) => {
    if (!user) {
      setShowModal(true); // লগইন না থাকলে মোডাল দেখাবে
    } else {
      navigate(`/game/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- HERO SLIDER SECTION --- */}
      <section className="h-[500px] w-full mb-12 shadow-xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-full w-full"
        >
          {/* স্লাইড ১ */}
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Slide 1" />
              <div className="absolute inset-0 bg-black/40 flex items-center px-12">
                <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Experience <span className="text-teal-400">Next-Gen</span> Gaming</h2>
              </div>
            </div>
          </SwiperSlide>
          {/* স্লাইড ২ */}
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Slide 2" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h2 className="text-5xl font-black text-white uppercase italic">Explore Our <span className="text-cyan-400">Top Rated</span> Hits</h2>
              </div>
            </div>
          </SwiperSlide>
          {/* স্লাইড ৩ */}
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Slide 3" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-transparent flex items-center px-12">
                <h2 className="text-5xl font-black text-white uppercase tracking-widest">Build Your <span className="text-teal-300">Legacy</span></h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* --- POPULAR GAMES SECTION --- */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8 border-b-2 border-teal-100 pb-4">
          <h1 className="text-3xl font-black text-teal-800 uppercase italic">Popular Games</h1>
          <button className="text-teal-600 font-bold flex items-center gap-2 hover:text-teal-800 transition">View All <ArrowRight size={18}/></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-teal-50"
              onClick={() => handleCardClick(game.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.coverPhoto}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1 shadow-md">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-gray-800">{game.ratings}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">{game.title}</h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">Experience the thrill of {game.title}. Top rated by our community.</p>
                <div className="mt-4 flex items-center text-teal-600 font-extrabold text-sm uppercase tracking-wider">
                  Details <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- AUTH MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 relative shadow-2xl transform animate-scaleUp">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} className="text-gray-400" />
            </button>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="text-teal-600 w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-2xl font-black text-teal-800 uppercase italic">Join GameHub!</h3>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                You need to be logged in to view game details and reviews.
              </p>

              <div className="mt-8 space-y-3">
                <button 
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-teal-100 transition hover:scale-105 active:scale-95"
                >
                  Log In Now
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="w-full bg-white border-2 border-teal-500 text-teal-600 font-bold py-3 rounded-xl transition hover:bg-teal-50"
                >
                  Create Account
                </button>
              </div>
              
              <button 
                onClick={() => setShowModal(false)}
                className="mt-6 text-gray-400 text-xs font-bold hover:text-gray-600 underline"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;