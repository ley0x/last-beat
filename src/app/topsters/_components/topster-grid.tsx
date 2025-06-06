"use client";

import React from "react";
import { useAtom } from "jotai";

import { cn, getCellId } from "@/lib/utils";
import { gridAlbumsAtom, topsterHeightAtom, topsterWidthAtom } from "@/lib/store";
import { SortableCell } from "./sortable-cell";


export const TopsterGrid = () => {
  const [albums] = useAtom(gridAlbumsAtom);
  const [topsterWidth] = useAtom(topsterWidthAtom);
  const [topsterHeight] = useAtom(topsterHeightAtom);


  return (
    <div
      className={cn("grow relative grid gap-1 shadow h-min")}
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
}
