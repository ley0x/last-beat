import { z } from "zod";
import { LastFmTopTracks, TimeframeSchema } from "./zod/schemas";

export type Timeframe = z.infer<typeof TimeframeSchema>;

export type Alltracks = z.infer<typeof LastFmTopTracks>[] | null;


export type AvailableColors = "red" | "orange" | "amber" | "yellow" | "green" | "emerald" | "cyan" | "sky" | "blue" | "indigo" | "purple" | "pink" | "rose" | "white" | "black";
export type AvailableShapes = "horizontal" | "square" | "vertical";
export type AvailableTxtSizes = "sm" | "md" | "lg";
