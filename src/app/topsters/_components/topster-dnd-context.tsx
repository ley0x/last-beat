"use client";
import React from 'react'
import { useAtom } from 'jotai';

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

import { gridAlbumsAtom } from '@/lib/store';
import { getCellId } from '@/lib/utils';

import { TopsterAlbumSearch } from './topster-album-search';
import { TopsterGrid } from './topster-grid';

export const TopsterDndContext = () => {
  const [albums, setAlbums] = useAtom(gridAlbumsAtom);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
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
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement, restrictToWindowEdges]}
    >
      <SortableContext
        items={albums.map((item, idx) => getCellId(item, idx))}
        strategy={rectSortingStrategy}
      >
        <TopsterAlbumSearch />
        <TopsterGrid />
      </SortableContext>
    </DndContext>
  )
}

