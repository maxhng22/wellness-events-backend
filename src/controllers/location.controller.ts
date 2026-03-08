import { Request, Response, NextFunction } from 'express';
import { locationService } from '../services/location.service';


// GET /api/locations/:postcode
export const getLocationsByPostcode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const { postcode } = req.params;
    if (!postcode) {
      res.status(400).json({ success: false, message: 'Postcode is required' });
      return;
    }
    const locations = await locationService.findByPostcode(postcode);
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    next(error);
  }
};




