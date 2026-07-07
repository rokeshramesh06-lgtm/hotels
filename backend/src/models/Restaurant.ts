import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
  };
  cuisine: string[];
  phoneNumber: string;
  whatsappNumber?: string;
  businessHours: {
    Monday: { open: string; close: string };
    Tuesday: { open: string; close: string };
    Wednesday: { open: string; close: string };
    Thursday: { open: string; close: string };
    Friday: { open: string; close: string };
    Saturday: { open: string; close: string };
    Sunday: { open: string; close: string };
  };
  isAC: boolean;
  isFamilyFriendly: boolean;
  averageRating: number;
  totalReviews: number;
  restaurantImage?: string;
  menu: mongoose.Types.ObjectId[];
  offers: mongoose.Types.ObjectId[];
  reviews: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    cuisine: [String],
    phoneNumber: { type: String, required: true },
    whatsappNumber: String,
    businessHours: {
      Monday: { open: String, close: String },
      Tuesday: { open: String, close: String },
      Wednesday: { open: String, close: String },
      Thursday: { open: String, close: String },
      Friday: { open: String, close: String },
      Saturday: { open: String, close: String },
      Sunday: { open: String, close: String },
    },
    isAC: { type: Boolean, default: false },
    isFamilyFriendly: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    restaurantImage: String,
    menu: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    offers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

restaurantSchema.index({ 'location.latitude': '2dsphere', 'location.longitude': '2dsphere' });

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
