import { Request, Response, NextFunction } from 'express';
import { eventService } from '../services/event.service';


// GET /api/users
export const getAllEvent = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const events = await eventService.findAll(_req.user?.id || '');    
    res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
    next(error);
    }
};
export const createNewEvent = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { eventId, proposedDates, location } = _req.body;
    if (!eventId || !proposedDates || !location) {
      res.status(400).json({ success: false, message: 'Event ID, proposed dates, and location are required' });
      return;
    }
    const event= await eventService.create(_req.body,_req.user?.id || '');
    res.status(201).json({ success: true, data: event });
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

export const approveEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { confirmedDate } = req.body;
    if (!confirmedDate) {
      res.status(400).json({ success: false, message: 'Confirmed date is required to approve an event' });
      return;
    }
    console.log('Approving event with ID:', req.params.id, 'by user:', req.user?.id);
    const event = await eventService.approve(req.params.id,confirmedDate,req.user?.id || '');    
    res.status(200).json({ success: true, data: event });
    } catch (error) {
    next(error);
    }
};

export const cancelEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { remarks } = req.body;
    if (!remarks) {
      res.status(400).json({ success: false, message: 'Remarks are required to cancel an event' });
      return;
    }
    const event = await eventService.cancel(req.params.id, remarks, req.user?.id || '');    
    res.status(200).json({ success: true, data: event });
    } catch (error) {
    next(error);
    }   

};






