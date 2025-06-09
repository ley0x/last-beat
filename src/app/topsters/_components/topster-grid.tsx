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

  const gridClasses = {
    cols: {
      2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5',
      6: 'grid-cols-6', 7: 'grid-cols-7', 8: 'grid-cols-8', 9: 'grid-cols-9', 10: 'grid-cols-10'
    },
    rows: {
      2: 'grid-rows-2', 3: 'grid-rows-3', 4: 'grid-rows-4', 5: 'grid-rows-5',
      6: 'grid-rows-6', 7: 'grid-rows-7', 8: 'grid-rows-8', 9: 'grid-rows-9', 10: 'grid-rows-10'
    }
  };

  return (
    <div
      className={
        cn(
          "relative grid gap-1 shadow h-min",
          gridClasses.cols[topsterWidth],
          gridClasses.rows[topsterHeight]
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
}
