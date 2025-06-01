"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";

import { cn, getCellId } from "@/lib/utils";
import { gridAlbumsAtom, gridSizeAtom } from "@/lib/store";
import { SortableCell } from "./sortable-cell";


export const TopsterGrid = () => {
  const [albums, setAlbums] = useAtom(gridAlbumsAtom);
  const [gridSize] = useAtom(gridSizeAtom);


  useEffect(() => {
    setAlbums(new Array(gridSize * gridSize).fill(null));
  }, [gridSize, setAlbums]);


  return (
    <div className="grow flex overflow-y-scroll">
      <div
        className={cn("grid gap-1 border shadow p-5 h-min max-w-full mx-auto my-auto", {

        })}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
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
    </div>
  );
}
