import React from "react";
import Image from "next/image";

import { cn, findLargestImage } from "@/lib/utils";
import { TopsterGridAlbum } from "./topster-grid";

interface SortableCellProps {
  id: string;
  album: TopsterGridAlbum;
}

import { CSS } from "@dnd-kit/utilities";

import {
  useSortable,
} from "@dnd-kit/sortable";

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

  return (
    <div ref={setNodeRef}
      className={cn("cursor-pointer flex items-center justify-center overflow-hidden relative h-[120px] w-[120px]", {
        "z-10 border cursor-grab": isDragging,
        "z-1": !isDragging,
        "bg-card": !album,
      })}
      style={style}
      {...attributes}
      {...listeners}>
      {album ? (
        <Image
          src={findLargestImage(album.image)}
          alt={album.name}
          width={120}
          height={120}
          className="object-cover w-full h-full"
          unoptimized
        />
      ) : (
        <span className="text-neutral-700 text-xs">Empty {id}</span>
      )}
    </div>
  );
} 
