import mongoose, { Types } from 'mongoose';
import Category from './Category';

const Schema = mongoose.Schema;

interface IObject extends Document {
  title: string;
  cost: number;
  description: string;
  category: Types.ObjectId;
  numberOfApartments: number;
  readiness: string;
  apartmentArea: number;
  image: string;
  isDeleted: boolean;
}

enum Readiness {
  InDeveloping = 'in developing',
  StartedBuilding = 'started building',
  AlmostDone = 'almost done',
  Done = 'done',
}

const ObjectSchema = new Schema<IObject>(
  {
    title: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) =>
          await Category.findById(value),
        message: 'Category does not exist',
      },
    },
    numberOfApartments: {
      type: Number,
      required: true
    },
    readiness: {
      type: String,
      required: true,
      enum: Readiness,
    },
    apartmentArea: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const Apartment = mongoose.model<IObject>('Apartment', ObjectSchema);
export default Apartment;
