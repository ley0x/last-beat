import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Grid3x3 } from 'lucide-react';
import { ShareStats } from './share-stats';

export const Controls = () => {
  return (
    <div className="flex gap-1">
      <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <Grid3x3 /> </Button>
      <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <ChevronLeft /> </Button>
      <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <ChevronRight /> </Button>
      <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <ShareStats /> </Button>
    </div>
  );
};
