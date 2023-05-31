export type Product = {
  id(id: any): void;
  _id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: {
    src: string;
    alt: string;
  };
  bestseller: boolean;
  featured: boolean;
  details: {
    description: string;
    dimmentions: {
      width: number;
      height: number;
    };
    recommendations: [
      {
        src: string;
        alt: string;
      }
    ];
    size: number;
  };
};

export interface ProductsData {
  products: Product[];
}
