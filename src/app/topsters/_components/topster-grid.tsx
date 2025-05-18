"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { restrictToParentElement, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { z } from "zod";
import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas";
import { cn } from "@/lib/utils";
import { SortableCell } from "./sortable-cell";

export type TopsterGridAlbum = z.infer<typeof LastFmSearchAlbumSchema> | null;

interface TopsterGridProps {
  albums: TopsterGridAlbum[]; // length should be gridSize*gridSize
  gridSize?: number;
  onChange?: (albums: TopsterGridAlbum[]) => void;
}

export function TopsterGrid({ albums, gridSize = 5, onChange }: TopsterGridProps) {
  // Internal state for drag-and-drop
  const [items, setItems] = useState<TopsterGridAlbum[]>(albums.slice(0, gridSize * gridSize));

  useEffect(() => {
    setItems(albums.slice(0, gridSize * gridSize));
  }, [albums]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item, i) => (item ? item.url : `empty-${i}`) === active.id);
      const newIndex = items.findIndex((item, i) => (item ? item.url : `empty-${i}`) === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      onChange?.(newItems);
    }
  }

  // Helper to get a unique id for each cell (album url or empty)
  function getCellId(item: TopsterGridAlbum, idx: number) {
    return item ? item.url : `empty-${idx}`;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement, restrictToWindowEdges]}
    >
      <SortableContext
        items={items.map((item, idx) => getCellId(item, idx))}
        strategy={rectSortingStrategy}
      >
        <div
          className={cn("grid gap-1 bg-sidebar rounded-lg p-2 h-min max-w-full mx-auto my-auto", {

          })}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {items.map((item, idx) => (
            <SortableCell
              key={getCellId(item, idx)}
              id={getCellId(item, idx)}
              album={item}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
