import { Request, Response, NextFunction } from 'express';
import { eventItemService } from '../services/event_item.service';


// GET /api/users
export const getAllEventItems = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const eventItems = await eventItemService.findAll();
    res.status(200).json({ success: true, count: eventItems.length, data: eventItems });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
export const getEventItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const eventItem = await eventItemService.findById(req.params.id);
    res.status(200).json({ success: true, data: eventItem });
  } catch (error) {
    next(error);
  }
};




