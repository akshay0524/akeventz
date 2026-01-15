import { useEffect, useState } from 'react';
import api from '../services/api.js';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/bookings/me')
      .then((res) => setBookings(res.data.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold gradient-text mb-6">
        My Bookings
      </h1>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {bookings.length === 0 ? (
        <div className="card p-12 text-center bg-white">
          <div className="text-6xl mb-4">🎫</div>
          <p className="text-xl text-gray-700 font-medium">No bookings yet</p>
          <p className="text-gray-600 mt-2">Start exploring events to register!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div key={b._id} className="card p-6 flex justify-between items-center hover:shadow-xl transition-shadow bg-white">
              <div className="flex-1">
                <p className="text-xl font-bold text-gray-800 mb-2">{b.eventId?.title}</p>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <span className="flex items-center">
                    <span className="mr-2">📅</span>
                    {new Date(b.eventId?.date).toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-2">📍</span>
                    {b.eventId?.location}
                  </span>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  b.status === 'confirmed'
                    ? 'bg-mint text-gray-800'
                    : b.status === 'cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
