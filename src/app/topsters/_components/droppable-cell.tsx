"use client";
import React from 'react'
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
type Props = {
  id: string;
}

export const DroppableCell = ({ id }: Props) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className={cn("bg-accent-foreground/10 rounded h-full w-full")} ref={setNodeRef}></div>
  )
}
