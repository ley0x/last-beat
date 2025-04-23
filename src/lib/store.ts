import { atom } from 'jotai';
import { Alltracks, Timeframe } from './types';


export const timeframeAtom = atom<Timeframe>("1month");
export const allTracksAtom = atom<Alltracks>(null);
// export const timeframeAtom = atomWithStorage<Timeframe>("timeframe", "7-days");
//
export const showGlowyBackgroundAtom = atom<boolean>(true);


export const lyricsBackground = atom<string | null>(null);

// lc for lyrics cards
export const lcLyricsBackground = atom<string | null>(null);
export const lcSelectedLyrics = atom<string>("");
export const lcTrackLyrics = atom<string>("");
export const lcTrackName = atom<string>("");
export const lcTrackArtist = atom<string>("");
export const lcTrackUrl = atom<string>("");
