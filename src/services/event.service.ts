import { AppError } from '../types/error';
import { Event, IEvent } from '../models/event.model';
import { EventItem } from '../models/event_item.model';
import { User } from '../models/user.model';
import mongoose from 'mongoose';

export interface CreateEventInput {
  eventId: string;
  proposedDates: string[];
  location: string;
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

  findAll: async (userId: string) => {
       const user = await User.findById(userId).orFail(() =>
      new AppError('User not found', 404)
    );

    if (user.role === 'hr') {
      return Event.find({ createdBy: userId })
        .populate('eventId',  'eventName vendorUsername vendorCompanyName')
        .populate('vendorId', 'name email')
        .populate('createdBy', 'name email');
    }else{
       return Event.find({ vendorId: userId })
      .populate('eventId',  'eventName vendorUsername vendorCompanyName')
      .populate('vendorId', 'name email')
      .populate('createdBy', 'name email');
    };
  },
  create: async (data: CreateEventInput, userId: string): Promise<IEvent> => {
    const user = await User.findById(userId).orFail(() =>
      new AppError('User not found', 404)
    );

    if (user.role !== 'hr') {
      throw new AppError('Only HR can create events', 403);
    }

    const eventItem = await EventItem.findById(data.eventId).orFail(() =>
      new AppError('Event item not found', 404)
    );

    const event = new Event({
      companyName:   user.companyName,
      eventId:       new mongoose.Types.ObjectId(data.eventId),
      vendorId:      eventItem.vendorId,
      createdBy:     new mongoose.Types.ObjectId(userId),
      proposedDates: data.proposedDates.map((d) => new Date(d)),
      location:      data.location,
      remarks:       data.remarks ?? null,
      status:        'pending',
      confirmedDate: null,
    });

    return await event.save();
  },

  update: async (id: string, data: UpdateEventInput): Promise<IEvent> => {
    const updates: Partial<IEvent> = {};

    if (data.eventTypeId   !== undefined) updates.eventId       = new mongoose.Types.ObjectId(data.eventTypeId) as any;
    if (data.vendorId      !== undefined) updates.vendorId      = new mongoose.Types.ObjectId(data.vendorId)    as any;
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

    if (!updated) throw new AppError('Event not found', 404);

    return updated;
  },

  approve: async (id: string, confirmedDate: string): Promise<IEvent> => {
    const event = await Event.findById(id).orFail(() => new AppError('Event not found', 404));

    event.status = 'confirmed';
    event.confirmedDate = new Date(confirmedDate);  
    return await event.save();
  },

  cancel: async (id: string, remarks: string): Promise<IEvent> => {
    const event = await Event.findById(id).orFail(() => new AppError('Event not found', 404));

    event.status = 'cancelled';
    event.remarks = remarks;
    return await event.save();
  }

};