import { Request, Response, NextFunction } from 'express';
import { eventService } from '../services/event.service';


// GET /api/users
export const createNewEvent = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const event= await eventService.create(_req.body);
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




