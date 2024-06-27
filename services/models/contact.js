import mongoose, { Schema } from 'mongoose';
import { handleSaveError } from './hooks.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: false }
);

schema.post('save', handleSaveError);

const Contact = mongoose.model('contact', schema);

export default Contact;
