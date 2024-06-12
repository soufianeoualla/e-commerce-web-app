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
import { v4 as uuid } from "uuid";

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
  return {
    id: "xxxx",
    userId: "xxxxx",
    cartItems: [],
    total: 0,
    quantity: 0,
  };
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
  const [updateTrigger, setupdateTrigger] = useState<number>(0);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        const cartData = await getUserCart();
        // @ts-ignore
        setCart(cartData);
      };
      fetchData();
    }else return
  }, [status, updateTrigger]);

  useEffect(() => {
    if (status === "authenticated") {
      localStorage.removeItem("cart");
    } else {
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
      addtoCart(product, color, size, quantity);
      return setupdateTrigger(Math.random() * 100);
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
        const cartItem = {
          product,
          size: size,
          color: color,
          quantity,
          id: uuid(),
          cartId: "xxxx",
          productId: product.id,
        };
        newState.cartItems.push(cartItem);
        newState.quantity += quantity;
        newState.total += product.price * quantity;
      }
    } else {
      const cartItem = {
        product,
        size: size,
        color: color,
        quantity,
        id: uuid(),
        cartId: "xxxx",
        productId: product.id,
      };
      newState.cartItems.push(cartItem);
      newState.quantity += quantity;
      newState.total += product.price * quantity;
    }
    setCart(newState);
    setupdateTrigger(Math.random() * 100);
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
      setupdateTrigger(Math.random() * 100);
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
      setupdateTrigger(Math.random() * 100);
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
