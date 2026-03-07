import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent_item extends Document {
  eventName: string;
  vendorId: mongoose.Types.ObjectId;
  vendorUsername: string;
  vendorCompanyName: string;
}

const eventItemSchema = new Schema<IEvent_item>(
  {
    eventName:         { type: String,                required: true,  trim: true },
    vendorId:          { type: Schema.Types.ObjectId, required: true,  ref: 'vendors' },
    vendorUsername:    { type: String,                required: true,  minlength: 6, select: false },
    vendorCompanyName: { type: String,                required: true },
  },
  { timestamps: true }
);

export const EventItem = mongoose.model<IEvent_item>('event_items', eventItemSchema);