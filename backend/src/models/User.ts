import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicture?: string;
  role: 'user' | 'restaurant_owner' | 'admin';
  location?: {
    latitude: number;
    longitude: number;
  };
  savedRestaurants: mongoose.Types.ObjectId[];
  savedDishes: mongoose.Types.ObjectId[];
  orderHistory: mongoose.Types.ObjectId[];
  reviews: mongoose.Types.ObjectId[];
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    profilePicture: String,
    role: { type: String, enum: ['user', 'restaurant_owner', 'admin'], default: 'user' },
    location: {
      latitude: Number,
      longitude: Number,
    },
    savedRestaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
    savedDishes: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
