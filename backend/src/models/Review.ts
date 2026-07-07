import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  food?: mongoose.Types.ObjectId;
  rating: number;
  tasteRating?: number;
  hygieneRating?: number;
  freshnessRating?: number;
  valueForMoneyRating?: number;
  reviewText: string;
  images: string[];
  isResponsed: boolean;
  ownerResponse?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    food: { type: Schema.Types.ObjectId, ref: 'Food' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    tasteRating: { type: Number, min: 1, max: 5 },
    hygieneRating: { type: Number, min: 1, max: 5 },
    freshnessRating: { type: Number, min: 1, max: 5 },
    valueForMoneyRating: { type: Number, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    images: [String],
    isResponsed: { type: Boolean, default: false },
    ownerResponse: String,
  },
  { timestamps: true }
);

export default mongoose.model<IReview>('Review', reviewSchema);
