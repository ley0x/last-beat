"use client";

import React, { useEffect, useRef, useState } from 'react'
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

const AspectRatioDiv = ({ children }: { children: React.ReactNode }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef) return;
    if (!divRef.current) return;
    const aspectRatio = 16 / 9;
    const updateHeight = () => {
      const width = divRef?.current?.offsetWidth || 500;
      const height = width / aspectRatio;
      if (divRef?.current?.style?.height) {
        divRef.current.style.height = `${height}px`;
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="bg-red-500/20 w-full flex flex-col sm:flex-row aspect-w-16 aspect-h-9 overflow-hidden"
    >
      {children}
    </div>
  );
};
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
        {/* topster  */}
        <section className="grow border border-red-500 flex flex-col gap-2">
          <TopsterGridHeader elementRef={ref} />
          <Card className="py-0 overflow-hidden mx-auto w-full max-w-full" >
            <section ref={ref} className="bg-card py-2">
              <CardHeader>
                <CardTitle className="mx-auto">{topsterTitle}</CardTitle>
                <Divider className="my-1" />
              </CardHeader>
              <CardContent className="flex justify-evenly w-full h-full">
                <AspectRatioDiv>
                  <TopsterGrid />
                  <Titles />
                </AspectRatioDiv>
              </CardContent>
            </section>
          </Card>
        </section>
        {/* sidebar */}
        <TopsterSidebar />
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

