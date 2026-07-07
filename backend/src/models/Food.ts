import mongoose, { Schema, Document } from 'mongoose';

export interface IFood extends Document {
  name: string;
  description: string;
  restaurant: mongoose.Types.ObjectId;
  menu: mongoose.Types.ObjectId;
  category: string;
  isVegetarian: boolean;
  price: number;
  tax?: number;
  images: string[];
  weight?: string;
  servingSize: 'Small' | 'Medium' | 'Large';
  servesHowMany: number;
  ratings: {
    taste: number;
    hygiene: number;
    freshness: number;
    valueForMoney: number;
    overall: number;
  };
  isAvailable: boolean;
  preparationTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

const foodSchema = new Schema<IFood>(
  {
    name: { type: String, required: true },
    description: String,
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    menu: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
    category: { type: String, required: true },
    isVegetarian: { type: Boolean, required: true },
    price: { type: Number, required: true },
    tax: Number,
    images: [String],
    weight: String,
    servingSize: { type: String, enum: ['Small', 'Medium', 'Large'], default: 'Medium' },
    servesHowMany: { type: Number, default: 1 },
    ratings: {
      taste: { type: Number, default: 0, min: 0, max: 5 },
      hygiene: { type: Number, default: 0, min: 0, max: 5 },
      freshness: { type: Number, default: 0, min: 0, max: 5 },
      valueForMoney: { type: Number, default: 0, min: 0, max: 5 },
      overall: { type: Number, default: 0, min: 0, max: 5 },
    },
    isAvailable: { type: Boolean, default: true },
    preparationTime: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IFood>('Food', foodSchema);
