"use client";

import React from "react";
import { useAtom } from "jotai";

import { cn, getCellId } from "@/lib/utils";
import { gridAlbumsAtom, topsterGapAtom, topsterHeightAtom, topsterWidthAtom } from "@/lib/store";
import { SortableCell } from "./sortable-cell";
import { GRID_CLASSES } from "../_constants";

/*
* Topster grid component that displays albums in a sortable grid layout
*/
export const TopsterGrid = () => {
  const [albums] = useAtom(gridAlbumsAtom);
  const [topsterWidth] = useAtom(topsterWidthAtom);
  const [topsterHeight] = useAtom(topsterHeightAtom);
  const [topsterGap] = useAtom(topsterGapAtom);

  return (
    <div
      className={cn(
        'relative grid shadow h-min',
        GRID_CLASSES.cols[topsterWidth],
        GRID_CLASSES.rows[topsterHeight], topsterGap && 'gap-[1px] lg:gap-[2px] xl:gap-1'
      )}
      style={{
        gridTemplateColumns: `repeat(${topsterWidth}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${topsterHeight}, minmax(0, 1fr))`,
      }}
    >
      {albums.map((album, idx) => (
        <SortableCell
          key={getCellId(album, idx)}
          id={getCellId(album, idx)}
          album={album}
        />
      ))}
    </div>
  );
};
