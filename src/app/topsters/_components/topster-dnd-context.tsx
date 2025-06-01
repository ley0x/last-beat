"use client";
import React from 'react'

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
import { useAtom } from 'jotai';
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
    if (over && active.id !== over.id) {
      const oldIndex = albums.findIndex((item, i) => (item ? item.url : `empty-${i}`) === active.id);
      const newIndex = albums.findIndex((item, i) => (item ? item.url : `empty-${i}`) === over.id);
      const newItems = arrayMove(albums, oldIndex, newIndex);
      setAlbums(newItems);
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

