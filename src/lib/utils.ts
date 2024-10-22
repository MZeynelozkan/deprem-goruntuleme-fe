import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getUTCDate().toString().padStart(2, "0"); // Gün (2 haneli)
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Ay (2 haneli)
  const year = date.getUTCFullYear(); // Yıl

  // Formatlanmış kısa tarih: 11/10/2024
  return `${day}/${month}/${year}`;
};
