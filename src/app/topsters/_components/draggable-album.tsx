import { LastFmSearchAlbumSchema } from '@/lib/zod/schemas';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { z } from 'zod';

import { Album } from "./album";
import { cn } from '@/lib/utils';

type Props = {
  album: z.infer<typeof LastFmSearchAlbumSchema>;
  id: string;
}

export const DraggableAlbum = ({ album, id }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      album: album,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };
  return (
    <div ref={setNodeRef} className={cn("size-18", {
      // "cursor-grab": isDragging,
      // "cursor-pointer": !isDragging,
    })} style={style} {...listeners} {...attributes}>
      <Album album={album} />
    </div>
  );
}
