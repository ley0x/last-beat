import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { gridAlbumsAtom } from '@/lib/store';
import { Album, TopsterAlbum } from '../_types';
import { findCellIndex } from '../_utils';

interface UseTopsterDndReturn {
  albums: TopsterAlbum[];
  setAlbums: (albums: TopsterAlbum[]) => void;
  activeItem: Album | null;
  sensors: ReturnType<typeof useSensors>;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  collisionDetection: typeof closestCenter;
}

export const useTopsterDnd = (): UseTopsterDndReturn => {
  const [albums, setAlbums] = useAtom(gridAlbumsAtom);
  const [activeItem, setActiveItem] = useState<Album | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event;
    
    // Check if the dragged item is from search results (has album data)
    if (active.data.current?.album) {
      setActiveItem(active.data.current.album);
    } else {
      // Find the album in the grid
      const albumIndex = findCellIndex(albums, active.id as string);
      if (albumIndex !== -1 && albums[albumIndex]) {
        setActiveItem(albums[albumIndex]);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    
    setActiveItem(null);
    
    if (!over) return;

    const activeInGrid = findCellIndex(albums, active.id as string);
    const overInGrid = findCellIndex(albums, over.id as string);
    
    if (activeInGrid !== -1 && overInGrid !== -1 && active.id !== over.id) {
      // Internal sorting within the grid
      const newItems = arrayMove(albums, activeInGrid, overInGrid);
      setAlbums(newItems);
    } else if (activeInGrid === -1 && overInGrid !== -1) {
      // External drop - album from search results being dropped into grid
      const albumData = active.data.current?.album;
      const isHoveringOverGrid = (over.id as string)?.startsWith("empty-");
      
      if (!isHoveringOverGrid || !albumData) {
        return;
      }

      const newAlbums = [...albums];
      newAlbums[overInGrid] = albumData;
      setAlbums(newAlbums);
    }
  };

  return {
    albums,
    setAlbums,
    activeItem,
    sensors,
    handleDragStart,
    handleDragEnd,
    collisionDetection: closestCenter,
  };
}; 