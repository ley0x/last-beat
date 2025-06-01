import React, { useState } from "react";

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
import { useDndMonitor } from "@dnd-kit/core";

export const SortableCell = ({ id, album }: SortableCellProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [dragging, setDragging] = useState(false);
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useDndMonitor({
    onDragStart(event) {
      console.log('onDragStart', event);
      setDragging(true);
    },
    onDragEnd(event) {
      console.log('onDragEnd', event);
      setDragging(false);
    },
    onDragCancel(event) {
      console.log('onDragCancel', event);
      setDragging(false);
    },
  });
  return (
    <div ref={setNodeRef}
      className={cn("cursor-pointer flex items-center justify-center overflow-hidden relative h-[120px] w-[120px]", {
        "z-10 opacity-80 cursor-grab": isDragging,
        "z-1": !isDragging,
        "bg-card": !album,
      })}
      style={style}
      {...attributes}
      {...listeners}>
      {album ? (
        <Album album={album} />
      ) : (
        <>
          {dragging ? <span>Empty {id}</span> : <DroppableCell id={id} />}
        </>
      )}
    </div>
  );
} 
