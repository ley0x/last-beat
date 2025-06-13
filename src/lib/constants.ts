import { AvailableColors, AvailableTxtSizes } from "./types";

export const MIN = 8;
export const MAX = 80;

export const colors: Record<AvailableColors, string> = {
  "red": "bg-red-500",
  "orange": "bg-orange-500",
  "amber": "bg-amber-500",
  "yellow": "bg-yellow-500",
  "green": "bg-green-500",
  "emerald": "bg-emerald-500",
  "cyan": "bg-cyan-500",
  "sky": "bg-sky-500",
  "blue": "bg-blue-500",
  "indigo": "bg-indigo-500",
  "purple": "bg-purple-500",
  "pink": "bg-pink-500",
  "rose": "bg-rose-500",
  "white": "bg-neutral-50",
  "black": "bg-neutral-950",
}


export const sizeMap: Record<AvailableTxtSizes, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

export const quoteMap: Record<AvailableTxtSizes, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

export const bgColorMap: Record<AvailableColors, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
  white: "bg-neutral-50",
  black: "bg-neutral-950",
}


export const shapeStyle = {
  square: "size-96",
  horizontal: "w-96 h-72",
  vertical: "w-72 h-96",
}

export const MAX_TOPSTER_WIDTH = 10;
export const MAX_TOPSTER_HEIGHT = 10;
export const MIN_TOPSTER_WIDTH = 2;
export const MIN_TOPSTER_HEIGHT = 2;
