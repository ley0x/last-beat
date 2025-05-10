import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

import { Alltracks, AvailableColors, AvailableShapes, AvailableTxtSizes, Timeframe } from './types';
import { z } from 'zod';
import { GeniusSearchTrackSchema } from './zod/schemas';


export const timeframeAtom = atom<Timeframe>("1month");
export const allTracksAtom = atom<Alltracks>(null);
export const showGlowyBackgroundAtom = atom<boolean>(true);


export const lyricsBackground = atom<string | null>(null);

// lc for lyrics cards
type TTrack = z.infer<typeof GeniusSearchTrackSchema> | null;

export const lcTrackLyrics = atom<string>("");
export const lcSelectedTrack = atomWithStorage<TTrack>("lc-selected-track", null);
export const lcSelectedLyrics = atomWithStorage<string>("lc-selected-lyrics", "");

export const lcBgColor = atomWithStorage<AvailableColors>("lc-bg-color", "white");
export const lcTxtColor = atomWithStorage<AvailableColors>("lc-txt-color", "black");
export const lcTxtSize = atomWithStorage<AvailableTxtSizes>("lc-txt-size", "md");
export const lcShape = atomWithStorage<AvailableShapes>("lc-shape", "horizontal");

export const lcShowWatermark = atomWithStorage<boolean>("lc-show-watermark", true);
export const lcGrayscale = atomWithStorage<boolean>("lc-grayscale", false);
export const lcBlur = atomWithStorage<boolean>("lc-blur", false);
export const lcBrightness = atomWithStorage<boolean>("lc-brightness", false);
export const lcOpacity = atomWithStorage<boolean>("lc-opacity", false);

export const lcShowQuotes = atomWithStorage<boolean>("lc-show-bg-quotes", true);
export const lcCenterText = atomWithStorage<boolean>("lc-center-text", false);

export const lcShowBgImage = atomWithStorage<boolean>("lc-show-bg-image", true);
export const lcShowCredits = atomWithStorage<boolean>("lc-show-credits", true);
export const lcLyricsBackground = atom<string | null>(null);

