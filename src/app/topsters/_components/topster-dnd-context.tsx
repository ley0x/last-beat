"use client";
import React, { useState } from 'react'
import { useAtom } from 'jotai';
import { z } from 'zod';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { gridAlbumsAtom } from '@/lib/store';
import { getCellId } from '@/lib/utils';
import { LastFmSearchAlbumSchema } from '@/lib/zod/schemas';

import { TopsterAlbumSearch } from './topster-album-search';
import { TopsterGrid } from './topster-grid';
import { Album } from './album';

export const TopsterDndContext = () => {
  const [albums, setAlbums] = useAtom(gridAlbumsAtom);
  const [activeItem, setActiveItem] = useState<z.infer<typeof LastFmSearchAlbumSchema> | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    // Check if the dragged item is from search results (has album data)
    if (active.data.current?.album) {
      setActiveItem(active.data.current.album);
    } else {
      // Find the album in the grid
      const albumIndex = albums.findIndex((item, i) => (item ? item.url : `empty-${i}`) === active.id);
      if (albumIndex !== -1 && albums[albumIndex]) {
        setActiveItem(albums[albumIndex]);
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveItem(null);

    if (!over) return;

    // Check if this is an internal sort (moving items within the grid)
    const activeInGrid = albums.findIndex((item, i) => (item ? item.url : `empty-${i}`) === active.id);
    const overInGrid = albums.findIndex((item, i) => (item ? item.url : `empty-${i}`) === over.id);

    if (activeInGrid !== -1 && overInGrid !== -1 && active.id !== over.id) {
      // Internal sorting within the grid
      const newItems = arrayMove(albums, activeInGrid, overInGrid);
      setAlbums(newItems);
    } else if (activeInGrid === -1 && overInGrid !== -1) {
      // External drop - album from search results being dropped into grid
      // The active.data.current should contain the album data
      const albumData = active.data.current?.album;
      // check if mouse is really hovering over the grid
      const isHoveringOverGrid = over.id?.toString().startsWith("empty-");
      console.log("hovering over grid", over.id);
      if (!isHoveringOverGrid) {
        return;
      }

      if (albumData) {
        const newAlbums = [...albums];
        newAlbums[overInGrid] = albumData;
        setAlbums(newAlbums);
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[]}
    >
      <SortableContext
        items={albums.map((item, idx) => getCellId(item, idx))}
        strategy={rectSortingStrategy}
      >
        <TopsterAlbumSearch />
        <TopsterGrid />
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <div className="h-[120px] w-[120px] opacity-80 shadow-lg">
            <Album album={activeItem} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

