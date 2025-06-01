"use client";
import React from 'react'
import { useDroppable } from '@dnd-kit/core';
type Props = {
  id: string;
}

export const DroppableCell = ({ id }: Props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <span ref={setNodeRef} style={style} className="text-neutral-700 text-xs">Droppable {id}</span>
  )
}
