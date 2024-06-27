import mongoose from 'mongoose';
import { handleSaveError } from './hooks.js';

const schema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

schema.post('save', handleSaveError);

const User = mongoose.model('user', schema);
export default User;
