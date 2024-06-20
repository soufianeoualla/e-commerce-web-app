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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

export const colors = [
  { id: 1, title: "black", hexCode: "#000000" },
  { id: 2, title: "brown", hexCode: "#6F4E37" },
  { id: 3, title: "grey", hexCode: "#DDDDDD" },
  { id: 4, title: "beige", hexCode: "#FED8B1" },
  { id: 5, title: "white", hexCode: "#FFFFFF" },
  { id: 6, title: "red", hexCode: "#FF0000" },
  { id: 7, title: "sky blue", hexCode: "#80C4E9" },
  { id: 8, title: "navy", hexCode: "#102C57" },
  { id: 9, title: "green", hexCode: "#365E32" },
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

export const timeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 }
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.name}${interval !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

