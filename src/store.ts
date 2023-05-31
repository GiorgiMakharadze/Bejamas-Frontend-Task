import { create } from "zustand";
import axios from "axios";
import HttpStatus from "http-status-codes";
import { StoreState } from "./types/zustandTypes";
import { Product } from "./types/productTypes";

const dataFetch = axios.create({
<<<<<<< HEAD
  baseURL: `${process.env.REACT_APP_DEPLOYMENT_PORT}/api/v1`,
=======
  baseURL: `https://bejamas-front-end.onrender.com/api/v1`,
>>>>>>> 6c27b98da0d7a80dd2db23c481919fda8f1894b3
});

let url = `/products`;
let url2 = `/cart`;

dataFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === HttpStatus.UNAUTHORIZED) {
      console.log(error);
      return;
    }
    return Promise.reject(error);
  }
);

const handleError = (error: Error | any, set: Function) => {
  if (error.response) {
    set({ error: HttpStatus.getStatusText(error.response.status) });
  } else {
    set({ error: error.message });
  }
};

const productsStore = create<StoreState>((set) => ({
  data: [],
  cart: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  featuredProduct: null,

  fetchProductsData: async (
    page = 1,
    limit = 6,
    sortType = "Price",
    sortOrder = "Ascending"
  ) => {
    try {
      set({ loading: true });

      const response = await dataFetch.get(
        `${url}?page=${page}&limit=${limit}&sortType=${sortType}&sortOrder=${sortOrder}`
      );

      set({
        data: response.data.products,
        error: null,
        page,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      handleError(error, set);
    } finally {
      set({ loading: false });
    }
  },
  fetchFeaturedProduct: async () => {
    try {
      set({ loading: true });
      const response = await dataFetch.get(`${url}?featured=true`);
      const featuredProduct = response.data.products.find(
        (product: Product) => product.featured === true
      );
      set({
        featuredProduct,
        error: null,
      });
    } catch (error: Error | any) {
      if (error.response) {
        set({ error: HttpStatus.getStatusText(error.response.status) });
      } else {
        set({ error: error.message });
      }
    } finally {
      set({ loading: false });
    }
  },
  addToCart: async (productId: string, quantity: number = 1) => {
    try {
      set({ loading: true });
      const response = await dataFetch.post(url2, {
        productId,
        quantity,
      });

      if (response.status !== HttpStatus.CREATED) {
        throw new Error("Error adding item to cart");
      }

      console.log("Item added to cart:", response.data);

      set((state) => ({
        cart: [...state.cart, response.data.cartItem],
      }));
    } catch (error: Error | any) {
      if (error.response) {
        set({ error: HttpStatus.getStatusText(error.response.status) });
      } else {
        set({ error: error.message });
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchCartData: async () => {
    set({ loading: true });
    try {
      const response = await dataFetch.get(url2);
      set({
        cart: response.data.cartItems,
        error: null,
      });
    } catch (error: Error | any) {
      if (error.response) {
        set({ error: HttpStatus.getStatusText(error.response.status) });
      } else {
        set({ error: error.message });
      }
    } finally {
      set({ loading: false });
    }
  },
  deleteFromCart: async (cartItemId: string) => {
    try {
      set({ loading: true });

      const response = await dataFetch.delete(`${url2}?itemId=${cartItemId}`);

      if (response.status !== HttpStatus.OK) {
        throw new Error("Error deleting item from cart");
      }

      console.log("Item deleted from cart");

      set((state) => ({
        cart: state.cart.filter((item) => item._id !== cartItemId),
      }));
    } catch (error: Error | any) {
      if (error.response) {
        set({ error: HttpStatus.getStatusText(error.response.status) });
      } else {
        set({ error: error.message });
      }
    } finally {
      set({ loading: false });
    }
  },
  clearCart: async () => {
    try {
      set({ loading: true });
      const response = await dataFetch.delete(`${url2}?clearAll=true`);

      if (response.status !== HttpStatus.OK) {
        throw new Error("Error clearing the cart");
      }

      console.log("Cart cleared");
      set({ cart: [] });
    } catch (error: Error | any) {
      if (error.response) {
        set({ error: HttpStatus.getStatusText(error.response.status) });
      } else {
        set({ error: error.message });
      }
    } finally {
      set({ loading: false });
    }
  },
}));

export default productsStore;
