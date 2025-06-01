import { LastFmSearchAlbumSchema } from '@/lib/zod/schemas';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { z } from 'zod';

import { Album } from "./album";

type Props = {
  album: z.infer<typeof LastFmSearchAlbumSchema>;
  id: string;
}

export const DraggableAlbum = ({ album, id }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      album: album,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Album album={album} />
    </div>
  );
}
