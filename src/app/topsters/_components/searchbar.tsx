'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { SearchBarProps } from '@/lib/types';
import { fetchLastFmSearchAlbum } from '@/services/api/lastfm';

interface SearchFormInputs {
  search: string;
}

const searchSchema = z.object({
  search: z.string().min(1, 'Please enter a search term'),
});

/**
 * Search bar component for finding albums
 */
export const SearchBar = ({ setAlbums }: SearchBarProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<SearchFormInputs> = async (data) => {
    setAlbums([]);
    try {
      const albums = await fetchLastFmSearchAlbum(data.search);
      setAlbums(albums);
    } catch (error) {
      console.error('Search failed:', error);
      // You could add error state handling here
    }
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
        >
          <SearchIcon size={16} aria-hidden="true" />
        </button>
      </div>
      
      {errors.search && (
        <p className="text-sm text-red-500 mt-1">{errors.search.message}</p>
      )}
    </form>
  );
};
