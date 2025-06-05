"use client";

import React, { useRef, useState } from 'react'
import { useAtom } from 'jotai';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2 } from 'lucide-react';
import { DownloadTopster } from './download-topster';

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
        <TopsterSidebar />
        <section className="grow flex flex-col gap-2">
          <header className="flex gap-2 flex-wrap">
            <Button size="sm" variant="destructive" className="shrink-0 w-min">
              <Trash2 />
            </Button>
            <Button size="sm" variant="ghost" className="shrink-0 w-min bg-input/30 border">
              <PlusIcon />
            </Button>
            <Select>
              <SelectTrigger className="grow">
                <SelectValue placeholder="🔝 Select your topster" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Topsters</SelectLabel>
                  <SelectItem value="apple">Topster 1</SelectItem>
                  <SelectItem value="banana">Topster 2</SelectItem>
                  <SelectItem value="blueberry">Topster 3</SelectItem>
                  <SelectItem value="grapes">Topster 4</SelectItem>
                  <SelectItem value="pineapple">Topster 5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DownloadTopster elementRef={ref} />
          </header>
          <Card className="py-0 overflow-hidden" >
            <section ref={ref} className=" bg-card py-2">
              <CardHeader>
                <CardTitle className="mx-auto">{topsterTitle}</CardTitle>
                <Divider className="my-1" />
              </CardHeader>
              <CardContent className="flex items-start w-full gap-x-4 h-full">
                <TopsterGrid />
                <Titles />
              </CardContent>
            </section>
          </Card>
        </section>
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

