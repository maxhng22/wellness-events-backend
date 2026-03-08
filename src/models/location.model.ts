import mongoose, { Document, Schema } from 'mongoose';


export interface ILocation extends Document {
  postcode: string;
  city: string;
  state: string | null;
   statecode: string | null;
}

const eventSchema = new Schema<ILocation>(
  {
    postcode :{ type: String, required: true, default: null },
    city: { type: String, required: true, default: null },
    state: { type: String, default: null },
    statecode: { type: String, default: null }
  },
  { timestamps: true }
);

export const Location = mongoose.model<ILocation>('locations', eventSchema);