import { useEffect, useState } from 'react';
import api from '../services/api.js';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const load = () => {
    api.get('/notifications/me').then((res) => setNotifications(res.data.data));
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/read`);
    load();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold gradient-text mb-6">
        Notifications
      </h1>
      {notifications.length === 0 ? (
        <div className="card p-12 text-center bg-white">
          <div className="text-6xl mb-4">🔔</div>
          <p className="text-xl text-gray-700 font-medium">No notifications</p>
          <p className="text-gray-600 mt-2">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`card p-6 flex justify-between items-start hover:shadow-xl transition-shadow bg-white ${
                !n.isRead ? 'border-l-4 border-accent bg-mint/20' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <p className="font-bold text-lg text-gray-800">{n.title}</p>
                  {!n.isRead && (
                    <span className="ml-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{n.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {!n.isRead && (
                <button
                  className="btn-primary text-sm px-4 py-2 ml-4"
                  onClick={() => markRead(n._id)}
                >
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
