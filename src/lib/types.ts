import { z } from "zod";
import { TimeframeSchema } from "./zod/schemas";

export type Timeframe = z.infer<typeof TimeframeSchema>;
