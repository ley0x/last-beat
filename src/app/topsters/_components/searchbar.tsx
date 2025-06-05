'use client';

import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { z } from 'zod';

import { Input } from '@/components/ui/input';

import { searchAlbums } from '../_actions/search-lastfm.action';
import { LastFmSearchAlbumSchema } from '@/lib/zod/schemas';

type Inputs = {
  search: string;
};

const schema = z.object({
  search: z.string().min(1),
});

type Props = {
  setAlbums: React.Dispatch<React.SetStateAction<z.infer<typeof LastFmSearchAlbumSchema>[]>>;
}

export const SearchBar = ({ setAlbums }: Props) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setAlbums([]);
    const albums = await searchAlbums(data.search);
    setAlbums(albums);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-shrink-0 w-full max-w-lg">
      <div className="flex rounded-md shadow-xs relative">
        <Input
          className="peer pe-9 -ms-px shadow-none focus-visible:z-10"
          placeholder="Search for a cover..."
          type="search"
          {...register('search')}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <SearchIcon size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="relative">
      </div>
      {errors.search && (
        <p className="text-sm text-red-500 mt-1">Please enter a search term</p>
      )}

    </form>
  );
};
