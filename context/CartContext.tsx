"use client";

import {
  addtoCart,
  deleteCartItem,
  handleCartItemQuantity,
} from "@/actions/cart";
import { getUserCart } from "@/db/queries";
import { CartItem, SingleProduct } from "@/lib/interfaces";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";

const getSavedCart = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    } else {
      return {
        id: "xxxx",
        userId: "xxxxx",
        cartItems: [],
        total: 0,
        quantity: 0,
      };
    }
  }
};

type Cart = {
  id: string;
  userId: string;
  cartItems: CartItem[];
  total: number;
  quantity: number;
};

type ContextProps = {
  cart: Cart;
  addProduct: (
    product: SingleProduct,
    quantity: number,
    size: string,
    color: string
  ) => void;
  handleQuantity: (operation: "plus" | "minus", id: string) => void;
  deleteProduct: (id: string) => void;
};

export const CartContext = createContext<ContextProps>({
  cart: { id: "xxxx", userId: "xxxxx", cartItems: [], total: 0, quantity: 0 },
  addProduct: () => {},
  handleQuantity: () => {},
  deleteProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(getSavedCart());

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        const cartData = await getUserCart();
        // @ts-ignore
        setCart(cartData);
      };
      fetchData();
    }
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, status]);

  const addProduct = (
    product: SingleProduct,
    quantity: number,
    size: string,
    color: string
  ) => {
    if (status === "authenticated") {
      return addtoCart(product, color, size, quantity);
    }
    const newState = { ...cart };
    const isExist = newState.cartItems.some((item) => item.id === product.id);
    if (isExist) {
      const productIndex = newState.cartItems.findIndex(
        (item) => item.id === product.id
      );
      if (
        newState.cartItems[productIndex].color === size &&
        newState.cartItems[productIndex].size === color
      ) {
        newState.cartItems[productIndex].quantity += quantity;
        newState.quantity += quantity;
        newState.total += product.price;
      } else {
        const addedProduct = {
          product,
          size: size,
          color: color,
          quantity,
          id: "xxxx",
          cartId: "xxxx",
          productId: product.id,
        };
        newState.cartItems.push(addedProduct);
        newState.quantity += quantity;
        newState.total += product.price * quantity;
      }
    } else {
      const addedProduct = {
        product,
        size: size,
        color: color,
        quantity,
        id: "xxxx",
        cartId: "xxxx",
        productId: product.id,
      };
      newState.cartItems.push(addedProduct);
      newState.quantity += quantity;
      newState.total += product.price * quantity;
    }
    setCart(newState);
  };

  const handleQuantity = (operation: "plus" | "minus", id: string) => {
    if (status === "authenticated") {
      return handleCartItemQuantity(operation, id);
    }

    const newState = { ...cart };
    const index = newState.cartItems.findIndex((item) => item.id === id);

    if (index !== -1) {
      if (operation === "plus") {
        newState.cartItems[index].quantity += 1;
        newState.quantity += 1;
        newState.total += newState.cartItems[index].product.price;
      } else if (
        operation === "minus" &&
        newState.cartItems[index].quantity > 1
      ) {
        newState.cartItems[index].quantity -= 1;
        newState.quantity -= 1;
        newState.total -= newState.cartItems[index].product.price;
      }

      setCart(newState);
    }
  };

  const deleteProduct = (id: string) => {
    if (status === "authenticated") {
      return deleteCartItem(id);
    }

    const newState = { ...cart };
    const index = newState.cartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const selectedProduct = newState.cartItems[index];
      newState.cartItems.splice(index, 1);
      newState.quantity -= selectedProduct.quantity;
      newState.total -=
        selectedProduct.quantity * selectedProduct.product.price;
      setCart(newState);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        handleQuantity,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
