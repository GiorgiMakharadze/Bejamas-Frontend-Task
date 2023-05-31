import { Product } from "./productTypes";
import { ICartDocument } from "./cartTypes";

export interface StoreState {
  data: Product[];
  cart: ICartDocument[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  featuredProduct: Product | null;
  fetchFeaturedProduct: () => Promise<void>;
  fetchProductsData: (
    page?: number,
    limit?: number,
    sortType?: string,
    sortOrder?: string,
    categories?: string[],
    minPrice?: number,
    maxPrice?: number
  ) => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  fetchCartData: () => Promise<void>;
  clearCart: () => Promise<void>;
  deleteFromCart: (itemId: string) => Promise<void>;
}
