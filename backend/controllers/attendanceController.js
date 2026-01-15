import Attendance from '../models/Attendance.js';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendInAppNotification } from '../services/notificationService.js';

export const markAttendance = asyncHandler(async (req, res) => {
  const { userId, eventId, status } = req.body;
  const booking = await Booking.findOne({ userId, eventId, status: 'confirmed' });
  if (!booking) {
    return res.status(400).json({ success: false, message: 'Booking not found for user/event' });
  }

  const attendance = await Attendance.findOneAndUpdate(
    { userId, eventId },
    { status, markedBy: req.user._id, markedAt: new Date() },
    { new: true, upsert: true }
  );

  await sendInAppNotification({
    userId,
    title: 'Attendance updated',
    message: `Your attendance for event has been marked as ${status}.`,
    type: 'update',
  });

  res.json({ success: true, data: attendance });
});

export const getEnrolledStudents = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    eventId: req.params.eventId,
    status: 'confirmed',
  }).populate('userId', 'name email');
  res.json({ success: true, data: bookings });
});

export const getAttendanceByEvent = asyncHandler(async (req, res) => {
  const records = await Attendance.find({ eventId: req.params.eventId }).populate('userId', 'name email');
  res.json({ success: true, data: records });
});

export const exportAttendance = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  const records = await Attendance.find({ eventId: req.params.eventId }).populate('userId', 'name email');
  
  if (records.length === 0) {
    return res.status(400).json({ success: false, message: 'No attendance records found for this event' });
  }

  // Escape CSV values and handle null cases
  const escapeCsv = (value) => {
    if (!value) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const header = 'Name,Email,Status,Marked At\n';
  const rows = records
    .map((r) => {
      const name = escapeCsv(r.userId?.name || 'N/A');
      const email = escapeCsv(r.userId?.email || 'N/A');
      const status = escapeCsv(r.status || 'N/A');
      const markedAt = r.markedAt ? new Date(r.markedAt).toISOString() : 'N/A';
      return `${name},${email},${status},${markedAt}`;
    })
    .join('\n');
  
  const csv = header + rows;

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="attendance-${event.title.replace(/[^a-z0-9]/gi, '_')}-${event._id}.csv"`);
  res.setHeader('Cache-Control', 'no-cache');
  res.send('\ufeff' + csv); // BOM for Excel UTF-8 support
});
