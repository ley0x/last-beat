import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LastFmImage } from "./zod/schemas";
import { z } from "zod";

import { Timeframe } from '@/lib/types';
import { LastFmTopTracks } from '@/lib/zod/schemas';
import { MIN } from "./constances";

export const fetchUserTopTracks = async (username: string, timeframe: Timeframe, limit: number = MIN, page: number = 1) => {
  const url = new URL('/api/lastfm/top/tracks', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(username));
  url.searchParams.set('timeframe', encodeURIComponent(timeframe));
  url.searchParams.set('limit', encodeURIComponent(limit.toString()));
  url.searchParams.set('page', encodeURIComponent(page.toString()));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const data = LastFmTopTracks.array().parse(json.data);
  const respLimit = z.number().parse(json.limit)
  const respPage = z.number().parse(json.page)
  return { data, limit: respLimit, page: respPage };
}


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

    console.log('Image copied to clipboard!');
  } catch (error) {
    console.error('Error copying image to clipboard:', error);
  }
};
