import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

import { Alltracks, AvailableColors, AvailableShapes, AvailableTxtSizes, Timeframe } from './types';


export const timeframeAtom = atom<Timeframe>("1month");
export const allTracksAtom = atom<Alltracks>(null);
// export const timeframeAtom = atomWithStorage<Timeframe>("timeframe", "7-days");
//
export const showGlowyBackgroundAtom = atom<boolean>(true);


export const lyricsBackground = atom<string | null>(null);

// lc for lyrics cards
export const lcLyricsBackground = atom<string | null>(null);
export const lcTrackLyrics = atom<string>("");
export const lcTrackName = atom<string>("");
export const lcTrackArtist = atom<string>("");
export const lcTrackUrl = atom<string>("");
export const lcSelectedLyrics = atomWithStorage<string>("lc-selected-lyrics", "");
export const lcBgColor = atomWithStorage<AvailableColors>("lc-bg-color", "red");
export const lcTxtColor = atomWithStorage<AvailableColors>("lc-txt-color", "red");
export const lcTxtSize = atomWithStorage<AvailableTxtSizes>("lc-txt-size", "md");
export const lcShape = atomWithStorage<AvailableShapes>("lc-shape", "horizontal");
