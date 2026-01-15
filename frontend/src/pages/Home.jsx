import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    api
      .get('/events')
      .then((res) => setEvents(res.data.data))
      .catch((err) => setMessage(err.message));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await api.post('/bookings', { eventId });
      setMessage('Booking successful');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black tech-pattern text-white">
      {/* Hero Section - Matching the reference image Auriga style */}
      <div className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center items-center overflow-x-hidden border-b border-white/10 py-20 md:py-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
        <h1 className="text-[12vw] leading-none font-bold font-hero tracking-tighter text-white mix-blend-difference select-none text-center px-4 break-words w-full">
          AkEventzz<span className="text-secondary">_</span>
        </h1>
        <div className="static md:absolute bottom-10 w-full max-w-[1400px] px-6 flex flex-col md:flex-row justify-between items-center md:items-end mt-12 md:mt-0 gap-8">
          <div className="max-w-md text-center md:text-left">
            <p className="text-secondary font-bold uppercase tracking-widest text-xs mb-2">System Status: Online</p>
            <p className="text-xl md:text-2xl font-light leading-tight">
              POWERING THE FUTURE OF <br />
              <span className="text-secondary font-bold">EVENT PROPULSION.</span>
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Coordinates</div>
            <div className="text-lg font-mono">34.0522° N, 118.2437° W</div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
          <h2 className="text-4xl font-hero font-bold text-white">
            Sector Events
          </h2>
          {message && (
            <div className="bg-secondary/10 border border-secondary text-secondary px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center">
              <span className="mr-2 animate-pulse">●</span>
              {message}
            </div>
          )}
        </div>

        {events.length === 0 ? (
          <div className="border border-white/10 p-20 text-center bg-white/5">
            <div className="text-6xl mb-6 opacity-20">⚠️</div>
            <p className="text-2xl font-hero uppercase tracking-widest mb-2">No Scheduled Missions</p>
            <p className="text-gray-500 font-mono text-sm">Standby for transmission...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div key={evt._id} className="group bg-neutral-900 border border-neutral-800 hover:border-secondary transition-all duration-300 relative overflow-hidden">
                <div className="aspect-video bg-neutral-800 relative group-hover:bg-neutral-800/50 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <span className="text-6xl font-hero font-bold text-white/10 group-hover:text-secondary/20 scale-150">A</span>
                  </div>
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border ${evt.availableSeats > 0 ? 'text-secondary border-secondary' : 'text-red-500 border-red-500'
                      }`}>
                      {evt.availableSeats > 0 ? 'Available' : 'Locked'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    <span>{new Date(evt.date).toLocaleDateString()}</span>
                    <span>//</span>
                    <span>{new Date(evt.date).toLocaleTimeString()}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-2 leading-none group-hover:text-secondary transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-gray-300 text-sm font-sans mb-6 line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center text-xs text-gray-400 font-mono">
                      <span className="mr-2">LOC:</span>
                      {evt.location}
                    </div>

                    <div className="flex gap-4">
                      <Link to={`/events/${evt._id}`} className="text-xs font-bold uppercase tracking-widest hover:text-secondary text-gray-300 transition-colors">
                        Analyze
                      </Link>

                      {user && (
                        <button
                          onClick={() => handleRegister(evt._id)}
                          disabled={evt.availableSeats === 0}
                          className={`text-xs font-bold uppercase tracking-widest hover:text-white transition-colors ${evt.availableSeats === 0 ? 'text-red-500 cursor-not-allowed' : 'text-secondary cursor-pointer'
                            }`}
                        >
                          {evt.availableSeats === 0 ? 'Full' : 'Engage'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
