import mongoose, { Schema, Document } from 'mongoose';

export interface IMenu extends Document {
  name: string;
  restaurant: mongoose.Types.ObjectId;
  categories: {
    name: string;
    description?: string;
    icon?: string;
  }[];
  foods: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    categories: [
      {
        name: { type: String, required: true },
        description: String,
        icon: String,
      },
    ],
    foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMenu>('Menu', menuSchema);
