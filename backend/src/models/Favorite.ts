import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  restaurant?: mongoose.Types.ObjectId;
  food?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    food: { type: Schema.Types.ObjectId, ref: 'Food' },
  },
  { timestamps: true }
);

favoriteSchema.index({ user: 1, restaurant: 1 });
favoriteSchema.index({ user: 1, food: 1 });

export default mongoose.model<IFavorite>('Favorite', favoriteSchema);
