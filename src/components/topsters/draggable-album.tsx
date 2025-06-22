import React from 'react'
import { CSS } from '@dnd-kit/utilities'

import { useDraggable } from '@dnd-kit/core'

import { cn } from '@lib/utils'
import { DraggableAlbumProps } from '@lib/types'

import { Album } from '@topsters/album'

/**
 * Draggable album component for search results that can be dragged into the grid
 */
export const DraggableAlbum = ({ album, id }: DraggableAlbumProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      album: album
    }
  })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1
  }

  const containerClasses = cn(
    'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24',
    'cursor-grab hover:cursor-grabbing transition-transform hover:scale-105 flex-shrink-0',
    {
      'cursor-grabbing': isDragging
    }
  )

  return (
    <div ref={setNodeRef} className={containerClasses} style={style} {...listeners} {...attributes}>
      <Album album={album} />
    </div>
  )
}
