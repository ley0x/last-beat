import { z } from "zod";
import { LastFmTopTracks, TimeframeSchema } from "./zod/schemas";

export type Timeframe = z.infer<typeof TimeframeSchema>;

export type Alltracks = z.infer<typeof LastFmTopTracks>[] | null;