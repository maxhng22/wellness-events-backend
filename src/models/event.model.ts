import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  eventTypeId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  proposedDates: Date[];
  location: string;
  companyName: string;
  confirmedDate: Date | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  remarks: string | null;
  createdBy: mongoose.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>(
  {
    eventTypeId: { type: Schema.Types.ObjectId, required: true, ref: 'event_items' },
    vendorId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    proposedDates: { type: [Date], required: true },
    companyName :{ type: String, required: true, default: null },
    location: { type: String, required: true, default: null },
    confirmedDate: { type: Date, default: null },
    status: { type: String, required: true, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    remarks: { type: String, default: null },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  },
  { timestamps: true }
);

export const Event = mongoose.model<IEvent>('events', eventSchema);