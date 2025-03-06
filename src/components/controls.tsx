import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Grid3x3 } from 'lucide-react';
import { ShareStats } from './share-stats';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
}

export const Controls = ({ setPage, page }: Props) => {

  const increasePage = () => {
    setPage(page => page + 1)
  }

  const decreasePage = () => {
    setPage(page => {
      if (page === 1) return page
      return page - 1
    })
  }
  return (
    <div className="flex gap-1">
      <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <Grid3x3 /> </Button>
      <Button onClick={decreasePage} variant="outline" size="icon" className="rounded-full hover:cursor-pointer" disabled={page === 1}> <ChevronLeft /> </Button>
      <Button onClick={increasePage} variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <ChevronRight /> </Button>
      <ShareStats />
    </div>
  );
};
