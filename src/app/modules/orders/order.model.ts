import { Schema, model } from 'mongoose';
import { Iorder } from './orders.interfaces';

const orderSchema = new Schema<Iorder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow', 
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Order = model<Iorder>('Order', orderSchema);
