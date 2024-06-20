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
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

const initialCart = {
  id: "xxxx",
  userId: "xxxxx",
  cartItems: [],
  total: 0,
  quantity: 0,
};

const getSavedCart = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialCart;
  }
  return initialCart;
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
  cart: initialCart,
  addProduct: () => {},
  handleQuantity: () => {},
  deleteProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(getSavedCart());
  const [trigger, setTrigger] = useState<number>(0);
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
  }, [status,trigger]);

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
      addtoCart(product, color, size, quantity);
    } else {
      const newState = { ...cart };
      const existingItem = newState.cartItems.find(
        (item) =>
          item.productId === product.id &&
          item.color === color &&
          item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const newCartItem = {
          product,
          size,
          color,
          quantity,
          id: uuid(),
          cartId: "xxxx",
          productId: product.id,
        };
        newState.cartItems.push(newCartItem);
      }

      newState.quantity += quantity;
      newState.total += product.price * quantity;
      setCart(newState);
    }
    toast.success("Item added to your cart");
    setTrigger(Math.random() * 100);
  };

  const handleQuantity = (operation: "plus" | "minus", id: string) => {
    if (status === "authenticated") {
      handleCartItemQuantity(operation, id);
    } else {
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
    }
    setTrigger(Math.random() * 100);
  };

  const deleteProduct = (id: string) => {
    if (status === "authenticated") {
      deleteCartItem(id);
    } else {
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
    }
    toast.success("Item deleted from your cart");
    setTrigger(Math.random() * 100);
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
