import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useAtom } from "jotai";

import { cn } from "@/lib/utils";
import { topsterHeightAtom, topsterWidthAtom } from "@/lib/store";
import { SortableCellProps } from "../_types";
import { Album } from "./album";
import { DroppableCell } from "./droppable-cell";

/**
 * Sortable cell component that can contain an album or be empty (droppable)
 */
export const SortableCell = ({ id, album }: SortableCellProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [topsterWidth] = useAtom(topsterWidthAtom);
  const [topsterHeight] = useAtom(topsterHeightAtom);

  const max = Math.max(topsterWidth, topsterHeight);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const containerClasses = cn(
    "aspect-square cursor-pointer flex items-center justify-center overflow-hidden relative",
    {
      "size-24 sm:size-32 max-w-full": max <= 5,
      "size-full object-cover max-w-full max-h-36": max > 5,
    },
    {
      "z-10 opacity-0 cursor-grab": isDragging,
      "z-1": !isDragging,
      "bg-card": !album,
    }
  );

  return (
    <div
      ref={setNodeRef}
      className={containerClasses}
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
}; 
