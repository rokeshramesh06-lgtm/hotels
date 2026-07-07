import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  items: {
    food: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  tax: number;
  deliveryCharge: number;
  discount?: number;
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  estimatedTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [
      {
        food: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    deliveryCharge: { type: Number, default: 0 },
    discount: Number,
    orderType: { type: String, enum: ['delivery', 'pickup'], required: true },
    deliveryAddress: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
      default: 'pending',
    },
    estimatedTime: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
