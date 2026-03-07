import { Event, IEvent } from '../models/event.model';
import mongoose from 'mongoose';

export interface CreateEventInput {
  companyName: string;
  eventTypeId: string;
  vendorId: string;
  proposedDates: string[];
  location: string;
  createdBy: string;
  remarks?: string;
}

export interface UpdateEventInput {
  eventTypeId?: string;
  vendorId?: string;
  proposedDates?: string[];
  location?: string;
  confirmedDate?: string | null;
  status?: 'pending' | 'confirmed' | 'cancelled';
  remarks?: string | null;
}

export const eventService = {

  // Create new event
  create: async (data: CreateEventInput): Promise<IEvent> => {
    const event = new Event({
      companyName:   data.companyName,
      eventTypeId:   new mongoose.Types.ObjectId(data.eventTypeId),
      vendorId:      new mongoose.Types.ObjectId(data.vendorId),
      createdBy:     new mongoose.Types.ObjectId(data.createdBy),
      proposedDates: data.proposedDates.map((d) => new Date(d)),
      location:      data.location,
      remarks:       data.remarks ?? null,
      status:        'pending',
      confirmedDate: null,
    });

    return await event.save();
  },

  // Update event by ID
  update: async (id: string, data: UpdateEventInput): Promise<IEvent> => {
    const updates: Partial<IEvent> = {};

    if (data.eventTypeId   !== undefined) updates.eventTypeId   = new mongoose.Types.ObjectId(data.eventTypeId)   as any;
    if (data.vendorId      !== undefined) updates.vendorId      = new mongoose.Types.ObjectId(data.vendorId)      as any;
    if (data.proposedDates !== undefined) updates.proposedDates = data.proposedDates.map((d) => new Date(d));
    if (data.location      !== undefined) updates.location      = data.location;
    if (data.status        !== undefined) updates.status        = data.status;
    if (data.remarks       !== undefined) updates.remarks       = data.remarks ?? null;
    if (data.confirmedDate !== undefined) updates.confirmedDate = data.confirmedDate ? new Date(data.confirmedDate) : null;

    const updated = await Event.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) throw Object.assign(new Error('Event not found'), { statusCode: 404 });

    return updated;
  },

};