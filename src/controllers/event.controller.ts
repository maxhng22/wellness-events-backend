import { Request, Response, NextFunction } from 'express';
import { eventService } from '../services/event.service';


// GET /api/users
export const getAllEvent = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const events = await eventService.findAll();    
    res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
    next(error);
    }
};
export const createNewEvent = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const event= await eventService.create(_req.body,_req.user?.id || '');
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
export const updateEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const event = await eventService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};





