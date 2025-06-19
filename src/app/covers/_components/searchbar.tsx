'use client';

import React from 'react';
;

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchIcon } from 'lucide-react';
import { z } from 'zod';

import { Input } from '@components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/ui/select';

import { Provider, SearchAlbumsResponse } from '@lib/types';

import { fetchDeezerSearchAlbum } from '@services/api/deezer';
import { fetchSpotifySearchAlbum } from '@services/api/spotify';
import { fetchLastFmSearchAlbum } from '@services/api/lastfm';

async function searchAlbums(q: string, provider: Provider): Promise<SearchAlbumsResponse> {
  try {
    if (!q) throw new Error('q parameter is required');
    if (!provider) throw new Error('provider parameter is required');

    if (provider === "deezer") {
      const data = await fetchDeezerSearchAlbum(q);
      return { "deezer": data };
    }
    if (provider === "spotify") {
      const data = await fetchSpotifySearchAlbum(q);
      return { "spotify": data };
    }
    if (provider === "lastfm") {
      const data = await fetchLastFmSearchAlbum(q);
      return { "lastfm": data.filter(album => album.image.some(image => image['#text'].length > 0)) };
    }
    return { "deezer": [], "lastfm": [], "spotify": [] };

  } catch (e: Error | unknown) {
    console.error('Error when searching albums:', e);
    return { "deezer": [], "lastfm": [], "spotify": [] };
  }
}

type Inputs = {
  search: string;
  provider: Provider;
};

const schema = z.object({
  search: z.string().min(1),
  provider: z.enum(["deezer", "spotify", "lastfm"]),
});

type Props = {
  setAlbums: React.Dispatch<React.SetStateAction<SearchAlbumsResponse>>;
  setProvider: React.Dispatch<React.SetStateAction<Provider>>;
}
export const SearchBar = ({ setAlbums, setProvider }: Props) => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider: 'deezer',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const albums = await searchAlbums(data.search, data.provider);
    setProvider(data.provider);
    setAlbums(albums);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <div className="flex rounded-md shadow-xs relative">
        <Controller
          name="provider"
          control={control}
          render={({ field }) => (
            <Select {...field} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-[170px] rounded-r-none">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Providers</SelectLabel>
                  <SelectItem value="deezer">
                    <img src="/providers/deezer.png" width={20} height={20} alt="Deezer logo" />
                    Deezer
                  </SelectItem>
                  <SelectItem value="spotify">
                    <img src="/providers/spotify.png" width={20} height={20} alt="Spotify logo" />
                    Spotify
                  </SelectItem>
                  <SelectItem value="lastfm">
                    <img src="/providers/lastfm.png" width={20} height={20} alt="Last.fm logo" />
                    Last.fm
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Input
          className="peer pe-9 -ms-px rounded-s-none shadow-none focus-visible:z-10"
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
