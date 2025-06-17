"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import { cn } from "@lib/utils"

import { Label } from "@components/ui/label"
import { Switch } from "@components/ui/switch"
import { Slider } from "@components/ui/slider"

import Divider from "@common/divider";
import { gridAlbumsAtom, topsterGapAtom, topsterHeightAtom, topsterRoundCornersAtom, topsterShowTitlesAtom, topsterTitleAtom, topsterWidthAtom } from "@lib/store";

import { Input } from "@components/ui/input"
import { MAX_TOPSTER_HEIGHT, MAX_TOPSTER_WIDTH, MIN_TOPSTER_HEIGHT, MIN_TOPSTER_WIDTH } from "@lib/constants";
import { GridSize } from "@lib/types";

export const TopsterOptions = () => {
  const [showTitles, setShowTitles] = useAtom(topsterShowTitlesAtom);
  const [roundCorners, setRoundCorners] = useAtom(topsterRoundCornersAtom);
  const [topsterWidth, setTopsterWidth] = useAtom(topsterWidthAtom);
  const [topsterHeight, setTopsterHeight] = useAtom(topsterHeightAtom);
  const [topsterTitle, setTopsterTitle] = useAtom(topsterTitleAtom);
  const [, setAlbums] = useAtom(gridAlbumsAtom);
  const [topsterGaps, setTopsterGap] = useAtom(topsterGapAtom);

  useEffect(() => {
    setAlbums((albums) => ([...albums, ...Array(topsterWidth * topsterHeight).fill(null)].slice(0, topsterWidth * topsterHeight)));
  }, [topsterWidth, topsterHeight, setAlbums]);

  return (
    <>
      <div className="flex justify-between w-full flex-wrap gap-1">
        <Label htmlFor="show-titles">Title</Label>
        <Input className="w-min" type="title" value={topsterTitle} onChange={(e) => setTopsterTitle(e.target.value)} />
      </div>
      <Divider className="my-1" />
      <div className="flex justify-between w-full flex-wrap gap-1">
        <Label htmlFor="show-titles">Show albums names</Label>
        <Switch
          id="show-titles"
          onCheckedChange={() => setShowTitles(showTitles => !showTitles)}
          checked={showTitles}
        />
      </div>
      <Divider className="my-1" />
      <div className="flex justify-between w-full flex-wrap gap-1">
        <Label htmlFor="width">Width</Label>
        <Slider
          defaultValue={[5]}
          value={[topsterWidth]}
          id="width"
          max={MAX_TOPSTER_WIDTH}
          min={MIN_TOPSTER_WIDTH}
          step={1}
          className={cn("w-[60%]")}
          onValueChange={(value: GridSize[]) => setTopsterWidth(value[0])}
        />
        <span>{topsterWidth}</span>
      </div>
      <div className="flex justify-between w-full flex-wrap gap-1">
        <Label htmlFor="height">Height</Label>
        <Slider
          defaultValue={[5]}
          value={[topsterHeight]}
          id="height"
          max={MAX_TOPSTER_HEIGHT}
          min={MIN_TOPSTER_HEIGHT}
          step={1}
          className={cn("w-[60%]")}
          onValueChange={(value: GridSize[]) => setTopsterHeight(value[0])}
        />
        <span>{topsterHeight}</span>
      </div>
      <Divider className="my-1" />
      <div className="flex justify-between w-full flex-wrap gap-1">
        <Label htmlFor="round-corners">Gaps</Label>
        <Switch
          id="gaps"
          onCheckedChange={() => setTopsterGap(topsterGap => !topsterGap)}
          checked={topsterGaps}
        />
      </div>
      <div className="flex justify-between w-full flex-wrap gap-1">
        <Label htmlFor="round-corners">Round corners</Label>
        <Switch
          id="round-corners"
          onCheckedChange={() => setRoundCorners(roundCorners => !roundCorners)}
          checked={roundCorners}
        />
      </div>
    </>
  );
}
