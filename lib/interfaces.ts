type Image = {
  id: number;
  imageSrc: string;
  productId: string;
};

export interface SingleProduct {
  id: string;
  addedAt: Date;
  slug: string;
  price: number;
  title: string;
  quantity: number;
  description: string;
  sku: number;
  colors: string[];
  sizes: string[];
  images: Image[];
  categories: string[];
  isFeatured: Boolean;
}

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
  product: SingleProduct;
};

export interface UserCart {
  id: string;
  total: number;
  quantity: number;
  userId: string;
  CartItems: CartItem[];
}
