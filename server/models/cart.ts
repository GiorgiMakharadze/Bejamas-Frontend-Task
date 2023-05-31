import mongoose, { Schema } from "mongoose";
import { ICartItem } from "../types/cartTypes";
import { ICartDocument } from "../types/cartTypes";

const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

const CartSchema = new Schema<ICartDocument>({
  products: [CartItemSchema],
});

const Cart =
  mongoose.models.Cart || mongoose.model<ICartDocument>("Cart", CartSchema);

export { Cart };
