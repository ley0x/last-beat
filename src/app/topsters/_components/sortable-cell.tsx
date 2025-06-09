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
import { useAtom } from "jotai";
import { topsterHeightAtom, topsterWidthAtom } from "@/lib/store";

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
  const min = Math.max(topsterWidth, topsterHeight);
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "size-full max-h-36 aspect-square cursor-pointer flex items-center justify-center overflow-hidden relative",
        {
          "size-24 sm:size-32": min <= 5,
          "size-full": min > 5,
        },
        {
          "z-10 opacity-0 cursor-grab": isDragging,
          "z-1": !isDragging,
          "bg-card": !album,
        }
      )}
      style={style}
      {...attributes}
      {...listeners}
    >
      {album ? (
        <Album album={album} />
      ) : (
        <DroppableCell id={id} />
      )}
    </div>
  );
} 
