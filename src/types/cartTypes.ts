import { Product } from "./productTypes";

export interface ICartItem {
  product: Product;
  quantity: number;
}

export interface ICartDocument extends Document {
  _id: string;
  products: ICartItem[];
}
