'use client';

import { useAtom } from 'jotai';

import { lcBgColor, lcBlur, lcBrightness, lcCenterText, lcGrayscale, lcOpacity, lcShape, lcShowBgImage, lcShowCredits, lcShowQuotes, lcShowWatermark, lcTxtColor, lcTxtSize } from '@lib/store';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip"

import { Button } from '@components/ui/button';

export const ResetButton = () => {

  const [, setBgColor] = useAtom(lcBgColor);
  const [, setTxtColor] = useAtom(lcTxtColor);
  const [, setTxtSize] = useAtom(lcTxtSize);
  const [, setShape] = useAtom(lcShape);

  const [, setBgImage] = useAtom(lcShowBgImage);
  const [, setWatermark] = useAtom(lcShowWatermark);
  const [, setGrayscale] = useAtom(lcGrayscale);
  const [, setBlur] = useAtom(lcBlur);
  const [, setBrightness] = useAtom(lcBrightness);
  const [, setOpacity] = useAtom(lcOpacity);

  const [, setShowQuotes] = useAtom(lcShowQuotes);
  const [, setShowCredits] = useAtom(lcShowCredits);
  const [, setCenter] = useAtom(lcCenterText);

  const handleReset = () => {
    setBgColor("black");
    setTxtColor("white");
    setTxtSize("md");
    setShape("horizontal");
    setBgImage(true);
    setWatermark(true);
    setGrayscale(false);
    setBlur(false);
    setBrightness(false);
    setOpacity(false);
    setShowQuotes(true);
    setShowCredits(true);
    setCenter(false);
  }
  return (

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" className="text-lg cursor-pointer" onClick={handleReset}>🔄</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reset appearance</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
