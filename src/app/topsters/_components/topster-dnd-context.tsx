"use client";

import React, { useRef, useState } from 'react'
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { gridAlbumsAtom, topsterTitleAtom } from '@/lib/store';
import { getCellId } from '@/lib/utils';
import { LastFmSearchAlbumSchema } from '@/lib/zod/schemas';

import { TopsterGrid } from './topster-grid';
import { Album } from './album';
import { Titles } from './titles';
import { TopsterSidebar } from './topster-sidebar';
import Divider from '@/components/_common/divider';
import { TopsterGridHeader } from './topster-grid-header';

export const TopsterDndContext = () => {
  const [albums, setAlbums] = useAtom(gridAlbumsAtom);
  const [activeItem, setActiveItem] = useState<z.infer<typeof LastFmSearchAlbumSchema> | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const [topsterTitle] = useAtom(topsterTitleAtom);
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
        {/* Main Layout Container */}
        <div className="w-full min-h-screen flex flex-col lg:flex-row gap-4 p-4">
          {/* Topster Section */}
          <section className="flex-1 flex flex-col gap-2">
            <TopsterGridHeader elementRef={ref} />
            <Card className="overflow-hidden w-full pt-4 max-w-full">
              <section ref={ref} className="bg-card">
                <CardHeader className="gap-0">
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    {topsterTitle}
                  </CardTitle>
                  <Divider className="mb-4 mt-2" />
                </CardHeader>
                <CardContent className="px-4">
                  <div className="w-full mx-auto">
                    <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 justify-around items-center relative w-full">
                      <TopsterGrid />
                      <Titles />
                    </div>
                  </div>
                </CardContent>
              </section>
            </Card>
          </section>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <TopsterSidebar />
          </aside>
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-80 shadow-lg">
            <Album album={activeItem} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

