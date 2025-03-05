import { timeframeAtom } from "@/lib/store";
import { Timeframe } from "@/lib/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const useTimeframe = () => {
  const map = {
    "7day": "last 7 days",
    "1month": "last month",
    "3month": "last 3 months",
    "6month": "last 6 months",
    "12month": "last 12 months",
    "overall": "overall",
  }
  const getTimeframe = (timeframe: Timeframe) => {
    return map[timeframe];
  }

  const [timeframe] = useAtom(timeframeAtom);
  const [txt, setTxt] = useState(map[timeframe]);

  useEffect(() => {
    setTxt(getTimeframe(timeframe));
  }, [timeframe])

  return txt;
}
