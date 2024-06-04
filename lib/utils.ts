import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (
  price: number,
  currency: string = "USD",
  locale: string = "en-US"
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",

    currency: currency,
  });
  return formatter.format(price);
};

export const colors = [
  { id: 1, title: "black", hexCode: "#000000" },
  { id: 2, title: "brown", hexCode: "#6F4E37" },
  { id: 3, title: "grey", hexCode: "#DDDDDD" },
  { id: 4, title: "beige", hexCode: "#FED8B1" },
  { id: 5, title: "navy blue", hexCode: "#000080" },
  { id: 6, title: "red", hexCode: "#FF0000" },
  { id: 7, title: "green", hexCode: "#008000" },
  { id: 8, title: "yellow", hexCode: "#FFFF00" },
  { id: 9, title: "pink", hexCode: "#FFC0CB" },
  { id: 10, title: "purple", hexCode: "#800080" }
];


export const sizes = [
  { id: 1, title: "XS" },
  { id: 2, title: "S" },
  { id: 3, title: "M" },
  { id: 4, title: "L" },
  { id: 5, title: "XL" },
  { id: 5, title: "2XL" },
];
