"use client";

import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { topsterTitleAtom } from '@/lib/store';
import { getCellId } from '@/lib/utils';
import { useTopsterDnd } from '@/hooks/use-topster-dnd';

import { TopsterGrid } from './topster-grid';
import { Album } from './album';
import { Titles } from './titles';
import { TopsterSidebar } from './topster-sidebar';
import Divider from '@/components/_common/divider';
import { TopsterGridHeader } from './topster-grid-header';

/**
 * Main container component that provides drag and drop context for the topster feature
 */
export const TopsterDndContext = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    albums,
    activeItem,
    sensors,
    handleDragStart,
    handleDragEnd,
    collisionDetection,
  } = useTopsterDnd();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={albums.map((item, idx) => getCellId(item, idx))}
        strategy={rectSortingStrategy}
      >
        <MainLayout
          cardRef={cardRef}
        />
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-80 shadow-lg">
            <Album album={activeItem} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

/**
 * Main layout component that structures the topster interface
 */
interface MainLayoutProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

const MainLayout = ({ cardRef }: MainLayoutProps) => {
  const [topsterTitle] = useAtom(topsterTitleAtom);
  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 px-4 py-1">
      <TopsterSection cardRef={cardRef} title={topsterTitle} />
      <SidebarSection />
    </div>
  );
}

/**
 * Topster section containing the grid and controls
 */
interface TopsterSectionProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  title: string;
}

const TopsterSection = ({ cardRef, title }: TopsterSectionProps) => (
  <section className="flex-1 flex flex-col gap-2">
    <TopsterGridHeader elementRef={cardRef} />

    <Card className="overflow-hidden w-full pt-4 max-w-full">
      <section ref={cardRef} className="bg-card">
        <CardHeader className="gap-0">
          <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
            {title}
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
);

/**
 * Sidebar section containing search and controls
 */
const SidebarSection = () => (
  <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
    <TopsterSidebar />
  </aside>
);

