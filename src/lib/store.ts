import { atom } from 'jotai';
import { Timeframe } from './types';


export const timeframeAtom = atom<Timeframe>("1month");
// export const timeframeAtom = atomWithStorage<Timeframe>("timeframe", "7-days");
