import { useEffect, useState } from 'react';
import api from '../services/api.js';

const Attendance = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ userId: '', status: 'present' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/events').then((res) => setEvents(res.data.data));
  }, []);

  const loadEnrolledStudents = async (eventId) => {
    try {
      const { data } = await api.get(`/attendance/enrolled/${eventId}`);
      setEnrolledStudents(data.data || []);
    } catch (err) {
      setEnrolledStudents([]);
    }
  };

  const loadRecords = async (eventId) => {
    const { data } = await api.get(`/attendance/event/${eventId}`);
    setRecords(data.data);
  };

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
    setForm({ userId: '', status: 'present' });
    if (eventId) {
      loadEnrolledStudents(eventId);
      loadRecords(eventId);
    } else {
      setEnrolledStudents([]);
      setRecords([]);
    }
  };

  const handleMark = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/attendance', { ...form, eventId: selectedEvent });
      setForm({ userId: '', status: 'present' });
      setMessage('Attendance marked successfully!');
      loadRecords(selectedEvent);
      loadEnrolledStudents(selectedEvent);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Failed to mark attendance');
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await api.get(`/attendance/export/${selectedEvent}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const event = events.find((e) => e._id === selectedEvent);
      const filename = `attendance-${event?.title?.replace(/[^a-z0-9]/gi, '_') || 'export'}-${Date.now()}.csv`;
      link.setAttribute('download', filename);
      
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Failed to export CSV');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold gradient-text mb-6">
        Attendance Management
      </h1>

      <div className="card p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Event to Manage Attendance
        </label>
        <select
          className="input-field"
          value={selectedEvent}
          onChange={(e) => handleEventChange(e.target.value)}
        >
          <option value="">Choose an event...</option>
          {events.map((evt) => (
            <option key={evt._id} value={evt._id}>
              {evt.title} - {new Date(evt.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <>
          <div className="card p-6 bg-mint/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">👥</span>Enrolled Students
              </h2>
              <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                {enrolledStudents.length} {enrolledStudents.length === 1 ? 'Student' : 'Students'} Enrolled
              </span>
            </div>
            {enrolledStudents.length === 0 ? (
              <p className="text-gray-600">No students enrolled for this event yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {enrolledStudents.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{booking.userId?.name}</p>
                      <p className="text-xs text-gray-600">{booking.userId?.email}</p>
                    </div>
                    {records.find((r) => r.userId?._id === booking.userId?._id) && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Marked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">✅</span>Mark Attendance
            </h2>
            {message && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}
            {enrolledStudents.length === 0 ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 px-4 py-3 rounded">
                No students enrolled for this event. Students must register first.
              </div>
            ) : (
              <form onSubmit={handleMark} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                  <select
                    className="input-field"
                    value={form.userId}
                    onChange={(e) => setForm({ ...form, userId: e.target.value })}
                    required
                  >
                    <option value="">Choose a student...</option>
                    {enrolledStudents.map((booking) => (
                      <option key={booking._id} value={booking.userId._id}>
                        {booking.userId.name} ({booking.userId.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    className="input-field"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </div>
                <button className="btn-primary" type="submit">
                  Mark
                </button>
              </form>
            )}
          </div>

          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">📋</span>Attendance Records
              </h2>
              <button
                className="btn-secondary text-sm"
                onClick={handleExportCSV}
                disabled={records.length === 0}
              >
                📥 Export CSV
              </button>
            </div>
            {records.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No attendance records yet</div>
            ) : (
              <div className="space-y-3">
                {records.map((r) => (
                  <div
                    key={r._id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{r.userId?.name}</p>
                      <p className="text-sm text-gray-600">{r.userId?.email}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                        r.status === 'present'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Attendance;
