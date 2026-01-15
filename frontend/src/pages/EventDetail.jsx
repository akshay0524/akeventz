import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => setEvent(res.data.data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error)
    return (
      <div className="card p-6">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  if (!event)
    return (
      <div className="card p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading event details...</p>
      </div>
    );

  return (
    <div className="card p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <span className="text-2xl mr-3">📅</span>
            <div>
              <p className="font-semibold">Date & Time</p>
              <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="text-2xl mr-3">📍</span>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="text-2xl mr-3">🎫</span>
            <div>
              <p className="font-semibold">Available Seats</p>
              <p className="text-sm text-gray-600">{event.availableSeats} seats remaining</p>
            </div>
          </div>
        </div>
        <div className="bg-mint/30 p-6 rounded-lg border border-mint">
          <h3 className="font-bold text-lg mb-3 text-gray-800">Event Description</h3>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
