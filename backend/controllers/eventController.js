import Event from '../models/Event.js';
import Booking from '../models/Booking.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendInAppNotification } from '../services/notificationService.js';

export const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: event });
});

export const getEvents = asyncHandler(async (_req, res) => {
  // Return only scheduled events to hide cancelled ones from public lists
  const events = await Event.find({ status: 'scheduled' }).sort({ date: 1 });
  res.json({ success: true, data: events });
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  res.json({ success: true, data: event });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  const bookings = await Booking.find({ eventId: event._id, status: 'confirmed' }).select('userId');
  const notifications = bookings.map((b) =>
    sendInAppNotification({
      userId: b.userId,
      title: 'Event updated',
      message: `${event.title} details have changed.`,
      type: 'update',
    })
  );
  await Promise.all(notifications);

  res.json({ success: true, data: event });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  event.status = 'cancelled';
  await event.save();

  const bookings = await Booking.find({ eventId: event._id, status: 'confirmed' });
  const notifications = bookings.map((b) =>
    sendInAppNotification({
      userId: b.userId,
      title: 'Event cancelled',
      message: `${event.title} has been cancelled.`,
      type: 'update',
    })
  );
  await Promise.all(notifications);

  res.json({ success: true, message: 'Event cancelled' });
});
