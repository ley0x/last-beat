import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Grid3x3, Grip } from 'lucide-react';
import { ShareStats } from '@/app/stats/_components/top/share-stats';

type Props = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
  mode: "grid" | "list";
  onlyPagination?: boolean;
}

export const Controls = ({ setPage, page, setMode, mode, onlyPagination }: Props) => {

  const increasePage = () => {
    setPage(page => page + 1)
  }

  const toggleMode = () => {
    setMode(mode => {
      if (mode === "grid") return "list"
      return "grid"
    })
  }

  const decreasePage = () => {
    setPage(page => {
      if (page === 1) return page
      return page - 1
    })
  }

  return (
    <div className="flex gap-1">
      {!onlyPagination && (
        <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer" onClick={toggleMode}>
          {mode === "grid" ? <Grip /> : <Grid3x3 />}
        </Button>
      )}
      <Button onClick={decreasePage} variant="outline" size="icon" className="rounded-full hover:cursor-pointer" disabled={page === 1}> <ChevronLeft /> </Button>
      <Button onClick={increasePage} variant="outline" size="icon" className="rounded-full hover:cursor-pointer"> <ChevronRight /> </Button>
      {!onlyPagination && (
        <ShareStats />
      )}
    </div>
  );
};
