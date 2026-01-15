import { useEffect, useState } from 'react';
import api from '../services/api.js';

const initialEvent = { title: '', description: '', date: '', location: '', availableSeats: 0, price: 0 };

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(initialEvent);
  const [message, setMessage] = useState('');

  const loadData = () => {
    api.get('/events').then((res) => setEvents(res.data.data.filter((e) => e.status !== 'cancelled')));
    api.get('/bookings').then((res) => setBookings(res.data.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', form);
      setForm(initialEvent);
      setMessage('Event created');
      loadData();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleCancel = async (id) => {
    setMessage('');
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      setMessage('Event cancelled');
    } catch (err) {
      setMessage(err.message || 'Unable to cancel event');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold gradient-text mb-6">
        Admin Dashboard
      </h1>

      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">➕</span>Create New Event
        </h2>
        {message && (
          <div
            className={`mb-4 px-4 py-3 rounded ${
              message.includes('created')
                ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
                : 'bg-red-50 border-l-4 border-red-500 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input
              className="input-field"
              placeholder="Enter event title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
            <input
              className="input-field"
              type="datetime-local"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              className="input-field"
              placeholder="Event location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Seats</label>
            <input
              className="input-field"
              type="number"
              placeholder="Number of seats"
              value={form.availableSeats}
              onChange={(e) => setForm({ ...form, availableSeats: Number(e.target.value) })}
              required
              min="1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="input-field"
              placeholder="Event description"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary sm:col-span-2">
            Create Event
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📅</span>Current Events
        </h2>
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No events created yet</div>
        ) : (
          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{evt.title}</p>
                  <p className="text-sm text-gray-600">{new Date(evt.date).toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-4">
                <span className="bg-mint text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {evt.availableSeats} seats
                </span>
                  <button className="btn-danger text-sm" onClick={() => handleCancel(evt._id)}>
                    Cancel Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🎫</span>All Bookings
        </h2>
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No bookings yet</div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    <span className="text-indigo-600">{b.userId?.name}</span> → {b.eventId?.title}
                  </p>
                  <p className="text-sm text-gray-600">{new Date(b.eventId?.date).toLocaleString()}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    b.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
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
    </div>
  );
};

export default AdminDashboard;
