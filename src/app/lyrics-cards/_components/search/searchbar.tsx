'use client';

import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Search } from 'lucide-react';
import { z } from 'zod';
import { useAtom } from "jotai";
import { zodResolver } from '@hookform/resolvers/zod';

import { GeniusSearchTrackSchema } from '@lib/schemas';
import { lcSelectedLyrics, lcSelectedTrack, lcTrackLyrics } from "@lib/store";

import { searchTracks } from '../../_actions/search-tracks.action';
import { Input } from '@/components/ui/input';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

type Inputs = {
  search: string;
};

const schema = z.object({
  search: z.string().min(1),
});

type Props = {
  setLoading: (loading: boolean) => void;
  setFoundTracks: (foundTracks: z.infer<typeof GeniusSearchTrackSchema>[]) => void;
}

export const SearchBar = ({ setLoading, setFoundTracks }: Props) => {

  const [, setSelectedTrack] = useAtom(lcSelectedTrack);
  const [, setSelectedLyrics] = useAtom(lcSelectedLyrics);
  const [, setLyrics] = useAtom(lcTrackLyrics);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const handleClick = () => {
    const formData = getValues();
    onSubmit(formData);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      setFoundTracks([]);
      setSelectedTrack(null);
      setLyrics("");
      setSelectedLyrics("");
      const tracks = await searchTracks(data.search);

      setFoundTracks(tracks);

    } catch (e) {
      console.error(e);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder="Search for a song"
            {...register('search')}
          />
          <HoverBorderGradient
            containerClassName="rounded-sm"
            as="button"
            onClick={handleClick}
            className="cursor-pointer size-9 p-0 text-center dark:bg-card bg-white text-black dark:text-white flex items-center justify-center"
          >
            <Search className="size-5" />
          </HoverBorderGradient>
        </div>
        {errors && (
          <p className="text-sm text-destructive">{errors.search?.message}</p>
        )}
      </form>
    </>
  );
};
