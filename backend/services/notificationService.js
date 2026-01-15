import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { sendEmail } from './emailService.js';

export const sendInAppNotification = async ({ userId, title, message, type, sendEmail: sendMail = false }) => {
  const notification = await Notification.create({ userId, title, message, type });
  if (sendMail) {
    const user = await User.findById(userId);
    if (user) {
      await sendEmail({ to: user.email, subject: title, text: message });
    }
  }
  return notification;
};

export const broadcastNotification = async ({ userIds, title, message, type, sendEmail: sendMail = false }) => {
  const notifications = await Promise.all(
    userIds.map((userId) => sendInAppNotification({ userId, title, message, type, sendEmail: sendMail }))
  );
  return notifications;
};
