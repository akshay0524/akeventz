import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendInAppNotification } from '../services/notificationService.js';

export const createBooking = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const event = await Event.findById(eventId);
  if (!event || event.status === 'cancelled') {
    return res.status(404).json({ success: false, message: 'Event not available' });
  }

  if (event.availableSeats <= 0) {
    return res.status(400).json({ success: false, message: 'No seats available' });
  }

  const booking = await Booking.create({ userId: req.user._id, eventId });
  event.availableSeats -= 1;
  await event.save();

  await sendInAppNotification({
    userId: req.user._id,
    title: 'Booking confirmed',
    message: `You are registered for ${event.title}`,
    type: 'booking',
  });

  res.status(201).json({ success: true, data: booking });
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id }).populate('eventId');
  res.json({ success: true, data: bookings });
});

export const getAllBookings = asyncHandler(async (_req, res) => {
  const bookings = await Booking.find().populate('userId').populate('eventId');
  res.json({ success: true, data: bookings });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  booking.status = 'cancelled';
  await booking.save();

  const event = await Event.findById(booking.eventId);
  if (event) {
    event.availableSeats += 1;
    await event.save();
  }

  await sendInAppNotification({
    userId: booking.userId,
    title: 'Booking cancelled',
    message: 'Your booking has been cancelled.',
    type: 'update',
  });

  res.json({ success: true, data: booking });
});
