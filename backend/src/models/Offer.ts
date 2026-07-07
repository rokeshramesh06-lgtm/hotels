import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  restaurant: mongoose.Types.ObjectId;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  applicableFoods?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new Schema<IOffer>(
  {
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    title: { type: String, required: true },
    description: String,
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    minOrderAmount: Number,
    maxDiscount: Number,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    applicableFoods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
  },
  { timestamps: true }
);

export default mongoose.model<IOffer>('Offer', offerSchema);
