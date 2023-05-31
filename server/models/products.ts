import mongoose, { Schema } from "mongoose";
import { Product } from "../types/productTypes";

type Data = {
  products: Product[];
  msg: string;
};

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  image: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  details: {
    type: {
      description: String,
      dimmentions: {
        width: Number,
        height: Number,
      },
      recommendations: [
        {
          src: String,
          alt: String,
        },
      ],
      size: Number,
    },
    default: null,
  },
});
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export { ProductModel };
