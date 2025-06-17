import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { z } from "zod";

import { Album, TopsterAlbum, TopsterGridAlbum } from "@lib/types";
import { LastFmImage } from "@lib/schemas";


export function beautifyNumber(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const formattedNumber = formatter.format(number).replace(/,/g, ' ');

  return formattedNumber;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findLargestImage = (images: z.infer<typeof LastFmImage>[]) => {
  if (images.length === 0) return "#";
  let largestImage = images[0]['#text'];
  for (let i = 1; i < images.length; i++) {
    if (images[i]['#text'].length > largestImage.length) {
      largestImage = images[i]['#text'];
    }
  }
  if (!largestImage) return "#";
  return largestImage;
}



export const arrayBufferToString = (buffer: ArrayBuffer) => {
  const decoder = new TextDecoder('utf-8');
  const decodedString = decoder.decode(buffer);
  return decodedString;
};


export const copyImageToClipboard = async (link: string) => {
  try {
    // Create an image element
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Set CORS to anonymous to handle cross-origin images

    // Wait for the image to load
    await new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = link;
    });

    // Create a canvas and draw the image
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get canvas context');
    }
    context.drawImage(img, 0, 0);

    // Convert canvas to a blob
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      throw new Error('Failed to create image blob');
    }

    // Copy the image blob to clipboard
    const clipboardItem = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([clipboardItem]);

  } catch (error) {
    console.error('Error copying image to clipboard:', error);
  }
};


// Helper to get a unique id for each cell (album url or empty)
export function getCellId(item: TopsterGridAlbum, idx: number) {
  return item ? item.url : `empty-${idx}`;
}

/**
 * Finds the index of a cell by its ID
 */
export const findCellIndex = (albums: TopsterAlbum[], cellId: string): number => {
  return albums.findIndex((item, i) => {
    const expectedId = item ? item.url : `empty-${i}`;
    return expectedId === cellId;
  });
};


/**
 * Filters out albums that are already in the grid
 */
export const filterAvailableAlbums = (searchResults: Album[], gridAlbums: TopsterAlbum[]): Album[] => {
  return searchResults.filter(album =>
    !gridAlbums.some(gridAlbum => gridAlbum?.url === album.url)
  );
};