import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LastFmImage } from "./zod/schemas";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const findLargestImage = (images: z.infer<typeof LastFmImage>[]) => {
  let largestImage = images[0]['#text'];
  for (let i = 1; i < images.length; i++) {
    if (images[i]['#text'].length > largestImage.length) {
      largestImage = images[i]['#text'];
    }
  }
  if (!largestImage) return "#";
  return largestImage;
}
