import jwt, { SignOptions } from 'jsonwebtoken';
import { Location } from '../models/location.model';



export const locationService = {
    // Get all locations 
    findAll: async () => {
        return Location.find();
    },

    // Get single location by postcode
    findByPostcode: async (postcode: string) => {
        const locations = await Location.find({
            postcode: { $regex: `^${postcode}` }
        }).limit(15);

        if (!locations.length) throw Object.assign(new Error('Location not found'), { statusCode: 404 });

        return locations;
    },
};

