import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect, useState } from 'react';
import api from '../services/api.js';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      api
        .get('/notifications/me')
        .then((res) => setNotifications(res.data.data || []))
        .catch(() => setNotifications([]));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 border border-secondary flex items-center justify-center rotate-45 group-hover:bg-secondary transition-all duration-300">
              <div className="w-2 h-2 bg-secondary group-hover:bg-black transition-colors"></div>
            </div>
            <span className="text-xl font-hero font-bold text-white tracking-widest pl-2">
              AkEventzz<span className="text-secondary">_</span>
            </span>
          </Link>

          <div className="flex items-center gap-12">
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="nav-link">Technology</Link>
              {user && <Link to="/dashboard" className="nav-link">Mission Log</Link>}
              {user && (
                <Link to="/notifications" className="nav-link relative">
                  Comms
                  {notifications?.filter((n) => !n.isRead).length > 0 && (
                    <span className="absolute -top-2 -right-3 text-secondary text-[10px] animate-pulse">●</span>
                  )}
                </Link>
              )}
              {user?.role === 'admin' && <Link to="/admin" className="nav-link">Command</Link>}
            </div>

            {!user ? (
              <div className="flex items-center gap-6">
                <Link to="/login" className="nav-link text-white">Login</Link>
                <Link to="/register" className="btn-secondary px-6 py-2 text-xs">
                  Initialize
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-6 border-l border-white/20 pl-6">
                <div className="text-right">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">Operator</div>
                  <div className="text-sm font-sans font-bold text-white tracking-wider">{user.name}</div>
                </div>
                <button onClick={handleLogout} className="text-secondary hover:text-white text-xs uppercase tracking-widest">
                  Abort
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
