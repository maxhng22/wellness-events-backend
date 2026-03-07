import jwt, { SignOptions } from 'jsonwebtoken';
import {  EventItem } from '../models/event_item.model';



export const eventItemService = {
  // Get all event items 
  findAll: async () => {
    return EventItem.find();
  },

  // Get single event item by ID
  findById: async (id: string) => {
    const user = await EventItem.findById(id);
    if (!user) throw Object.assign(new Error('Event item not found'), { statusCode: 404 });
    return user;
  },


};