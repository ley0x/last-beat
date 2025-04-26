import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

import { Alltracks, AvailableColors, AvailableShapes, AvailableTxtSizes, Timeframe } from './types';
import { z } from 'zod';
import { LastFmTrackSchema } from './zod/schemas';


export const timeframeAtom = atom<Timeframe>("1month");
export const allTracksAtom = atom<Alltracks>(null);
// export const timeframeAtom = atomWithStorage<Timeframe>("timeframe", "7-days");
//
export const showGlowyBackgroundAtom = atom<boolean>(true);


export const lyricsBackground = atom<string | null>(null);

// lc for lyrics cards
export const lcLyricsBackground = atom<string | null>(null);
export const lcTrackLyrics = atom<string>("");
type TTrack = z.infer<typeof LastFmTrackSchema> | null;
export const lcSelectedTrack = atomWithStorage<TTrack>("lc-selected-track", null);
export const lcSelectedLyrics = atomWithStorage<string>("lc-selected-lyrics", "");
export const lcBgColor = atomWithStorage<AvailableColors>("lc-bg-color", "red");
export const lcTxtColor = atomWithStorage<AvailableColors>("lc-txt-color", "red");
export const lcTxtSize = atomWithStorage<AvailableTxtSizes>("lc-txt-size", "md");
export const lcShape = atomWithStorage<AvailableShapes>("lc-shape", "horizontal");
