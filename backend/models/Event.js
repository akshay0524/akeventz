import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, default: 0 },
    availableSeats: { type: Number, required: true, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['scheduled', 'cancelled'], default: 'scheduled' },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
