import { ShippingAddress, User } from "@prisma/client";

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
  isFeatured: boolean;
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

export interface OrderItem {
  id: number;
  orderId: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
  product: SingleProduct;
}

export interface Order {
  ref: string;
  id: string;
  createdAt: Date;
  amount: number;
  isPaid: boolean;
  userId: string;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
}

export interface WishlistItem {
  id: string;
  wishlistId: number;
  productId: string;
  product: SingleProduct;
}

export interface WishlistTypes {
  id: number;
  userId: string;
  products: WishlistItem[];
}

export interface Review {
  id: string;
  createdAt: Date;
  rating: number;
  text: string;
  productId: string;
  userId: string;
  user: {
    name: string;
  };
}
