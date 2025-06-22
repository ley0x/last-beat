import React, { useRef } from 'react'
import { useAtom } from 'jotai'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

import { topsterTitleAtom } from '@lib/store'
import { getCellId } from '@lib/utils'
import { useTopsterDnd } from '@hooks/use-topster-dnd'

import { TopsterGrid } from '@topsters/topster-grid'
import { Album } from '@topsters/album'
import { Titles } from '@topsters/titles'
import { TopsterSidebar } from '@topsters/topster-sidebar'
import { TopsterGridHeader } from '@topsters/topster-grid-header'

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Input } from '@components/ui/input'

/**
 * Main container component that provides drag and drop context for the topster feature
 */
export const TopsterDndContext = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  const [topsterTitle, setTopsterTitle] = useAtom(topsterTitleAtom)
  const { albums, activeItem, sensors, handleDragStart, handleDragEnd, collisionDetection } = useTopsterDnd()

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={albums.map((item, idx) => getCellId(item, idx))} strategy={rectSortingStrategy}>
        <div className="w-full flex flex-col lg:flex-row gap-4 px-4 py-1">
          <section className="flex-1 flex flex-col gap-2">
            <TopsterGridHeader elementRef={cardRef} />

            <Card ref={cardRef} className="overflow-hidden w-full pt-4 max-w-full">
              <section className="bg-card mx-auto w-min min-w-fit">
                <CardHeader className="gap-1">
                  <CardTitle>
                    <Input
                      value={topsterTitle}
                      onChange={e => setTopsterTitle(e.target.value)}
                      className="text-lg md:text-xl lg:text-2xl text-center border-0 shadow-none"
                    />
                  </CardTitle>
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
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <TopsterSidebar />
          </aside>
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-80 shadow-lg">
            <Album album={activeItem} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
