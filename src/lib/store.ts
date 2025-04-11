import { atom } from 'jotai';
import { Alltracks, Timeframe } from './types';


export const timeframeAtom = atom<Timeframe>("1month");
export const allTracksAtom = atom<Alltracks>(null);
// export const timeframeAtom = atomWithStorage<Timeframe>("timeframe", "7-days");
