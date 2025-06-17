"use client";
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useAtom } from 'jotai';
import { cn } from '@lib/utils';
import { topsterRoundCornersAtom } from '@lib/store';
import { DroppableCellProps } from '@lib/types';
import { EMPTY_STATES } from '@lib/constants';

import Image from "next/image";

/**
 * Droppable cell component that represents an empty grid slot
 */
export const DroppableCell = ({ id }: DroppableCellProps) => {
  const [topsterRoundCorners] = useAtom(topsterRoundCornersAtom);
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <Image
      src="/placeholder.svg"
      alt="Drop here"
      width={120}
      height={120}
      className={cn(
        "aspect-square opacity-10 border object-cover bg-accent-foreground/10 size-full",
        {
          "rounded": topsterRoundCorners
        }
      )}
      loading="lazy"
      unoptimized
      title={EMPTY_STATES.dropHere}
      ref={setNodeRef}
    />
  );
};
