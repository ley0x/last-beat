import React from "react";

import { cn } from "@/lib/utils";
import { Album } from "./album";

interface SortableCellProps {
  id: string;
  album: z.infer<typeof LastFmSearchAlbumSchema> | null;
}

import { CSS } from "@dnd-kit/utilities";

import {
  useSortable,
} from "@dnd-kit/sortable";

import { z } from "zod";
import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas";
import { DroppableCell } from "./droppable-cell";
import { topsterHeightAtom, topsterWidthAtom } from "@/lib/store";
import { useAtom } from "jotai";

export const SortableCell = ({ id, album }: SortableCellProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [topsterWidth] = useAtom(topsterWidthAtom);
  const [topsterHeight] = useAtom(topsterHeightAtom);

  const max = Math.max(topsterWidth, topsterHeight);

  return (
    <div ref={setNodeRef}
      className={cn("aspect-square cursor-pointer flex items-center justify-center overflow-hidden relative ", {
        "z-10 opacity-0 cursor-grab": isDragging,
        "z-1": !isDragging,
        "bg-card": !album,

      }, {
        "size-[80px]": [9, 10].includes(max),
        "size-[100px]": [7, 8].includes(max),
        "size-[120px]": [6].includes(max),
        "size-[140px]": [5, 4].includes(max),
        "size-[160px]": [3, 2].includes(max)
      })}
      style={style}
      {...attributes}
      {...listeners}>
      {album ? (
        <Album album={album} />
      ) : (
        <DroppableCell id={id} />
      )}
    </div>
  );
} 
