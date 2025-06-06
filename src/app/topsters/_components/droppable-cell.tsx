"use client";
import React from 'react'
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { topsterRoundCornersAtom } from '@/lib/store';
type Props = {
  id: string;
}

export const DroppableCell = ({ id }: Props) => {

  const [topsterRoundCorners] = useAtom(topsterRoundCornersAtom);
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className={cn("aspect-square bg-accent-foreground/10 h-full w-full", topsterRoundCorners && "rounded")} ref={setNodeRef}></div>
  )
}
